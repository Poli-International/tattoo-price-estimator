// Printable Consultation Worksheet Component for Tattoo Price Estimator V2
import React from 'react';
import { EstimateResult, RegionId, SizeCategory, DetailLevel, ColorOption, PlacementArea, ArtistTier } from '../types';
import { REGIONAL_PRICING, SIZE_SPECS } from '../data/pricingData';
import { t, fmt } from '../i18n';

interface PrintWorksheetProps {
  regionId: RegionId;
  size: SizeCategory;
  detail: DetailLevel;
  color: ColorOption;
  placement: PlacementArea;
  artistTier: ArtistTier;
  estimate: EstimateResult;
}

export const PrintWorksheet: React.FC<PrintWorksheetProps> = ({
  regionId,
  size,
  detail,
  color,
  placement,
  artistTier,
  estimate
}) => {
  const region = REGIONAL_PRICING[regionId];
  const sizeSpec = SIZE_SPECS[size];
  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div id="print-worksheet" className="hidden print:block w-full max-w-full p-4 bg-white text-black font-sans leading-tight">
      {/* Document Header */}
      <div className="border-b-2 border-black pb-2 mb-3 flex justify-between items-end">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight text-black m-0 p-0">
            {t('print.sheet_title')}
          </h1>
          <p className="text-[10px] text-gray-700 m-0 mt-0.5">
            {t('print.planning_reference')}
          </p>
        </div>
        <div className="text-right text-[10px] text-gray-700">
          <div>{t('print.generated_date', { date: today })}</div>
          <div>{t('print.location_val', { location: t(region.nameKey) })}</div>
        </div>
      </div>

      {/* Row 1: The Estimated Range Hero Box (Left) + Specifications (Right) */}
      <div className="grid grid-cols-12 gap-3 mb-3">
        {/* Hero Estimate Box */}
        <div className="col-span-5 border-2 border-black rounded p-2.5 bg-gray-50 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
              {t('print.est_heading')}
            </div>
            <div className="text-2xl font-black text-black tracking-tight my-1">
              {estimate.currency}{fmt(estimate.priceLow)} – {estimate.currency}{fmt(estimate.priceHigh)}
            </div>
            <div className="text-[10px] font-semibold text-gray-800">
              {t('result.time_estimate', { hoursLow: estimate.estimatedHoursLow, hoursHigh: estimate.estimatedHoursHigh })}
            </div>
          </div>
          <div className="border-t border-gray-300 pt-1.5 mt-2 text-[10px] text-gray-700 space-y-0.5">
            <div><strong>{t('print.shop_min_label')}</strong> {region.currency}{fmt(region.shopMinimumLow)} – {region.currency}{fmt(region.shopMinimumHigh)} {t('print.baseline_setup')}</div>
            <div><strong>{t('print.deposit_label')}</strong> {estimate.currency}{fmt(estimate.depositLow)} – {estimate.currency}{fmt(estimate.depositHigh)} {t('print.deducted_from_total')}</div>
            {estimate.isMultiSession && (
              <div className="text-black font-bold">
                {t('print.multisession_plan', { count: estimate.sessionCount, currency: estimate.currency, costLow: estimate.sessionCostLow, costHigh: estimate.sessionCostHigh })}
              </div>
            )}
          </div>
        </div>

        {/* Client Specifications & Assumptions */}
        <div className="col-span-7 border border-gray-400 rounded p-2.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-1.5">
            {t('print.client_spec_heading')}
          </div>
          <table className="w-full text-[10px] text-gray-900 border-collapse">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-0.5 font-bold w-1/3">{t('print.target_size')}</td>
                <td className="py-0.5">{t(sizeSpec.nameKey)} ({t(`size.${sizeSpec.id}.dim`)}) — {t('print.scale_of', { item: t(sizeSpec.referenceItemKey) })}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-0.5 font-bold">{t('print.design_detail')}</td>
                <td className="py-0.5">{t(`detail.${detail}.name`)} — {t(`detail.${detail}.desc`)}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-0.5 font-bold">{t('print.color_palette')}</td>
                <td className="py-0.5">{t(`color.${color}.name`)}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-0.5 font-bold">{t('print.body_placement')}</td>
                <td className="py-0.5">{t(`placement.${placement}.name`)} ({t(`placement.${placement}.desc`)})</td>
              </tr>
              <tr>
                <td className="py-0.5 font-bold">{t('print.artist_tier')}</td>
                <td className="py-0.5">{t(`artist.${artistTier}.name`)} ({t(`artist.${artistTier}.desc`)})</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 2: Why This Range Exists */}
      <div className="border border-gray-300 rounded p-2.5 mb-3 bg-white">
        <div className="text-[10px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-1.5">
          {t('print.why_range_heading')}
        </div>
        <div className="grid grid-cols-2 gap-3 text-[10px]">
          <div>
            <span className="font-bold text-gray-900">{t('print.keeps_near', { currency: estimate.currency, priceLow: estimate.priceLow })}</span>
            <ul className="list-disc pl-3.5 space-y-0.5 text-gray-700 mt-0.5">
              {estimate.lowReasons.slice(0, 2).map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-bold text-gray-900">{t('print.moves_toward', { currency: estimate.currency, priceHigh: estimate.priceHigh })}</span>
            <ul className="list-disc pl-3.5 space-y-0.5 text-gray-700 mt-0.5">
              {estimate.highReasons.slice(0, 2).map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Row 3: 4 Questions to Ask the Artist During Consultation */}
      <div className="border border-gray-400 rounded p-2.5 mb-3">
        <div className="text-[10px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-1.5">
          {t('print.questions_heading')}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[9.5px] text-gray-800">
          <div>
            <strong>{t('print.q1_title')}</strong>
            <p className="m-0 text-gray-600">{t('questions.q1_sub')}</p>
          </div>
          <div>
            <strong>{t('print.q2_title')}</strong>
            <p className="m-0 text-gray-600">{t('questions.q2_sub')}</p>
          </div>
          <div>
            <strong>{t('print.q3_title')}</strong>
            <p className="m-0 text-gray-600">{t('questions.q3_sub')}</p>
          </div>
          <div>
            <strong>{t('print.q4_title')}</strong>
            <p className="m-0 text-gray-600">{t('questions.q4_sub')}</p>
          </div>
        </div>
      </div>

      {/* Row 4: Studio Confirmation & Hand-written Notes */}
      <div className="border border-gray-400 rounded p-2.5">
        <div className="text-[10px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-2">
          {t('print.notes_heading')} {t('print.for_studio_use')}
        </div>
        <div className="grid grid-cols-3 gap-3 text-[10px] text-gray-800">
          <div className="border-b border-gray-400 pb-1">
            {t('print.confirmed_quote')}
          </div>
          <div className="border-b border-gray-400 pb-1">
            {t('print.deposit_received')}
          </div>
          <div className="border-b border-gray-400 pb-1">
            {t('print.appointment_date')}
          </div>
        </div>
        <div className="mt-2 pt-1 text-[9px] text-gray-500 flex justify-between">
          <span>{t('print.footer')}</span>
          <span>{t('print.non_binding')}</span>
        </div>
      </div>
    </div>
  );
};
