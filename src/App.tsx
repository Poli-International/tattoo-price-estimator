// Tattoo Price Estimator V2 - Client Pricing Guide
import React, { useState, useMemo } from 'react';
import { Icon } from './components/Icon';
import { createPortal } from 'react-dom';
import {
  RegionId,
  SizeCategory,
  DetailLevel,
  ColorOption,
  PlacementArea,
  ArtistTier
} from './types';
import { REGIONAL_PRICING, SIZE_SPECS, REGION_ORDER, PRICES_UPDATED } from './data/pricingData';
import { calculatePriceRange, calculatePriceDrivers } from './utils/calculator';
import { SizeReferenceSvg } from './components/SizeReferenceSvg';
import { InteractiveBreakdown } from './components/InteractiveBreakdown';
import { StudioBenchmark } from './components/StudioBenchmark';
import { MultiSessionPlan } from './components/MultiSessionPlan';
import { ConsultationQuestions } from './components/ConsultationQuestions';
import { PrintWorksheet } from './components/PrintWorksheet';
import { Documentation } from './components/Documentation';
import { t, setLanguage, resolveInitialLanguage, SupportedLanguage, SUPPORTED_LANGUAGES, LANGUAGE_OPTIONS, fmt } from './i18n';

export default function App() {
  // Language state for React re-render
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    const initial = resolveInitialLanguage();
    setLanguage(initial);
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.lang = initial;
    }
    return initial;
  });

  const applyLanguage = (code: SupportedLanguage) => {
    // 1. call setLanguage(code) FIRST, so the module variable is already correct
    setLanguage(code);
    // 2. then set the React state, which triggers the re-render that calls t() again
    setCurrentLang(code);
    // 3. write the choice to localStorage
    try {
      localStorage.setItem('poli_language', code);
    } catch (err) {}
    // 4. set document.documentElement.lang to the code
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.lang = code;
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    applyLanguage(e.target.value as SupportedLanguage);
  };

  // State for client selections
  const [regionId, setRegionId] = useState<RegionId>('uk');
  const [size, setSize] = useState<SizeCategory>('small');
  const [detail, setDetail] = useState<DetailLevel>('moderate');
  const [color, setColor] = useState<ColorOption>('black_grey');
  const [placement, setPlacement] = useState<PlacementArea>('easy');
  const [artistTier, setArtistTier] = useState<ArtistTier>('standard');
  const [showBenchmark, setShowBenchmark] = useState(false);

  // Calculated results
  const estimate = useMemo(() => {
    return calculatePriceRange(regionId, size, detail, color, placement, artistTier);
  }, [regionId, size, detail, color, placement, artistTier]);

  const drivers = useMemo(() => {
    return calculatePriceDrivers(regionId, size, detail, color, placement, artistTier);
  }, [regionId, size, detail, color, placement, artistTier]);

  const region = REGIONAL_PRICING[regionId];

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setRegionId('uk');
    setSize('small');
    setDetail('moderate');
    setColor('black_grey');
    setPlacement('easy');
    setArtistTier('standard');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 font-sans text-[var(--text)]">
      {/* Screen layout (hidden on print) */}
      <div className="print:hidden space-y-8">
        
        {/* ========================================================= */}
        {/* 1. REASSURING PAGE ORIENTATION (First thing the user sees) */}
        {/* ========================================================= */}
        <header className="space-y-4">
          {/* Language Selector in header area, before first input */}
          <div className="flex justify-end items-center">
            <div className="inline-flex items-center gap-2 bg-[var(--surface-elevated)] border border-[var(--border)] px-3 py-1.5 rounded-lg shadow-sm">
              <label htmlFor="language-selector" className="text-xs font-bold text-[var(--muted)]">
                {t('app.language_label')}
              </label>
              <select
                id="language-selector"
                value={currentLang}
                onChange={handleLanguageChange}
                aria-label={t('app.language_aria')}
                className="bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] rounded px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
              >
                {LANGUAGE_OPTIONS.map((o) => (
                  <option key={o.code} value={o.code}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-elevated)] text-[var(--primary)] border border-[var(--border)]">
              <span><Icon name="spark" /></span>
              <span>{t('app.badge')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-heading)] tracking-tight">
              {t('app.title')}
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
              {t('intro.welcome_desc')}
            </p>
          </div>
        </header>

        {/* ========================================================= */}
        {/* 2. THE PRICE RANGE AS THE HERO (Second thing the user sees)*/}
        {/* Price range is the hero, reasons are legible without click */}
        {/* ========================================================= */}
        <section
          aria-label={t('result.estimated_range')}
          className="bg-[var(--surface)] border-2 border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6"
        >
          {/* Hero Range Value Header */}
          <div className="text-center space-y-2 pb-6 border-b border-[var(--border)]">
            <span className="text-xs font-black uppercase tracking-widest text-[var(--primary)] bg-[var(--surface-elevated)] px-3 py-1 rounded-full border border-[var(--border)] inline-block">
              {t('result.estimated_range')}
            </span>
            <div className="text-4xl sm:text-6xl font-black text-[var(--text-heading)] tracking-tight pt-1">
              {region.currency}{fmt(estimate.priceLow)} – {region.currency}{fmt(estimate.priceHigh)}
            </div>
            <p className="text-sm font-semibold text-[var(--muted)]">
              {t('result.time_estimate', { hoursLow: estimate.estimatedHoursLow, hoursHigh: estimate.estimatedHoursHigh })}
            </p>
            <p className="text-xs text-[var(--muted)]">
              {t('result.prices_updated', { year: String(PRICES_UPDATED) })}
            </p>
          </div>

          {/* Range Explanation: Legible immediately without any click */}
          <div className="space-y-4">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[var(--text-heading)]">
                {t('result.why_range_title')}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                {t('result.why_range_intro')}
              </p>
            </div>

            {/* Side-by-side low vs high driver cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* What keeps it near low end */}
              <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 sm:p-5 space-y-2">
                <div className="text-xs sm:text-sm font-bold text-[var(--text-heading)] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  <span>{t('result.low_reasons_title', { currency: region.currency, low: estimate.priceLow })}</span>
                </div>
                <ul className="text-xs text-[var(--muted)] space-y-1.5 pl-4 list-disc leading-relaxed">
                  {estimate.lowReasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>

              {/* What moves it toward high end */}
              <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 sm:p-5 space-y-2">
                <div className="text-xs sm:text-sm font-bold text-[var(--text-heading)] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                  <span>{t('result.high_reasons_title', { currency: region.currency, high: estimate.priceHigh })}</span>
                </div>
                <ul className="text-xs text-[var(--muted)] space-y-1.5 pl-4 list-disc leading-relaxed">
                  {estimate.highReasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. THE SHOP MINIMUM FLOOR EXPLANATION (Third thing seen)  */}
        {/* Must precede interactive form controls for first-timers   */}
        {/* ========================================================= */}
        <aside
          aria-label={t('min.aria_notice')}
          className="bg-[var(--surface-elevated)] border-l-4 border-l-[var(--primary)] border-y border-r border-[var(--border)] rounded-r-xl p-4 sm:p-5 shadow-sm space-y-1.5"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0" aria-hidden="true"><Icon name="warn" /></span>
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wide text-[var(--primary)]">
                {t('min.badge')} &bull; {t('min.title')}
              </div>
              <p className="text-xs sm:text-sm font-bold text-[var(--text-heading)]">
                {t('min.alert', { currency: region.currency, minLow: region.shopMinimumLow, minHigh: region.shopMinimumHigh })}
              </p>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                {t('min.explanation')}
              </p>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* 4. INTERACTIVE CONTROLS (Explanation BEFORE each control) */}
        {/* ========================================================= */}
        <section aria-label={t('app.aria_customize')} className="space-y-6">
          <div className="border-b border-[var(--border)] pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text-heading)] tracking-tight">
              {t('app.customize_title')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-0.5">
              {t('app.customize_subtitle')}
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Control 1: Region / Location (Explanation BEFORE control) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-3">
              <div>
                <label htmlFor="region-select-input" className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]">
                  1. {t('region.label')}
                </label>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  {t('region.explanation')}
                </p>
              </div>
              <select
                id="region-select-input"
                value={regionId}
                onChange={(e) => setRegionId(e.target.value as RegionId)}
                className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm font-semibold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              >
                {REGION_ORDER.map((id) => (
                  <option key={id} value={id}>{t(`region.${id}`)}</option>
                ))}
              </select>
            </div>

            {/* Control 2: Size & Physical Scale (Explanation BEFORE control) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]">
                  2. {t('size.label')}
                </span>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  {t('size.explanation')}
                </p>
              </div>

              {/* Real-scale SVG Reference (Scales on phones) */}
              <SizeReferenceSvg size={size} />

              {/* Size buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
                {(['tiny', 'small', 'medium', 'large', 'xlarge'] as SizeCategory[]).map((cat) => {
                  const spec = SIZE_SPECS[cat];
                  const isSelected = size === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSize(cat)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[var(--surface-elevated)] border-[var(--primary)] ring-2 ring-[var(--primary)] shadow-sm'
                          : 'bg-[var(--surface-elevated)] border-[var(--border)] hover:border-[var(--muted)]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[var(--text-heading)]">
                        {t(spec.nameKey)}
                      </div>
                      <div className="text-[11px] text-[var(--muted)] mt-1">
                        {t(`size.${spec.id}.dim`)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 3: Detail Level (Explanation BEFORE control) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-3">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]">
                  3. {t('detail.label')}
                </span>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  {t('detail.explanation')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['minimal', 'moderate', 'intricate'] as DetailLevel[]).map((lvl) => {
                  const isSelected = detail === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDetail(lvl)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[var(--surface-elevated)] border-[var(--primary)] ring-2 ring-[var(--primary)] shadow-sm'
                          : 'bg-[var(--surface-elevated)] border-[var(--border)] hover:border-[var(--muted)]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[var(--text-heading)]">
                        {t(`detail.${lvl}.name`)}
                      </div>
                      <div className="text-[11px] text-[var(--muted)] mt-1 leading-normal">
                        {t(`detail.${lvl}.desc`)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 4: Colour Option (Explanation BEFORE control) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-3">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]">
                  4. {t('color.label')}
                </span>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  {t('color.explanation')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(['black_grey', 'color'] as ColorOption[]).map((opt) => {
                  const isSelected = color === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setColor(opt)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[var(--surface-elevated)] border-[var(--primary)] ring-2 ring-[var(--primary)] shadow-sm'
                          : 'bg-[var(--surface-elevated)] border-[var(--border)] hover:border-[var(--muted)]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[var(--text-heading)]">
                        {t(`color.${opt}.name`)}
                      </div>
                      <div className="text-[11px] text-[var(--muted)] mt-1 leading-normal">
                        {t(`color.${opt}.desc`)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 5: Placement Area (Explanation BEFORE control) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-3">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]">
                  5. {t('placement.label')}
                </span>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  {t('placement.explanation')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['easy', 'moderate', 'difficult'] as PlacementArea[]).map((plc) => {
                  const isSelected = placement === plc;
                  return (
                    <button
                      key={plc}
                      type="button"
                      onClick={() => setPlacement(plc)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[var(--surface-elevated)] border-[var(--primary)] ring-2 ring-[var(--primary)] shadow-sm'
                          : 'bg-[var(--surface-elevated)] border-[var(--border)] hover:border-[var(--muted)]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[var(--text-heading)]">
                        {t(`placement.${plc}.name`)}
                      </div>
                      <div className="text-[11px] text-[var(--muted)] mt-1 leading-normal">
                        {t(`placement.${plc}.desc`)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 6: Artist Seniority Tier (Explanation BEFORE control) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-3">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]">
                  6. {t('artist.label')}
                </span>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  {t('artist.explanation')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(['standard', 'specialist'] as ArtistTier[]).map((tier) => {
                  const isSelected = artistTier === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setArtistTier(tier)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[var(--surface-elevated)] border-[var(--primary)] ring-2 ring-[var(--primary)] shadow-sm'
                          : 'bg-[var(--surface-elevated)] border-[var(--border)] hover:border-[var(--muted)]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[var(--text-heading)]">
                        {t(`artist.${tier}.name`)}
                      </div>
                      <div className="text-[11px] text-[var(--muted)] mt-1 leading-normal">
                        {t(`artist.${tier}.desc`)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. LIVE PRICE DRIVERS (What moves the price)               */}
        {/* ========================================================= */}
        <InteractiveBreakdown drivers={drivers} currency={region.currency} />

        {/* ========================================================= */}
        {/* 6. BOOKING TERMS & DEPOSIT REALITY                        */}
        {/* ========================================================= */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
            <span><Icon name="calendar" /></span>
            <span>{t('deposit.badge')} &bull; {t('deposit.title')}</span>
          </div>
          <div className="text-sm font-semibold text-[var(--text-heading)]">
            {t('deposit.range_label', { currency: region.currency, depLow: estimate.depositLow, depHigh: estimate.depositHigh })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[var(--muted)]">
            <div className="bg-[var(--surface-elevated)] p-3 rounded-lg border border-[var(--border)] space-y-1">
              <strong className="text-[var(--text-heading)] block">{t('deposit.label_date')}</strong>
              <span>{t('deposit.point1')}</span>
            </div>
            <div className="bg-[var(--surface-elevated)] p-3 rounded-lg border border-[var(--border)] space-y-1">
              <strong className="text-[var(--text-heading)] block">{t('deposit.label_deducted')}</strong>
              <span>{t('deposit.point2')}</span>
            </div>
            <div className="bg-[var(--surface-elevated)] p-3 rounded-lg border border-[var(--border)] space-y-1">
              <strong className="text-[var(--text-heading)] block">{t('deposit.label_notice')}</strong>
              <span>{t('deposit.point3')}</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 7. MULTI-SESSION ROADMAP (Rendered when applicable)        */}
        {/* ========================================================= */}
        <MultiSessionPlan estimate={estimate} />

        {/* ========================================================= */}
        {/* 8. 4 QUESTIONS TO ASK YOUR ARTIST (Consultation Toolkit)  */}
        {/* ========================================================= */}
        <ConsultationQuestions />

        {/* ========================================================= */}
        {/* 9. REGIONAL TIPPING CONVENTIONS                           */}
        {/* ========================================================= */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
            <span><Icon name="bulb" /></span>
            <span>{t('tipping.badge')} &bull; {t('tipping.title')}</span>
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-[var(--text-heading)]">
            {t(`tipping.${regionId}.title`)}
          </h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            {t(`tipping.${regionId}.desc`)}
          </p>
        </div>

        {/* ========================================================= */}
        {/* 10. STUDIO PRICING BENCHMARK ACCORDION / TOGGLE           */}
        {/* ========================================================= */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                {t('bench.badge')}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mt-0.5">
                {t('bench.title')}
              </h3>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                {t('bench.subtitle')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowBenchmark(!showBenchmark)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface)] text-[var(--text-heading)] transition-colors self-start sm:self-auto"
            >
              {showBenchmark ? 'Hide Benchmark Table' : t('action.compare_benchmark')}
            </button>
          </div>

          {showBenchmark && (
            <div className="pt-2 border-t border-[var(--border)]">
              <StudioBenchmark />
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 11. DOCUMENTATION & CLIENT PRICING GUIDE                   */}
        {/* ========================================================= */}
        <section className="pt-2" aria-label="Documentation">
          <Documentation
            currentLang={currentLang}
            onLanguageChange={applyLanguage}
          />
        </section>

        {/* ========================================================= */}
        {/* 12. BOTTOM ACTION BAR: PRINT WORKSHEET & RESET            */}
        {/* ========================================================= */}
        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[var(--muted)] text-center sm:text-left">
            {t('app.disclaimer')}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--text-heading)] transition-colors"
            >
              {t('action.reset')}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-[var(--primary)] text-[var(--primary-contrast)] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span><Icon name="print" /></span>
              <span>{t('action.print')}</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 13. PORTAL TO HOST PAGE DOCUMENTATION TAB (IF PRESENT)     */}
      {/* ========================================================= */}
      {typeof document !== 'undefined' &&
        document.getElementById('doc-view-estimator') &&
        createPortal(
          <Documentation
            currentLang={currentLang}
            onLanguageChange={applyLanguage}
          />,
          document.getElementById('doc-view-estimator')!
        )}

      {/* ========================================================= */}
      {/* 14. CLEAN SINGLE-PAGE PRINT SHEET (No buttons/navigation) */}
      {/* ========================================================= */}
      <PrintWorksheet
        regionId={regionId}
        size={size}
        detail={detail}
        color={color}
        placement={placement}
        artistTier={artistTier}
        estimate={estimate}
      />
    </div>
  );
}
