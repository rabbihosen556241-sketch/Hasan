import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Donor } from '../types';
import { BLOOD_GROUPS, BloodGroup } from '../data/bloodGroups';
import { BANGLADESH_LOCATIONS } from '../data/bangladeshLocations';
import {
  Search,
  Filter,
  ShieldCheck,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  PhoneCall,
  Heart,
  Flag,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface FindDonorViewProps {
  donors: Donor[];
  initialBloodGroup?: string;
  initialDistrict?: string;
  onOpenSafeContact: (donor: Donor) => void;
  onOpenReport: (targetId: string, targetTitle: string, type: 'donor') => void;
  onOpenRegister: () => void;
}

export const FindDonorView: React.FC<FindDonorViewProps> = ({
  donors,
  initialBloodGroup = 'ALL',
  initialDistrict = 'ALL',
  onOpenSafeContact,
  onOpenReport,
  onOpenRegister,
}) => {
  const { language, t } = useLanguage();

  const [selectedGroup, setSelectedGroup] = useState<string>(initialBloodGroup);
  const [selectedDivision, setSelectedDivision] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict);
  const [selectedUpazila, setSelectedUpazila] = useState<string>('ALL');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    if (initialBloodGroup) {
      setSelectedGroup(initialBloodGroup);
    }
  }, [initialBloodGroup]);

  React.useEffect(() => {
    if (initialDistrict) {
      setSelectedDistrict(initialDistrict);
    }
  }, [initialDistrict]);

  // Available districts based on division selection
  const availableDistricts = useMemo(() => {
    if (selectedDivision === 'ALL') {
      return BANGLADESH_LOCATIONS.flatMap((d) => d.districts);
    }
    const found = BANGLADESH_LOCATIONS.find((d) => d.id === selectedDivision);
    return found ? found.districts : [];
  }, [selectedDivision]);

  // Available upazilas based on district selection
  const availableUpazilas = useMemo(() => {
    if (selectedDistrict === 'ALL') return [];
    const dist = availableDistricts.find(
      (d) => d.nameEn.toLowerCase() === selectedDistrict.toLowerCase()
    );
    return dist ? dist.upazilas : [];
  }, [selectedDistrict, availableDistricts]);

  // Handle Division change
  const handleDivisionChange = (divId: string) => {
    setSelectedDivision(divId);
    setSelectedDistrict('ALL');
    setSelectedUpazila('ALL');
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedGroup('ALL');
    setSelectedDivision('ALL');
    setSelectedDistrict('ALL');
    setSelectedUpazila('ALL');
    setSelectedAvailability('ALL');
    setSearchQuery('');
  };

  // Filter donors
  const filteredDonors = useMemo(() => {
    return donors.filter((d) => {
      if (selectedGroup !== 'ALL' && d.bloodGroup !== selectedGroup) return false;
      if (selectedDivision !== 'ALL' && d.division !== selectedDivision) return false;
      if (
        selectedDistrict !== 'ALL' &&
        (!d.district || d.district.toLowerCase() !== selectedDistrict.toLowerCase())
      )
        return false;
      if (
        selectedUpazila !== 'ALL' &&
        (!d.upazila || d.upazila.toLowerCase() !== selectedUpazila.toLowerCase())
      )
        return false;
      if (selectedAvailability !== 'ALL' && d.availability !== selectedAvailability)
        return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = d.fullName ? d.fullName.toLowerCase().includes(q) : false;
        const matchDist = d.district ? d.district.toLowerCase().includes(q) : false;
        const matchArea = d.area ? d.area.toLowerCase().includes(q) : false;
        const matchGroup = d.bloodGroup ? d.bloodGroup.toLowerCase().includes(q) : false;
        if (!matchName && !matchDist && !matchArea && !matchGroup) return false;
      }
      return true;
    });
  }, [
    donors,
    selectedGroup,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    selectedAvailability,
    searchQuery,
  ]);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'স্মার্ট রক্তদাতা সার্চ ফিল্টার' : 'Smart Donor Search Filter'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('findDonor')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {language === 'bn'
                ? 'রক্তের গ্রুপ, জেলা, থানা ও এলাকা অনুযায়ী তাৎক্ষণিক রক্তদাতা খুঁজুন'
                : 'Search donors instantly by blood group, division, district, upazila, and availability'}
            </p>
          </div>

          <button
            onClick={onOpenRegister}
            className="self-start md:self-auto px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-200 transition flex items-center space-x-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>{t('btnRegisterDonor')}</span>
          </button>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-800">
              <Filter className="w-4 h-4 text-red-600" />
              <span>{language === 'bn' ? 'ফিল্টার অপশন' : 'Search Filters'}</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-500 hover:text-red-600 flex items-center space-x-1 font-semibold transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('filterReset')}</span>
            </button>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Blood Group */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="ALL">{t('allBloodGroups')}</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg.group} value={bg.group}>
                    {bg.group} ({bg.nameBn})
                  </option>
                ))}
              </select>
            </div>

            {/* Division */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'বিভাগ' : 'Division'}
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => handleDivisionChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="ALL">{t('allDivisions')}</option>
                {BANGLADESH_LOCATIONS.map((div) => (
                  <option key={div.id} value={div.id}>
                    {language === 'bn' ? div.nameBn : div.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'জেলা' : 'District'}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedUpazila('ALL');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="ALL">{t('allDistricts')}</option>
                {availableDistricts.map((dst) => (
                  <option key={dst.nameEn} value={dst.nameEn}>
                    {language === 'bn' ? dst.nameBn : dst.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'উপজেলা/থানা' : 'Upazila/Thana'}
              </label>
              <select
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                disabled={selectedDistrict === 'ALL' || availableUpazilas.length === 0}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 cursor-pointer"
              >
                <option value="ALL">{t('allUpazilas')}</option>
                {availableUpazilas.map((u) => (
                  <option key={u.nameEn} value={u.nameEn}>
                    {language === 'bn' ? u.nameBn : u.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'উপলব্ধতা' : 'Availability'}
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="ALL">{language === 'bn' ? 'সকল অবস্থা' : 'All Status'}</option>
                <option value="available">{t('available')}</option>
                <option value="temporarily_unavailable">{t('temporarily_unavailable')}</option>
                <option value="not_available">{t('not_available')}</option>
              </select>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'নাম বা এলাকা খুঁজুন' : 'Keyword Search'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === 'bn' ? 'যেমন: ধানমন্ডি...' : 'e.g. Dhanmondi...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter & Info */}
        <div className="mb-4 flex items-center justify-between text-xs text-slate-600 font-medium">
          <p>
            {language === 'bn' ? 'পাওয়া গেছে:' : 'Found:'}{' '}
            <span className="font-bold text-slate-900">{filteredDonors.length}</span>{' '}
            {language === 'bn' ? 'জন রক্তদাতা' : 'donor(s)'}
          </p>
          <p className="text-slate-400 hidden sm:block">
            {language === 'bn'
              ? 'নিরাপত্তার খাতিরে সঠিক ঠিকানা ও ফোন নম্বর সরাসরি সর্বজনীন নয়'
              : 'Exact address and raw phone number are shielded for safety'}
          </p>
        </div>

        {/* Donor Cards Grid */}
        {filteredDonors.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs max-w-lg mx-auto">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {language === 'bn' ? 'এই ফিল্টারে কোনো রক্তদাতা পাওয়া যায়নি' : 'No donors matched this filter'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {language === 'bn'
                ? 'ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন অথবা একটি নতুন ব্লাড রিকুয়েস্ট পোস্ট করুন।'
                : 'Try adjusting your filters or post a new blood request directly.'}
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                {t('filterReset')}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDonors.map((donor) => {
              const isAvailable = donor.availability === 'available';

              return (
                <div
                  key={donor.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-red-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Top: Avatar, Name, Group Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={donor.avatar}
                          alt={donor.fullName}
                          className="w-14 h-14 rounded-full object-cover border-2 border-rose-200 shadow-xs shrink-0"
                        />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <h3 className="text-base font-bold text-slate-900 leading-snug">
                              {donor.fullName}
                            </h3>
                            {donor.isVerified && (
                              <span
                                title={t('verifiedDonor')}
                                className="text-blue-600 inline-flex items-center"
                              >
                                <ShieldCheck className="w-4 h-4 fill-blue-600 text-white" />
                              </span>
                            )}
                          </div>

                          {/* District and Area */}
                          <div className="flex items-center space-x-1 text-xs text-slate-500 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">
                              {donor.district} {donor.area ? `• ${donor.area}` : ''}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Blood Group Symbol */}
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-red-200 shrink-0">
                        {donor.bloodGroup}
                      </div>
                    </div>

                    {/* Donor Quick Stats */}
                    <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600 border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">
                          {t('lastDonation')}
                        </span>
                        <span className="font-bold text-slate-800">
                          {donor.lastDonationDate || t('neverDonated')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">
                          {t('totalDonationsLabel')}
                        </span>
                        <span className="font-bold text-slate-800">
                          {donor.totalDonations} {t('times')}
                        </span>
                      </div>
                    </div>

                    {/* Bio */}
                    {donor.shortBio && (
                      <p className="mt-3 text-xs text-slate-600 line-clamp-2 italic">
                        &quot;{donor.shortBio}&quot;
                      </p>
                    )}
                  </div>

                  {/* Bottom Actions: Availability & Request */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Status Pill */}
                    <div className="flex items-center space-x-1.5 text-xs font-semibold">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isAvailable
                            ? 'bg-emerald-500 animate-pulse'
                            : donor.availability === 'temporarily_unavailable'
                            ? 'bg-amber-500'
                            : 'bg-slate-400'
                        }`}
                      ></span>
                      <span
                        className={
                          isAvailable
                            ? 'text-emerald-700'
                            : donor.availability === 'temporarily_unavailable'
                            ? 'text-amber-700'
                            : 'text-slate-500'
                        }
                      >
                        {isAvailable
                          ? t('available')
                          : donor.availability === 'temporarily_unavailable'
                          ? t('temporarily_unavailable')
                          : t('not_available')}
                      </span>
                    </div>

                    {/* Buttons: Report & Request */}
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() =>
                          onOpenReport(donor.id, `${donor.fullName} (${donor.bloodGroup})`, 'donor')
                        }
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title={t('report')}
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenSafeContact(donor)}
                        disabled={!isAvailable}
                        className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 cursor-pointer shadow-xs ${
                          isAvailable
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{t('requestBloodBtn')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
