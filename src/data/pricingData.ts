// Pricing Benchmark and Sizing Data for Tattoo Price Estimator V2
import { RegionId, RegionalPricing, SizeCategory, SizeSpec, DetailLevel, ColorOption, PlacementArea, ArtistTier } from '../types';

/** Year the price figures below were last brought up to date (shown on screen). */
export const PRICES_UPDATED = 2026;

/** Display order of the markets, same nine as the Studio Pricing Benchmark. */
export const REGION_ORDER: RegionId[] = ['uk', 'london', 'us', 'eu', 'au', 'cee', 'ca', 'sa', 'sea'];

// Editorial estimates from published 2026 studio price lists and cost guides; per-market
// sources and dates are listed in the in-app documentation (docs.sec10).
export const REGIONAL_PRICING: Record<RegionId, RegionalPricing> = {
  uk: {
    id: 'uk',
    nameKey: 'region.uk',
    currency: '£',
    currencyCode: 'GBP',
    shopMinimumLow: 60,
    shopMinimumHigh: 100,
    hourlyStandardLow: 80,
    hourlyStandardHigh: 120,
    hourlySpecialistLow: 120,
    hourlySpecialistHigh: 180,
    dayRateLow: 500,
    dayRateHigh: 900,
    typicalDepositLow: 50,
    typicalDepositHigh: 100,
    depositType: 'flat'
  },
  london: {
    id: 'london',
    nameKey: 'region.london',
    currency: '£',
    currencyCode: 'GBP',
    shopMinimumLow: 80,
    shopMinimumHigh: 150,
    hourlyStandardLow: 120,
    hourlyStandardHigh: 160,
    hourlySpecialistLow: 160,
    hourlySpecialistHigh: 250,
    dayRateLow: 700,
    dayRateHigh: 1200,
    typicalDepositLow: 80,
    typicalDepositHigh: 150,
    depositType: 'flat'
  },
  us: {
    id: 'us',
    nameKey: 'region.us',
    currency: '$',
    currencyCode: 'USD',
    shopMinimumLow: 80,
    shopMinimumHigh: 150,
    hourlyStandardLow: 120,
    hourlyStandardHigh: 175,
    hourlySpecialistLow: 175,
    hourlySpecialistHigh: 300,
    dayRateLow: 900,
    dayRateHigh: 1600,
    typicalDepositLow: 50,
    typicalDepositHigh: 200,
    depositType: 'flat'
  },
  eu: {
    id: 'eu',
    nameKey: 'region.eu',
    currency: '€',
    currencyCode: 'EUR',
    shopMinimumLow: 80,
    shopMinimumHigh: 150,
    hourlyStandardLow: 100,
    hourlyStandardHigh: 150,
    hourlySpecialistLow: 150,
    hourlySpecialistHigh: 220,
    dayRateLow: 700,
    dayRateHigh: 1100,
    typicalDepositLow: 50,
    typicalDepositHigh: 150,
    depositType: 'flat'
  },
  au: {
    id: 'au',
    nameKey: 'region.au',
    currency: 'A$',
    currencyCode: 'AUD',
    shopMinimumLow: 100,
    shopMinimumHigh: 150,
    hourlyStandardLow: 150,
    hourlyStandardHigh: 220,
    hourlySpecialistLow: 220,
    hourlySpecialistHigh: 300,
    dayRateLow: 1000,
    dayRateHigh: 1600,
    typicalDepositLow: 100,
    typicalDepositHigh: 200,
    depositType: 'flat'
  },
  cee: {
    id: 'cee',
    nameKey: 'region.cee',
    currency: '€',
    currencyCode: 'EUR',
    shopMinimumLow: 50,
    shopMinimumHigh: 100,
    hourlyStandardLow: 60,
    hourlyStandardHigh: 110,
    hourlySpecialistLow: 110,
    hourlySpecialistHigh: 170,
    dayRateLow: 400,
    dayRateHigh: 800,
    typicalDepositLow: 50,
    typicalDepositHigh: 100,
    depositType: 'flat'
  },
  ca: {
    id: 'ca',
    nameKey: 'region.ca',
    currency: 'C$',
    currencyCode: 'CAD',
    shopMinimumLow: 100,
    shopMinimumHigh: 180,
    hourlyStandardLow: 150,
    hourlyStandardHigh: 220,
    hourlySpecialistLow: 220,
    hourlySpecialistHigh: 350,
    dayRateLow: 1000,
    dayRateHigh: 1800,
    typicalDepositLow: 100,
    typicalDepositHigh: 200,
    depositType: 'flat'
  },
  sa: {
    id: 'sa',
    nameKey: 'region.sa',
    currency: 'R$',
    currencyCode: 'BRL',
    shopMinimumLow: 150,
    shopMinimumHigh: 300,
    hourlyStandardLow: 180,
    hourlyStandardHigh: 350,
    hourlySpecialistLow: 350,
    hourlySpecialistHigh: 600,
    dayRateLow: 1200,
    dayRateHigh: 3000,
    typicalDepositLow: 100,
    typicalDepositHigh: 300,
    depositType: 'flat'
  },
  sea: {
    id: 'sea',
    nameKey: 'region.sea',
    currency: '฿',
    currencyCode: 'THB',
    shopMinimumLow: 1000,
    shopMinimumHigh: 2500,
    hourlyStandardLow: 1500,
    hourlyStandardHigh: 2500,
    hourlySpecialistLow: 2500,
    hourlySpecialistHigh: 4000,
    dayRateLow: 10000,
    dayRateHigh: 20000,
    typicalDepositLow: 1000,
    typicalDepositHigh: 3000,
    depositType: 'flat'
  }
};

export const SIZE_SPECS: Record<SizeCategory, SizeSpec> = {
  tiny: {
    id: 'tiny',
    nameKey: 'size.tiny.name',
    dimensionCm: 'Under 5 cm',
    dimensionInches: 'Under 2 in',
    referenceItemKey: 'size.tiny.ref',
    typicalHoursLow: 0.25,
    typicalHoursHigh: 0.75
  },
  small: {
    id: 'small',
    nameKey: 'size.small.name',
    dimensionCm: '5 to 10 cm',
    dimensionInches: '2 to 4 in',
    referenceItemKey: 'size.small.ref',
    typicalHoursLow: 0.75,
    typicalHoursHigh: 1.75
  },
  medium: {
    id: 'medium',
    nameKey: 'size.medium.name',
    dimensionCm: '10 to 15 cm',
    dimensionInches: '4 to 6 in',
    referenceItemKey: 'size.medium.ref',
    typicalHoursLow: 1.75,
    typicalHoursHigh: 3.5
  },
  large: {
    id: 'large',
    nameKey: 'size.large.name',
    dimensionCm: '15 to 22 cm',
    dimensionInches: '6 to 9 in',
    referenceItemKey: 'size.large.ref',
    typicalHoursLow: 3.5,
    typicalHoursHigh: 6.0
  },
  xlarge: {
    id: 'xlarge',
    nameKey: 'size.xlarge.name',
    dimensionCm: '22+ cm',
    dimensionInches: '9+ in',
    referenceItemKey: 'size.xlarge.ref',
    typicalHoursLow: 6.0,
    typicalHoursHigh: 12.0
  }
};

export const DETAIL_MULTIPLIERS: Record<DetailLevel, { low: number; high: number }> = {
  minimal: { low: 0.85, high: 1.0 },
  moderate: { low: 1.0, high: 1.35 },
  intricate: { low: 1.35, high: 1.75 }
};

export const COLOR_MULTIPLIERS: Record<ColorOption, { low: number; high: number }> = {
  black_grey: { low: 1.0, high: 1.0 },
  color: { low: 1.15, high: 1.3 }
};

export const PLACEMENT_MULTIPLIERS: Record<PlacementArea, { low: number; high: number }> = {
  easy: { low: 1.0, high: 1.0 },
  moderate: { low: 1.1, high: 1.2 },
  difficult: { low: 1.25, high: 1.45 }
};

export const ARTIST_MULTIPLIERS: Record<ArtistTier, { low: number; high: number }> = {
  standard: { low: 1.0, high: 1.0 },
  specialist: { low: 1.3, high: 1.55 }
};
