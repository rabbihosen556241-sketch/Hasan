import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BLOOD_GROUPS, BloodGroup } from '../data/bloodGroups';
import { BANGLADESH_LOCATIONS } from '../data/bangladeshLocations';
import { PlatformStatistics } from '../types';
import {
  Search,
  Droplet,
  Heart,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface HeroSectionProps {
  stats: PlatformStatistics;
  onSearch: (filters: { bloodGroup?: string; district?: string }) => void;
  onOpenRegister: () => void;
  onOpenFindDonor: () => void;
  onOpenCreateRequest: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stats,
  onSearch,
  onOpenRegister,
  onOpenFindDonor,
  onOpenCreateRequest,
}) => {
  const { language, t } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');

  // Flatten all districts for the dropdown
  const allDistricts = BANGLADESH_LOCATIONS.flatMap((div) => div.districts);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      bloodGroup: selectedGroup !== 'ALL' ? selectedGroup : undefined,
      district: selectedDistrict !== 'ALL' ? selectedDistrict : undefined,
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-slate-50 pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-rose-100">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-rose-300/20 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs sm:text-sm font-semibold mb-6 border border-red-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span>
              {language === 'bn'
                ? 'মানবিক ও বিনামূল্যে রক্তের সন্ধানকারী জাতীয় প্ল্যাটফর্ম'
                : 'Free & Humanitarian National Blood Finder Platform'}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            {t('heroHeadline')}
          </h1>

          {/* Subheadline */}
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal">
            {t('heroSubheadline')}
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenFindDonor}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-bold text-base shadow-lg shadow-red-200 hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>{t('btnFindDonor')}</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-rose-50 text-red-600 border-2 border-red-200 hover:border-red-400 rounded-xl font-bold text-base shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-red-600" />
              <span>{t('btnRegisterDonor')}</span>
            </button>
          </div>
        </div>

        {/* Quick Search Floating Box */}
        <div className="mt-10 max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-rose-100">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
              <Droplet className="w-4 h-4 text-red-600 fill-red-600" />
              <span>{language === 'bn' ? 'দ্রুত রক্তদাতা খুঁজুন' : 'Quick Donor Search'}</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              {language === 'bn' ? '৮টি গ্রুপ ও ৬৪ জেলার দাতা তালিকা' : 'Donors across 8 groups & 64 districts'}
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Blood Group Select */}
            <div className="sm:col-span-5">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                {language === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="ALL">{t('allBloodGroups')}</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg.group} value={bg.group}>
                    {bg.group} ({bg.nameBn})
                  </option>
                ))}
              </select>
            </div>

            {/* District Select */}
            <div className="sm:col-span-4">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                {language === 'bn' ? 'জেলা' : 'District'}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="ALL">{t('allDistricts')}</option>
                {allDistricts.map((dst) => (
                  <option key={dst.nameEn} value={dst.nameEn}>
                    {language === 'bn' ? dst.nameBn : dst.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-3 flex items-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-md shadow-red-200 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{t('searchDonors')}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Statistics Counter Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {/* Total Donors */}
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-rose-100 shadow-xs text-center hover:border-red-300 transition">
            <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              {stats.totalDonors}+
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {t('statTotalDonors')}
            </p>
          </div>

          {/* Active Donors */}
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-rose-100 shadow-xs text-center hover:border-red-300 transition">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-700">
              {stats.activeDonors}+
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {t('statActiveDonors')}
            </p>
          </div>

          {/* Total Requests */}
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-rose-100 shadow-xs text-center hover:border-red-300 transition">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              {stats.totalRequests}+
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {t('statTotalRequests')}
            </p>
          </div>

          {/* Completed Donations */}
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-rose-100 shadow-xs text-center hover:border-red-300 transition">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
              <Heart className="w-5 h-5 fill-rose-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-rose-600">
              {stats.completedDonations}+
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {t('statCompletedDonations')}
            </p>
          </div>

          {/* Urgent Emergency Requests */}
          <div className="col-span-2 md:col-span-1 bg-red-500 text-white p-4 rounded-xl shadow-md text-center hover:bg-red-600 transition animate-blood-pulse">
            <div className="w-9 h-9 rounded-lg bg-white/20 text-white flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-300" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">
              {stats.emergencyRequests}
            </p>
            <p className="text-xs text-white/90 font-semibold mt-0.5">
              {t('statEmergencyRequests')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
