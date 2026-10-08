import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BLOOD_GROUPS, BloodGroup } from '../data/bloodGroups';
import { Droplet, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface BloodGroupSectionProps {
  onSelectGroup: (group: BloodGroup) => void;
  donorCounts?: Record<string, number>;
}

export const BloodGroupSection: React.FC<BloodGroupSectionProps> = ({
  onSelectGroup,
  donorCounts = {},
}) => {
  const { language, t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold mb-3">
            <Droplet className="w-3.5 h-3.5 fill-red-600 text-red-600" />
            <span>{language === 'bn' ? 'রক্তের গ্রুপ ভিত্তিক দাতা' : 'Blood Group Directory'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'প্রয়োজনীয় রক্তের গ্রুপ নির্বাচন করুন' : 'Select Required Blood Group'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {language === 'bn'
              ? 'যেকোনো গ্রুপের কার্ডে ক্লিক করে সরাসরি সেই গ্রুপের নিবন্ধিত রক্তদাতাদের খুঁজুন'
              : 'Click any card to directly search registered donors for that specific blood group'}
          </p>
        </div>

        {/* 8 Blood Group Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {BLOOD_GROUPS.map((bg) => {
            const count = donorCounts[bg.group] || 12;
            const isRare = bg.group.includes('-');

            return (
              <div
                key={bg.group}
                onClick={() => onSelectGroup(bg.group)}
                className="group relative bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                {/* Rare or Universal Badge */}
                {bg.isUniversalDonor && (
                  <span className="absolute top-3 right-3 text-[10px] font-extrabold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md border border-amber-200">
                    {language === 'bn' ? 'সর্বজনীন দাতা' : 'Universal Donor'}
                  </span>
                )}
                {bg.isUniversalRecipient && (
                  <span className="absolute top-3 right-3 text-[10px] font-extrabold px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md border border-purple-200">
                    {language === 'bn' ? 'সর্বজনীন গ্রহীতা' : 'Universal Recipient'}
                  </span>
                )}
                {isRare && !bg.isUniversalDonor && (
                  <span className="absolute top-3 right-3 text-[10px] font-extrabold px-2 py-0.5 bg-rose-100 text-rose-800 rounded-md">
                    {language === 'bn' ? 'বিরল গ্রুপ' : 'Rare Group'}
                  </span>
                )}

                <div>
                  {/* Blood Group Symbol Icon */}
                  <div className="w-12 h-12 rounded-xl bg-red-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-red-200 group-hover:scale-105 group-hover:bg-red-700 transition">
                    {bg.group}
                  </div>

                  {/* Bengali Name */}
                  <h3 className="mt-3.5 text-lg font-black text-slate-900 group-hover:text-red-600 transition">
                    {bg.nameBn}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {bg.nameEn}
                  </p>

                  <div className="mt-2 text-xs text-slate-600 flex items-center space-x-1">
                    <span className="font-semibold text-slate-900">{count}+</span>
                    <span>{language === 'bn' ? 'জন নিবন্ধিত দাতা' : 'donors registered'}</span>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-red-600 group-hover:text-red-700">
                  <span>{t('findDonorsForGroup')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
