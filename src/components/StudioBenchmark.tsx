// Studio Pricing Benchmark Component for Tattoo Price Estimator V2
import React from 'react';
import { Icon } from './Icon';
import { REGIONAL_PRICING, REGION_ORDER } from '../data/pricingData';
import { RegionId } from '../types';
import { t, fmt } from '../i18n';

interface StudioBenchmarkProps {
  currentRegion: RegionId;
  onSelectRegion: (id: RegionId) => void;
}

export const StudioBenchmark: React.FC<StudioBenchmarkProps> = ({ currentRegion, onSelectRegion }) => {
  const regions: RegionId[] = REGION_ORDER;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-lg space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[var(--text-heading)] flex items-center gap-2">
            <span><Icon name="chart" /></span> {t('bench.title')}
          </h3>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-elevated)] px-2.5 py-0.5 rounded-full border border-[var(--border)]">
            {t('bench.badge')}
          </span>
        </div>
        <p className="text-xs text-[var(--muted)] mt-1">
          {t('bench.subtitle')}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--muted)] font-semibold">
              <th className="py-2.5 px-3">{t('bench.th_region')}</th>
              <th className="py-2.5 px-3">{t('bench.th_min')}</th>
              <th className="py-2.5 px-3">{t('bench.th_standard')}</th>
              <th className="py-2.5 px-3">{t('bench.th_specialist')}</th>
              <th className="py-2.5 px-3">{t('bench.th_day')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {regions.map((regId) => {
              const reg = REGIONAL_PRICING[regId];
              const isSelected = regId === currentRegion;

              return (
                <tr
                  key={regId}
                  onClick={() => onSelectRegion(regId)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[var(--surface-elevated)] font-semibold text-[var(--text-heading)] border-l-2 border-l-[var(--primary)]'
                      : 'text-[var(--text)] hover:bg-[var(--surface-elevated)]'
                  }`}
                >
                  <td className="py-3 px-3 flex items-center gap-1.5">
                    {isSelected && <span className="text-[var(--primary)] font-bold">&bull;</span>}
                    {t(reg.nameKey)}
                  </td>
                  <td className="py-3 px-3">
                    {reg.currency}{fmt(reg.shopMinimumLow)} – {reg.currency}{fmt(reg.shopMinimumHigh)}
                  </td>
                  <td className="py-3 px-3">
                    {reg.currency}{fmt(reg.hourlyStandardLow)} – {reg.currency}{fmt(reg.hourlyStandardHigh)}{t('bench.per_hour')}
                  </td>
                  <td className="py-3 px-3">
                    {reg.currency}{fmt(reg.hourlySpecialistLow)} – {reg.currency}{fmt(reg.hourlySpecialistHigh)}{t('bench.per_hour')}
                  </td>
                  <td className="py-3 px-3">
                    {reg.currency}{fmt(reg.dayRateLow)} – {reg.currency}{fmt(reg.dayRateHigh)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3 text-[11px] text-[var(--muted)] leading-relaxed">
        <strong>{t('bench.attribution_label')}</strong> {t('bench.attribution')}
      </div>
    </div>
  );
};
