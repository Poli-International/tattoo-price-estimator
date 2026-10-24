// Consultation Questions Component for Tattoo Price Estimator V2
import React, { useState } from 'react';
import { Icon } from './Icon';
import { t } from '../i18n';

interface ConsultationQuestionsProps {
  questions: string[];
}

export const ConsultationQuestions: React.FC<ConsultationQuestionsProps> = ({ questions }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = [
      t('questions.clipboard_header'),
      t('questions.q1'),
      '   ' + t('questions.q1_sub'),
      t('questions.q2'),
      '   ' + t('questions.q2_sub'),
      t('questions.q3'),
      '   ' + t('questions.q3_sub'),
      t('questions.q4'),
      '   ' + t('questions.q4_sub')
    ].join('\n\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[var(--text-heading)] flex items-center gap-2">
              <span><Icon name="chat" /></span> {t('questions.title')}
            </h3>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-elevated)] px-2.5 py-0.5 rounded-full border border-[var(--border)]">
              {t('questions.badge')}
            </span>
          </div>
          <p className="text-xs text-[var(--muted)] mt-1">
            {t('questions.subtitle')}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="self-start sm:self-auto px-4 py-2 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-[var(--primary-contrast)] transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>{copied ? <Icon name="check" /> : <Icon name="clipboard" />}</span>
          <span>{copied ? t('questions.copied') : t('questions.copy_btn')}</span>
        </button>
      </div>

      <div className="space-y-3 pt-1">
        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3.5">
          <div className="text-xs font-bold text-[var(--text-heading)]">{t('questions.q1')}</div>
          <div className="text-[11px] text-[var(--muted)] mt-1">{t('questions.q1_sub')}</div>
        </div>

        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3.5">
          <div className="text-xs font-bold text-[var(--text-heading)]">{t('questions.q2')}</div>
          <div className="text-[11px] text-[var(--muted)] mt-1">{t('questions.q2_sub')}</div>
        </div>

        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3.5">
          <div className="text-xs font-bold text-[var(--text-heading)]">{t('questions.q3')}</div>
          <div className="text-[11px] text-[var(--muted)] mt-1">{t('questions.q3_sub')}</div>
        </div>

        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-3.5">
          <div className="text-xs font-bold text-[var(--text-heading)]">{t('questions.q4')}</div>
          <div className="text-[11px] text-[var(--muted)] mt-1">{t('questions.q4_sub')}</div>
        </div>
      </div>
    </div>
  );
};
