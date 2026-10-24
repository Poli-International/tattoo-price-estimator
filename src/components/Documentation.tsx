import React from 'react';
import { Icon } from './Icon';
import { t, SupportedLanguage, LANGUAGE_OPTIONS } from '../i18n';
import { REGION_ORDER } from '../data/pricingData';

interface DocumentationProps {
  currentLang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ currentLang, onLanguageChange }) => {
  return (
    <article
      id="section-documentation"
      aria-label={t('docs.title')}
      className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-10 shadow-lg space-y-10 text-[var(--text)]"
    >
      {/* Header */}
      <header className="border-b border-[var(--border)] pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-elevated)] text-[var(--primary)] border border-[var(--border)] w-fit">
            <span><Icon name="book" /></span>
            <span>{t('docs.title')}</span>
          </div>

          {currentLang && onLanguageChange && (
            <div className="inline-flex items-center gap-2 bg-[var(--surface-elevated)] border border-[var(--border)] px-3 py-1.5 rounded-lg shadow-sm w-fit self-end sm:self-auto">
              <label htmlFor="docs-language-selector" className="text-xs font-bold text-[var(--muted)]">
                Language:
              </label>
              <select
                id="docs-language-selector"
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                aria-label="Select language"
                className="bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] rounded px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
              >
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-heading)] tracking-tight">
            {t('docs.title')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-3xl">
            {t('docs.subtitle')}
          </p>
        </div>
      </header>

      {/* 1. Purpose and Limitations */}
      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
          {t('docs.sec1_title')}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text)]">
          {t('docs.sec1_p1')}
        </p>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {t('docs.sec1_p2')}
        </p>
      </section>

      {/* 2. The Six Pricing Inputs */}
      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
          {t('docs.sec2_title')}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {t('docs.sec2_intro')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1.5">
            <h4 className="text-sm font-bold text-[var(--text-heading)] flex items-center gap-2">
              <span className="text-[var(--primary)]"><Icon name="globe" /></span>
              {t('docs.sec2_region_title')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec2_region_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1.5">
            <h4 className="text-sm font-bold text-[var(--text-heading)] flex items-center gap-2">
              <span className="text-[var(--primary)]"><Icon name="ruler" /></span>
              {t('docs.sec2_size_title')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec2_size_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1.5">
            <h4 className="text-sm font-bold text-[var(--text-heading)] flex items-center gap-2">
              <span className="text-[var(--primary)]"><Icon name="pen" /></span>
              {t('docs.sec2_detail_title')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec2_detail_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1.5">
            <h4 className="text-sm font-bold text-[var(--text-heading)] flex items-center gap-2">
              <span className="text-[var(--primary)]"><Icon name="machine" /></span>
              {t('docs.sec2_color_title')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec2_color_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1.5">
            <h4 className="text-sm font-bold text-[var(--text-heading)] flex items-center gap-2">
              <span className="text-[var(--primary)]"><Icon name="pin" /></span>
              {t('docs.sec2_placement_title')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec2_placement_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1.5">
            <h4 className="text-sm font-bold text-[var(--text-heading)] flex items-center gap-2">
              <span className="text-[var(--primary)]"><Icon name="star" /></span>
              {t('docs.sec2_tier_title')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec2_tier_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. How to Read the Estimated Range */}
      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
          {t('docs.sec3_title')}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text)]">
          {t('docs.sec3_p1')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-2">
            <div className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
              {t('docs.sec3_low_label')}
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec3_low_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-2">
            <div className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
              {t('docs.sec3_high_label')}
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec3_high_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 4. The Studio Shop Minimum */}
      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
          {t('docs.sec4_title')}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text)]">
          {t('docs.sec4_p1')}
        </p>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {t('docs.sec4_p2')}
        </p>
      </section>

      {/* 5. Deposits and Booking Commitments */}
      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
          {t('docs.sec5_title')}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text)]">
          {t('docs.sec5_p1')}
        </p>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {t('docs.sec5_p2')}
        </p>
      </section>

      {/* 6. Multi-Session Projects */}
      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
          {t('docs.sec6_title')}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text)]">
          {t('docs.sec6_p1')}
        </p>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {t('docs.sec6_p2')}
        </p>
      </section>

      {/* 7. Four Questions to Bring to Your Consultation */}
      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
          {t('docs.sec7_title')}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {t('docs.sec7_intro')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1.5">
            <h4 className="text-sm font-bold text-[var(--text-heading)]">
              {t('docs.sec7_q1_label')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec7_q1_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1.5">
            <h4 className="text-sm font-bold text-[var(--text-heading)]">
              {t('docs.sec7_q2_label')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec7_q2_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1.5">
            <h4 className="text-sm font-bold text-[var(--text-heading)]">
              {t('docs.sec7_q3_label')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec7_q3_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1.5">
            <h4 className="text-sm font-bold text-[var(--text-heading)]">
              {t('docs.sec7_q4_label')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec7_q4_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 8. Tipping Etiquette and Conventions */}
      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
          {t('docs.sec8_title')}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {t('docs.sec8_p1')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1">
            <h4 className="text-sm font-bold text-[var(--text-heading)]">
              {t('docs.sec8_us_label')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec8_us_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1">
            <h4 className="text-sm font-bold text-[var(--text-heading)]">
              {t('docs.sec8_uk_label')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec8_uk_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1">
            <h4 className="text-sm font-bold text-[var(--text-heading)]">
              {t('docs.sec8_eu_label')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec8_eu_desc')}
            </p>
          </div>

          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 space-y-1">
            <h4 className="text-sm font-bold text-[var(--text-heading)]">
              {t('docs.sec8_au_label')}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {t('docs.sec8_au_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 9. Using the Printable Consultation Worksheet */}
      <section className="space-y-3 border-t border-[var(--border)] pt-6">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
          {t('docs.sec9_title')}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text)]">
          {t('docs.sec9_p1')}
        </p>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {t('docs.sec9_p2')}
        </p>
      </section>
      {/* 10. Where the 2026 prices come from */}
      <section className="space-y-3 border-t border-[var(--border)] pt-6">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
          {t('docs.sec10_title')}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text)]">
          {t('docs.sec10_p1')}
        </p>
        <ul className="text-xs leading-relaxed text-[var(--muted)] list-disc pl-4 space-y-1">
          {REGION_ORDER.map((id) => (
            <li key={id}>{t(`docs.sec10_src_${id}`)}</li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {t('docs.sec10_note')}
        </p>
      </section>
    </article>
  );
};
