// Interactive Price Drivers Breakdown Component for Tattoo Price Estimator V2
import React from 'react';
import { Icon } from './Icon';
import { PriceDrivers } from '../types';
import { t, fmt } from '../i18n';

interface InteractiveBreakdownProps {
  drivers: PriceDrivers;
  currency: string;
  isColor: boolean;
  isDifficultPlacement: boolean;
  isSpecialistArtist: boolean;
  isHighDetail: boolean;
}

export const InteractiveBreakdown: React.FC<InteractiveBreakdownProps> = ({
  drivers,
  currency,
  isColor,
  isDifficultPlacement,
  isSpecialistArtist,
  isHighDetail
}) => {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-lg space-y-4">
      <div>
        <h3 className="text-base font-bold text-[var(--text-heading)] flex items-center gap-2">
          <span><Icon name="gear" /></span> {t('drivers.title')}
        </h3>
        <p className="text-xs text-[var(--muted)] mt-1">
          {t('drivers.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Base Size Footprint */}
        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3">
          <div className="text-xs text-[var(--muted)] font-medium">{t('drivers.base_size')}</div>
          <div className="text-sm font-bold text-[var(--text-heading)] mt-0.5">
            {currency}{fmt(drivers.baseSizePriceLow)} – {currency}{fmt(drivers.baseSizePriceHigh)}
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1">{t('drivers.base_size_desc')}</div>
        </div>

        {/* Color Delta */}
        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--muted)] font-medium">{t('drivers.color_effect')}</span>
            {isColor ? (
              <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
                +{currency}{fmt(drivers.colorDeltaHigh)}
              </span>
            ) : (
              <span className="text-[11px] text-[var(--muted)]">{t('drivers.baseline')}</span>
            )}
          </div>
          <div className="text-xs text-[var(--text)] mt-1">
            {isColor
              ? t('drivers.tip_color', { currency, amount: drivers.colorDeltaHigh })
              : t('drivers.tip_color_baseline')}
          </div>
        </div>

        {/* Placement Delta */}
        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--muted)] font-medium">{t('drivers.placement_effect')}</span>
            {isDifficultPlacement ? (
              <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
                +{currency}{fmt(drivers.placementDeltaHigh)}
              </span>
            ) : (
              <span className="text-[11px] text-[var(--muted)]">{t('drivers.standard')}</span>
            )}
          </div>
          <div className="text-xs text-[var(--text)] mt-1">
            {isDifficultPlacement
              ? t('drivers.tip_placement', { currency, amount: drivers.placementDeltaHigh })
              : t('drivers.tip_placement_standard')}
          </div>
        </div>

        {/* Detail Delta */}
        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--muted)] font-medium">{t('drivers.detail_effect')}</span>
            {isHighDetail ? (
              <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
                +{currency}{fmt(drivers.detailDeltaHigh)}
              </span>
            ) : (
              <span className="text-[11px] text-[var(--muted)]">{t('drivers.standard')}</span>
            )}
          </div>
          <div className="text-xs text-[var(--text)] mt-1">
            {isHighDetail
              ? t('drivers.tip_detail', { currency, amount: drivers.detailDeltaHigh })
              : t('drivers.tip_detail_standard')}
          </div>
        </div>
      </div>

      {isSpecialistArtist && (
        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3 flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-[var(--text-heading)]">{t('drivers.artist_effect')}</div>
            <div className="text-xs text-[var(--muted)]">{t('drivers.tip_specialist', { currency, low: drivers.artistTierDeltaLow, high: drivers.artistTierDeltaHigh })}</div>
          </div>
          <span className="text-xs font-bold text-[var(--primary)]">{t('drivers.specialist_tier_badge')}</span>
        </div>
      )}
    </div>
  );
};
