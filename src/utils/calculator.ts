// Calculation logic and estimation algorithms for Tattoo Price Estimator V2
import {
  RegionId,
  SizeCategory,
  DetailLevel,
  ColorOption,
  PlacementArea,
  ArtistTier,
  EstimateResult,
  PriceDrivers
} from '../types';
import {
  REGIONAL_PRICING,
  SIZE_SPECS,
  DETAIL_MULTIPLIERS,
  COLOR_MULTIPLIERS,
  PLACEMENT_MULTIPLIERS,
  ARTIST_MULTIPLIERS
} from '../data/pricingData';
import { t } from '../i18n';

/**
 * Calculates a comprehensive price range and plain-language explanation for tattoo clients.
 */
export function calculatePriceRange(
  regionId: RegionId,
  size: SizeCategory,
  detail: DetailLevel,
  color: ColorOption,
  placement: PlacementArea,
  artistTier: ArtistTier
): EstimateResult {
  const region = REGIONAL_PRICING[regionId];
  const sizeSpec = SIZE_SPECS[size];
  const detailMult = DETAIL_MULTIPLIERS[detail];
  const colorMult = COLOR_MULTIPLIERS[color];
  const placementMult = PLACEMENT_MULTIPLIERS[placement];
  const artistMult = ARTIST_MULTIPLIERS[artistTier];

  // Base hours scaled by complexity and placement
  const estimatedHoursLow = Math.round((sizeSpec.typicalHoursLow * detailMult.low * placementMult.low) * 10) / 10;
  const estimatedHoursHigh = Math.round((sizeSpec.typicalHoursHigh * detailMult.high * placementMult.high * (color === 'color' ? 1.15 : 1.0)) * 10) / 10;

  // Hourly rate basis
  const baseHourlyLow = artistTier === 'specialist' ? region.hourlySpecialistLow : region.hourlyStandardLow;
  const baseHourlyHigh = artistTier === 'specialist' ? region.hourlySpecialistHigh : region.hourlyStandardHigh;

  // Unclamped price calculation
  let rawLow = Math.round((estimatedHoursLow * baseHourlyLow * colorMult.low) / 10) * 10;
  let rawHigh = Math.round((estimatedHoursHigh * baseHourlyHigh * colorMult.high) / 10) * 10;

  // Ensure minimum spread of at least 20-30%
  if (rawHigh <= rawLow * 1.15) {
    rawHigh = Math.round((rawLow * 1.3) / 10) * 10;
  }

  // Check shop minimum floor
  let isShopMinimumApplied = false;
  let priceLow = rawLow;
  let priceHigh = rawHigh;

  if (priceLow < region.shopMinimumLow) {
    priceLow = region.shopMinimumLow;
    isShopMinimumApplied = true;
  }
  if (priceHigh < region.shopMinimumHigh && (size === 'tiny' || size === 'small')) {
    priceHigh = region.shopMinimumHigh;
  }

  // Generate plain-English reasons for the low end
  const lowReasons: string[] = [];
  if (isShopMinimumApplied) {
    lowReasons.push(t('min.alert', { currency: region.currency, minLow: region.shopMinimumLow, minHigh: region.shopMinimumHigh }));
  } else {
    if (detail === 'minimal') lowReasons.push(t('reason.low.linework'));
    if (placement === 'easy') lowReasons.push(t('reason.low.placement'));
    if (artistTier === 'standard') lowReasons.push(t('reason.low.artist'));
    lowReasons.push(t('reason.low.session'));
  }

  // Generate plain-English reasons for the high end
  const highReasons: string[] = [];
  if (detail === 'intricate') {
    highReasons.push(t('reason.high.detail'));
  } else if (detail === 'moderate') {
    highReasons.push(t('reason.high.detail'));
  }
  if (color === 'color') {
    highReasons.push(t('reason.high.color'));
  }
  if (placement === 'difficult') {
    highReasons.push(t('reason.high.placement'));
  }
  if (artistTier === 'specialist') {
    highReasons.push(t('reason.high.artist'));
  }
  if (highReasons.length === 0) {
    highReasons.push(t('reason.high.detail'));
    highReasons.push(t('reason.high.artist'));
  }

  // Deposit calculation (typically 20% to 35% of total or flat benchmark)
  let depositLow = Math.max(region.typicalDepositLow, Math.round((priceLow * 0.25) / 10) * 10);
  let depositHigh = Math.max(region.typicalDepositHigh, Math.round((priceHigh * 0.35) / 10) * 10);
  if (priceLow <= region.shopMinimumHigh) {
    depositLow = Math.round(region.shopMinimumLow * 0.5);
    depositHigh = region.shopMinimumLow;
  }

  // Multi-session determination
  const isMultiSession = size === 'large' || size === 'xlarge' || estimatedHoursHigh > 4.5;
  let sessionCount = 1;
  if (size === 'xlarge') {
    sessionCount = 3;
  } else if (size === 'large' || estimatedHoursHigh > 4.5) {
    sessionCount = 2;
  }

  const sessionCostLow = Math.round((priceLow / sessionCount) / 10) * 10;
  const sessionCostHigh = Math.round((priceHigh / sessionCount) / 10) * 10;
  const sessionSpacingWeeks = '3 to 6';

  const sessions = [
    { number: 1, titleKey: 'session.sitting_1_title', focusKey: 'session.sitting_1_desc' },
    { number: 2, titleKey: 'session.sitting_2_title', focusKey: 'session.sitting_2_desc' }
  ];
  if (sessionCount >= 3) {
    sessions.push({ number: 3, titleKey: 'session.sitting_3_title', focusKey: 'session.sitting_3_desc' });
  }

  // 4 Specific consultation questions
  const questions = [
    t('questions.q1'),
    t('questions.q2'),
    t('questions.q3'),
    t('questions.q4')
  ];

  // Tipping keys
  const tippingGuidanceKey = `tipping.${regionId}.title`;
  const tippingDetailsKey = `tipping.${regionId}.desc`;

  return {
    priceLow,
    priceHigh,
    currency: region.currency,
    isShopMinimumApplied,
    shopMinimumLow: region.shopMinimumLow,
    shopMinimumHigh: region.shopMinimumHigh,
    estimatedHoursLow,
    estimatedHoursHigh,
    lowReasons,
    highReasons,
    depositLow,
    depositHigh,
    isMultiSession,
    sessionCount,
    sessionCostLow,
    sessionCostHigh,
    sessionSpacingWeeks,
    sessions,
    questions,
    tippingGuidanceKey,
    tippingDetailsKey
  };
}

/**
 * Calculates interactive delta adjustments to show the user what controls the price.
 */
export function calculatePriceDrivers(
  regionId: RegionId,
  size: SizeCategory,
  detail: DetailLevel,
  color: ColorOption,
  placement: PlacementArea,
  artistTier: ArtistTier
): PriceDrivers {
  const current = calculatePriceRange(regionId, size, detail, color, placement, artistTier);

  // Baseline standard
  const baseSizePriceLow = current.priceLow;
  const baseSizePriceHigh = current.priceHigh;

  // Detail delta (difference if switched to minimal)
  const altDetail = calculatePriceRange(regionId, size, 'minimal', color, placement, artistTier);
  const detailDeltaLow = Math.max(0, current.priceLow - altDetail.priceLow);
  const detailDeltaHigh = Math.max(0, current.priceHigh - altDetail.priceHigh);

  // Color delta (difference if switched to black_grey)
  const altColor = calculatePriceRange(regionId, size, detail, 'black_grey', placement, artistTier);
  const colorDeltaLow = Math.max(0, current.priceLow - altColor.priceLow);
  const colorDeltaHigh = Math.max(0, current.priceHigh - altColor.priceHigh);

  // Placement delta (difference if switched to easy)
  const altPlacement = calculatePriceRange(regionId, size, detail, color, 'easy', artistTier);
  const placementDeltaLow = Math.max(0, current.priceLow - altPlacement.priceLow);
  const placementDeltaHigh = Math.max(0, current.priceHigh - altPlacement.priceHigh);

  // Artist tier delta
  const altArtist = calculatePriceRange(regionId, size, detail, color, placement, 'standard');
  const artistTierDeltaLow = Math.max(0, current.priceLow - altArtist.priceLow);
  const artistTierDeltaHigh = Math.max(0, current.priceHigh - altArtist.priceHigh);

  return {
    baseSizePriceLow,
    baseSizePriceHigh,
    detailDeltaLow,
    detailDeltaHigh,
    colorDeltaLow,
    colorDeltaHigh,
    placementDeltaLow,
    placementDeltaHigh,
    artistTierDeltaLow,
    artistTierDeltaHigh
  };
}
