import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '১',
      title: t('step1Title'),
      desc: t('step1Desc'),
      icon: Search,
      bg: 'bg-red-50 text-red-600',
    },
    {
      num: '২',
      title: t('step2Title'),
      desc: t('step2Desc'),
      icon: ShieldCheck,
      bg: 'bg-rose-50 text-rose-600',
    },
    {
      num: '৩',
      title: t('step3Title'),
      desc: t('step3Desc'),
      icon: HeartHandshake,
      bg: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('howItWorksTitle')}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t('howItWorksSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-red-300 hover:shadow-md transition text-center flex flex-col items-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-4 shadow-sm`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
