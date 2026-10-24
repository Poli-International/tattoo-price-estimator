// Types for Tattoo Price Estimator V2

export type RegionId = 'uk' | 'london' | 'us' | 'eu' | 'au' | 'cee' | 'ca' | 'sa' | 'sea';

export type SizeCategory = 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';

export type DetailLevel = 'minimal' | 'moderate' | 'intricate';

export type ColorOption = 'black_grey' | 'color';

export type PlacementArea = 'easy' | 'moderate' | 'difficult';

export type ArtistTier = 'standard' | 'specialist';

export interface RegionalPricing {
  id: RegionId;
  nameKey: string;
  currency: string;
  currencyCode: string;
  shopMinimumLow: number;
  shopMinimumHigh: number;
  hourlyStandardLow: number;
  hourlyStandardHigh: number;
  hourlySpecialistLow: number;
  hourlySpecialistHigh: number;
  dayRateLow: number;
  dayRateHigh: number;
  typicalDepositLow: number;
  typicalDepositHigh: number;
  depositType: 'percentage' | 'flat';
}

export interface SizeSpec {
  id: SizeCategory;
  nameKey: string;
  dimensionCm: string;
  dimensionInches: string;
  referenceItemKey: string;
  typicalHoursLow: number;
  typicalHoursHigh: number;
}

export interface EstimateResult {
  priceLow: number;
  priceHigh: number;
  currency: string;
  isShopMinimumApplied: boolean;
  shopMinimumLow: number;
  shopMinimumHigh: number;
  estimatedHoursLow: number;
  estimatedHoursHigh: number;
  lowReasons: string[];
  highReasons: string[];
  depositLow: number;
  depositHigh: number;
  isMultiSession: boolean;
  sessionCount: number;
  sessionCostLow: number;
  sessionCostHigh: number;
  sessionSpacingWeeks: string;
  sessions: {
    number: number;
    titleKey: string;
    focusKey: string;
  }[];
  questions: string[];
  tippingGuidanceKey: string;
  tippingDetailsKey: string;
}

export interface PriceDrivers {
  baseSizePriceLow: number;
  baseSizePriceHigh: number;
  detailDeltaLow: number;
  detailDeltaHigh: number;
  colorDeltaLow: number;
  colorDeltaHigh: number;
  placementDeltaLow: number;
  placementDeltaHigh: number;
  artistTierDeltaLow: number;
  artistTierDeltaHigh: number;
}
