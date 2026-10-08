import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BLOOD_GROUPS, BloodGroup, MEDICAL_DISCLAIMER_BN, MEDICAL_DISCLAIMER_EN } from '../data/bloodGroups';
import { GitCompare, ShieldAlert, Check, X as XIcon, ArrowRight } from 'lucide-react';

export const CompatibilityMatrixSection: React.FC = () => {
  const { language } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O+');

  const currentInfo = BLOOD_GROUPS.find((b) => b.group === selectedGroup)!;

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-3">
            <GitCompare className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'এবিও ও আরএইচ ব্লাড টাইপ' : 'ABO & Rh Blood System'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'রক্তের গ্রুপের সামঞ্জস্যতা (Compatibility)' : 'Blood Group Compatibility Matrix'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {language === 'bn'
              ? 'কে কাকে লোহিত রক্তকণিকা (Red Blood Cells) দিতে পারে এবং কার থেকে গ্রহণ করতে পারে'
              : 'Interactive compatibility chart between donors and recipients for red blood cells'}
          </p>
        </div>

        {/* Medical disclaimer reminder */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 mb-8 flex items-start space-x-3.5 shadow-xs">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed font-semibold">
            {language === 'bn' ? MEDICAL_DISCLAIMER_BN : MEDICAL_DISCLAIMER_EN}
          </div>
        </div>

        {/* Interactive Group Selector */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 text-center sm:text-left">
            {language === 'bn' ? 'রক্তের গ্রুপ নির্বাচন করে পরীক্ষা করুন:' : 'Select a Blood Group to Test:'}
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
            {BLOOD_GROUPS.map((bg) => (
              <button
                key={bg.group}
                onClick={() => setSelectedGroup(bg.group)}
                className={`py-3 rounded-xl font-black text-base sm:text-lg transition-all cursor-pointer flex flex-col items-center justify-center border-2 ${
                  selectedGroup === bg.group
                    ? 'bg-red-600 text-white border-red-600 shadow-md scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300 hover:bg-white'
                }`}
              >
                <span>{bg.group}</span>
                <span className="text-[10px] font-normal opacity-80">{bg.nameBn.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Interactive Breakdown for Selected Group */}
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Can Donate To */}
            <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100">
              <h3 className="text-sm font-bold text-rose-900 mb-2 flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-black">
                  ↑
                </span>
                <span>
                  {language === 'bn'
                    ? `${selectedGroup} রক্তদাতা কাকে রক্ত দিতে পারবে:`
                    : `${selectedGroup} Can Donate Blood To:`}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {BLOOD_GROUPS.map((target) => {
                  const canDonate = currentInfo.canDonateTo.includes(target.group);
                  return (
                    <div
                      key={target.group}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border ${
                        canDonate
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-100 text-slate-400 border-slate-200 line-through opacity-60'
                      }`}
                    >
                      {canDonate ? <Check className="w-3.5 h-3.5" /> : <XIcon className="w-3.5 h-3.5" />}
                      <span>{target.group} ({target.nameBn})</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Can Receive From */}
            <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-black">
                  ↓
                </span>
                <span>
                  {language === 'bn'
                    ? `${selectedGroup} গ্রহীতা কার থেকে রক্ত নিতে পারবে:`
                    : `${selectedGroup} Can Receive Blood From:`}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {BLOOD_GROUPS.map((target) => {
                  const canReceive = currentInfo.canReceiveFrom.includes(target.group);
                  return (
                    <div
                      key={target.group}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border ${
                        canReceive
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-100 text-slate-400 border-slate-200 line-through opacity-60'
                      }`}
                    >
                      {canReceive ? <Check className="w-3.5 h-3.5" /> : <XIcon className="w-3.5 h-3.5" />}
                      <span>{target.group} ({target.nameBn})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Full Comprehensive 8x8 Compatibility Table */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-x-auto">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            {language === 'bn' ? 'পূর্ণাঙ্গ রক্তের সামঞ্জস্যতা ছক' : 'Complete Blood Compatibility Chart'}
          </h3>
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-3 border border-slate-200 font-bold text-left">
                  {language === 'bn' ? 'রক্তদাতার গ্রুপ (Donor)' : 'Donor Blood Group'}
                </th>
                {BLOOD_GROUPS.map((bg) => (
                  <th key={bg.group} className="p-3 border border-slate-200 font-black text-red-600">
                    {bg.group}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BLOOD_GROUPS.map((donor) => (
                <tr key={donor.group} className="hover:bg-slate-50 transition">
                  <td className="p-3 border border-slate-200 font-bold text-left bg-slate-50/50">
                    <span className="text-red-700 font-black">{donor.group}</span>{' '}
                    <span className="text-slate-500 font-normal">({donor.nameBn})</span>
                  </td>
                  {BLOOD_GROUPS.map((recipient) => {
                    const match = donor.canDonateTo.includes(recipient.group);
                    return (
                      <td
                        key={recipient.group}
                        className={`p-3 border border-slate-200 font-bold ${
                          match ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-300'
                        }`}
                      >
                        {match ? '✓' : '—'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[11px] text-slate-500 mt-3 italic text-right">
            {language === 'bn'
              ? '✓ = লোহিত রক্তকণিকা প্রদানযোগ্য | — = সামঞ্জস্যহীন'
              : '✓ = Compatible for Red Blood Cells | — = Incompatible'}
          </p>
        </div>
      </div>
    </div>
  );
};
