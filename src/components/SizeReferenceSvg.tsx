// Inline SVG Visual Size Reference Component for Tattoo Price Estimator V2
import React from 'react';
import { SizeCategory } from '../types';
import { SIZE_SPECS } from '../data/pricingData';
import { t } from '../i18n';

interface SizeReferenceSvgProps {
  size: SizeCategory;
}

export const SizeReferenceSvg: React.FC<SizeReferenceSvgProps> = ({ size }) => {
  const spec = SIZE_SPECS[size];

  return (
    <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
      {/* Header with name, physical dimensions, and everyday comparison item */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface)] px-2.5 py-0.5 rounded border border-[var(--border)]">
            {t(spec.nameKey)}
          </span>
          <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)]">
            {t(`size.${spec.id}.dim`)}
          </span>
        </div>
        <div className="text-xs text-[var(--muted)]">
          {t('visual.real_scale')} <strong className="text-[var(--text-heading)]">{t(spec.referenceItemKey)}</strong>
        </div>
      </div>

      {/* SVG Canvas: Viewbox 340x110, scales smoothly to 100% of container width on any phone screen */}
      <div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg p-2 flex items-center justify-center overflow-hidden">
        {size === 'tiny' && (
          <svg
            viewBox="0 0 340 110"
            className="w-full max-w-xs sm:max-w-sm h-auto block"
            aria-label={t('visual.aria_tiny')}
            role="img"
          >
            {/* Real Coin Reference: 28mm bimetallic coin silhouette */}
            <g transform="translate(30, 20)">
              {/* Outer milled rim */}
              <circle cx="35" cy="35" r="32" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--muted)]" />
              {/* Inner core ring */}
              <circle cx="35" cy="35" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" className="text-[var(--border)]" />
              <text x="35" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.coin')}
              </text>
              <text x="35" y="44" textAnchor="middle" fontSize="8" fill="currentColor" className="text-[var(--muted)] font-mono">
                {t('visual.coin_dim')}
              </text>
              <text x="35" y="80" textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.everyday_object')}
              </text>
            </g>

            {/* Separator / Comparison Line */}
            <line x1="140" y1="15" x2="140" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-[var(--border)]" />

            {/* Tattoo Area Comparison */}
            <g transform="translate(170, 20)">
              {/* Target footprint box */}
              <rect x="20" y="10" width="50" height="50" rx="8" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
              
              {/* Decorative mini starburst motif */}
              <path d="M 45 22 L 47 31 L 56 35 L 47 39 L 45 48 L 43 39 L 34 35 L 43 31 Z" fill="currentColor" className="text-[var(--primary)]" />
              <circle cx="45" cy="35" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-heading)]" />
              
              {/* Dimension measurement line with arrowheads */}
              <line x1="20" y1="68" x2="70" y2="68" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <line x1="20" y1="64" x2="20" y2="72" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <line x1="70" y1="64" x2="70" y2="72" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <text x="45" y="80" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" className="text-[var(--text-heading)]">
                {t('visual.tiny_dim')}
              </text>
              <text x="110" y="40" textAnchor="start" fontSize="9" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.tiny_placement')}
              </text>
            </g>
          </svg>
        )}

        {size === 'small' && (
          <svg
            viewBox="0 0 340 110"
            className="w-full max-w-xs sm:max-w-sm h-auto block"
            aria-label={t('visual.aria_small')}
            role="img"
          >
            {/* Real Credit Card Reference: 85.6mm x 54mm proportion */}
            <g transform="translate(20, 18)">
              <rect x="5" y="5" width="86" height="54" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--muted)]" />
              {/* EMV metallic chip */}
              <rect x="16" y="16" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[var(--border)]" />
              <line x1="24" y1="16" x2="24" y2="28" stroke="currentColor" strokeWidth="1" className="text-[var(--border)]" />
              {/* Card label */}
              <text x="54" y="44" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor" className="text-[var(--muted)] font-mono">
                {t('visual.card')}
              </text>
              <text x="54" y="54" textAnchor="middle" fontSize="7" fill="currentColor" className="text-[var(--muted)] font-mono">
                {t('visual.card_dim')}
              </text>
              <text x="48" y="76" textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.everyday_object')}
              </text>
            </g>

            {/* Separator Line */}
            <line x1="140" y1="15" x2="140" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-[var(--border)]" />

            {/* Tattoo Area Comparison */}
            <g transform="translate(165, 15)">
              <rect x="15" y="8" width="70" height="60" rx="8" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
              {/* Palm-sized traditional swallow silhouette */}
              <path d="M 35 38 Q 50 20 65 38 Q 50 50 35 38 Z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <path d="M 50 20 Q 60 12 70 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              
              {/* Dimension measurement line */}
              <line x1="15" y1="76" x2="85" y2="76" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <line x1="15" y1="72" x2="15" y2="80" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <line x1="85" y1="72" x2="85" y2="80" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <text x="50" y="89" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" className="text-[var(--text-heading)]">
                {t('visual.small_dim')}
              </text>
              <text x="100" y="42" textAnchor="start" fontSize="9" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.small_placement')}
              </text>
            </g>
          </svg>
        )}

        {size === 'medium' && (
          <svg
            viewBox="0 0 340 110"
            className="w-full max-w-xs sm:max-w-sm h-auto block"
            aria-label={t('visual.aria_medium')}
            role="img"
          >
            {/* Real Smartphone Reference: approx 15cm x 7cm proportion */}
            <g transform="translate(30, 10)">
              <rect x="5" y="5" width="48" height="82" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--muted)]" />
              {/* Screen notch / pill camera */}
              <rect x="22" y="9" width="14" height="4" rx="2" fill="currentColor" className="text-[var(--border)]" />
              {/* Screen outline */}
              <rect x="9" y="17" width="40" height="63" rx="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--border)]" />
              <text x="29" y="48" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor" className="text-[var(--muted)] font-mono">
                {t('visual.phone')}
              </text>
              <text x="29" y="58" textAnchor="middle" fontSize="7" fill="currentColor" className="text-[var(--muted)] font-mono">
                {t('visual.phone_dim')}
              </text>
              <text x="29" y="100" textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.everyday_object')}
              </text>
            </g>

            {/* Separator */}
            <line x1="130" y1="15" x2="130" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-[var(--border)]" />

            {/* Tattoo Area */}
            <g transform="translate(155, 10)">
              <rect x="15" y="8" width="76" height="74" rx="10" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
              {/* Detailed portrait / geometric circle */}
              <circle cx="53" cy="45" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <circle cx="53" cy="45" r="14" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" className="text-[var(--primary)]" />
              
              {/* Dimension line */}
              <line x1="15" y1="90" x2="91" y2="90" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <line x1="15" y1="86" x2="15" y2="94" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <line x1="91" y1="86" x2="91" y2="94" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <text x="53" y="102" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" className="text-[var(--text-heading)]">
                {t('visual.medium_dim')}
              </text>
              <text x="105" y="48" textAnchor="start" fontSize="9" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.medium_placement')}
              </text>
            </g>
          </svg>
        )}

        {size === 'large' && (
          <svg
            viewBox="0 0 340 110"
            className="w-full max-w-xs sm:max-w-sm h-auto block"
            aria-label={t('visual.aria_large')}
            role="img"
          >
            {/* Open Hand Span Reference */}
            <g transform="translate(25, 10)">
              {/* Hand silhouette outline */}
              <path
                d="M 15 85 L 15 55 Q 15 35 25 35 Q 35 35 35 52 L 35 25 Q 35 12 45 12 Q 55 12 55 25 L 55 22 Q 55 10 65 10 Q 75 10 75 25 L 75 35 Q 75 22 85 22 Q 95 22 95 40 L 95 65 Q 95 85 75 88 L 15 85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-[var(--muted)]"
              />
              <text x="55" y="58" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor" className="text-[var(--muted)] font-mono">
                {t('visual.hand')}
              </text>
              <text x="55" y="68" textAnchor="middle" fontSize="7" fill="currentColor" className="text-[var(--muted)] font-mono">
                {t('visual.hand_dim')}
              </text>
              <text x="55" y="100" textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.everyday_object')}
              </text>
            </g>

            {/* Separator */}
            <line x1="145" y1="15" x2="145" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-[var(--border)]" />

            {/* Tattoo Area */}
            <g transform="translate(170, 8)">
              <rect x="10" y="8" width="88" height="76" rx="10" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
              {/* Half-sleeve panel curves */}
              <path d="M 22 45 Q 54 20 86 45 Q 54 70 22 45 Z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              
              {/* Dimension line */}
              <line x1="10" y1="92" x2="98" y2="92" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <line x1="10" y1="88" x2="10" y2="96" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <line x1="98" y1="88" x2="98" y2="96" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <text x="54" y="104" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" className="text-[var(--text-heading)]">
                {t('visual.large_dim')}
              </text>
              <text x="108" y="48" textAnchor="start" fontSize="9" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.large_placement')}
              </text>
            </g>
          </svg>
        )}

        {size === 'xlarge' && (
          <svg
            viewBox="0 0 340 110"
            className="w-full max-w-xs sm:max-w-sm h-auto block"
            aria-label={t('visual.aria_xlarge')}
            role="img"
          >
            {/* Forearm & Elbow Contour Reference */}
            <g transform="translate(15, 12)">
              {/* Arm silhouette: elbow to wrist */}
              <path
                d="M 10 32 Q 40 28 80 34 L 110 38 L 110 56 L 80 60 Q 40 64 10 58 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[var(--muted)]"
              />
              <line x1="110" y1="35" x2="110" y2="60" stroke="currentColor" strokeWidth="1.5" className="text-[var(--border)]" />
              <text x="55" y="47" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor" className="text-[var(--muted)] font-mono">
                {t('visual.forearm')}
              </text>
              <text x="55" y="56" textAnchor="middle" fontSize="7" fill="currentColor" className="text-[var(--muted)] font-mono">
                {t('visual.forearm_dim')}
              </text>
              <text x="55" y="88" textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.everyday_object')}
              </text>
            </g>

            {/* Separator */}
            <line x1="145" y1="15" x2="145" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-[var(--border)]" />

            {/* Tattoo Area */}
            <g transform="translate(165, 8)">
              <rect x="10" y="8" width="105" height="74" rx="10" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
              {/* Multi-session full piece outline */}
              <path d="M 22 25 L 98 25 L 88 65 L 32 65 Z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <text x="60" y="48" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor" className="text-[var(--primary)]">
                {t('visual.multi_session')}
              </text>
              
              {/* Dimension line */}
              <line x1="10" y1="90" x2="115" y2="90" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <line x1="10" y1="86" x2="10" y2="94" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <line x1="115" y1="86" x2="115" y2="94" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
              <text x="62" y="103" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" className="text-[var(--text-heading)]">
                {t('visual.xlarge_dim')}
              </text>
              <text x="122" y="48" textAnchor="start" fontSize="9" fill="currentColor" className="text-[var(--muted)]">
                {t('visual.xlarge_placement')}
              </text>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};
