// Multi-Session Planning Component for Tattoo Price Estimator V2
import React from 'react';
import { Icon } from './Icon';
import { EstimateResult } from '../types';
import { t, fmt } from '../i18n';

interface MultiSessionPlanProps {
  estimate: EstimateResult;
}

export const MultiSessionPlan: React.FC<MultiSessionPlanProps> = ({ estimate }) => {
  if (!estimate.isMultiSession) {
    return null;
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[var(--text-heading)] flex items-center gap-2">
          <span><Icon name="calendar" /></span> {t('session.title')}
        </h3>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-elevated)] px-2.5 py-0.5 rounded-full border border-[var(--border)]">
          {t('session.badge')}
        </span>
      </div>

      <p className="text-xs text-[var(--muted)] leading-relaxed">
        {t('session.summary', { count: estimate.sessionCount })} {t('session.why')}
      </p>

      {/* Per-Sitting Cost and Spacing Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3">
          <div className="text-xs text-[var(--muted)] font-medium">{t('session.cost_per_sitting_title')}</div>
          <div className="text-sm font-bold text-[var(--text-heading)] mt-0.5">
            {estimate.currency}{fmt(estimate.sessionCostLow)} – {estimate.currency}{fmt(estimate.sessionCostHigh)}
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1">{t('session.cost_per_sitting_sub')}</div>
        </div>

        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3">
          <div className="text-xs text-[var(--muted)] font-medium">{t('session.spacing_title')}</div>
          <div className="text-sm font-bold text-[var(--text-heading)] mt-0.5">
            {t('session.spacing', { weeks: estimate.sessionSpacingWeeks })}
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1">{t('session.spacing_sub')}</div>
        </div>
      </div>

      {/* Sittings Roadmap */}
      <div className="space-y-2.5 pt-1">
        {estimate.sessions.map((sess) => (
          <div key={sess.number} className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-[var(--primary-contrast)] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              {sess.number}
            </span>
            <div>
              <div className="text-xs font-bold text-[var(--text-heading)]">
                {t(sess.titleKey)}
              </div>
              <div className="text-xs text-[var(--muted)] mt-0.5">
                {t(sess.focusKey)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
