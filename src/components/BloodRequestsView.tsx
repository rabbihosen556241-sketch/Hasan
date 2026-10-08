import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BloodRequest, RequestUrgency, RequestStatus } from '../types';
import { BLOOD_GROUPS, BloodGroup } from '../data/bloodGroups';
import { BANGLADESH_LOCATIONS } from '../data/bangladeshLocations';
import {
  Droplet,
  Search,
  Filter,
  Hospital,
  MapPin,
  Clock,
  Phone,
  AlertTriangle,
  CheckCircle,
  Plus,
  Share2,
} from 'lucide-react';

interface BloodRequestsViewProps {
  requests: BloodRequest[];
  onOpenCreateRequest: () => void;
  onUpdateStatus?: (id: string, status: RequestStatus) => void;
}

export const BloodRequestsView: React.FC<BloodRequestsViewProps> = ({
  requests,
  onOpenCreateRequest,
  onUpdateStatus,
}) => {
  const { language, t } = useLanguage();

  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('active');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allDistricts = BANGLADESH_LOCATIONS.flatMap((d) => d.districts);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (selectedGroup !== 'ALL' && r.bloodGroup !== selectedGroup) return false;
      if (
        selectedDistrict !== 'ALL' &&
        (!r.district || r.district.toLowerCase() !== selectedDistrict.toLowerCase())
      )
        return false;
      if (selectedUrgency !== 'ALL' && r.urgency !== selectedUrgency) return false;
      if (selectedStatus !== 'ALL' && r.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchPatient = r.patientName ? r.patientName.toLowerCase().includes(q) : false;
        const matchHospital = r.hospitalName ? r.hospitalName.toLowerCase().includes(q) : false;
        const matchDistrict = r.district ? r.district.toLowerCase().includes(q) : false;
        if (!matchPatient && !matchHospital && !matchDistrict) return false;
      }
      return true;
    });
  }, [requests, selectedGroup, selectedDistrict, selectedUrgency, selectedStatus, searchQuery]);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-2">
              <Droplet className="w-3.5 h-3.5 fill-red-600 text-red-600" />
              <span>{language === 'bn' ? 'সরাসরি রক্তের আবেদনসমূহ' : 'Live Blood Requests'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('bloodRequests')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {language === 'bn'
                ? 'জরুরি ও পূর্বনির্ধারিত অপারেশনের জন্য রক্তপ্রার্থীদের বিস্তারিত তালিকা'
                : 'Verified list of patients in urgent need of blood across Bangladesh hospitals'}
            </p>
          </div>

          <button
            onClick={onOpenCreateRequest}
            className="self-start md:self-auto px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-200 transition flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('btnCreateRequest')}</span>
          </button>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'জেলা' : 'District'}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="ALL">{t('allDistricts')}</option>
                {allDistricts.map((dst) => (
                  <option key={dst.nameEn} value={dst.nameEn}>
                    {language === 'bn' ? dst.nameBn : dst.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'জরুরিতা (Urgency)' : 'Urgency'}
              </label>
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="ALL">{language === 'bn' ? 'সকল আবেদন' : 'All Types'}</option>
                <option value="emergency">{language === 'bn' ? '🚨 জরুরি' : '🚨 Emergency'}</option>
                <option value="regular">{language === 'bn' ? '📅 নিয়মিত' : '📅 Regular'}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'স্ট্যাটাস (Status)' : 'Status'}
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="active">{language === 'bn' ? 'সক্রিয় (Active)' : 'Active'}</option>
                <option value="completed">{language === 'bn' ? 'সম্পন্ন (Completed)' : 'Completed'}</option>
                <option value="ALL">{language === 'bn' ? 'সকল স্ট্যাটাস' : 'All Statuses'}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'হাসপাতাল বা রোগীর নাম' : 'Search Patient/Hospital'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === 'bn' ? 'যেমন: ঢাকা মেডিকেল...' : 'e.g. DMCH...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Requests List Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">
              {language === 'bn' ? 'এই ফিল্টারে কোনো রক্তের অনুরোধ নেই' : 'No requests matched this criteria'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'bn' ? 'নতুন কোনো রক্তের প্রয়োজন হলে রিকুয়েস্ট পোস্ট করুন।' : 'Post a new request if someone needs blood.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((req) => {
              const isUrgent = req.urgency === 'emergency';

              return (
                <div
                  key={req.id}
                  className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition flex flex-col justify-between ${
                    isUrgent ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                  }`}
                >
                  <div>
                    {/* Header: Blood Group, Patient Name, Urgency */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-13 h-13 rounded-2xl text-white font-black text-lg flex flex-col items-center justify-center shrink-0 shadow-sm ${
                            isUrgent
                              ? 'bg-gradient-to-tr from-red-600 to-rose-600'
                              : 'bg-slate-800'
                          }`}
                        >
                          <span>{req.bloodGroup}</span>
                          <span className="text-[9px] font-normal opacity-90">
                            {req.numberOfBags} {language === 'bn' ? 'ব্যাগ' : 'bag'}
                          </span>
                        </div>

                        <div>
                          {isUrgent ? (
                            <span className="inline-block px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] font-extrabold uppercase">
                              {t('urgentBadge')}
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                              {language === 'bn' ? 'নিয়মিত আবেদন' : 'Regular Need'}
                            </span>
                          )}
                          <h3 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                            {req.patientName}
                          </h3>
                        </div>
                      </div>

                      {req.status === 'completed' && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                          {language === 'bn' ? 'সম্পন্ন' : 'Completed'}
                        </span>
                      )}
                    </div>

                    {/* Details Box */}
                    <div className="mt-4 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-start space-x-2">
                        <Hospital className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800">{req.hospitalName}</span>
                          {req.hospitalLocation && (
                            <p className="text-[11px] text-slate-500">{req.hospitalLocation}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{req.district} {req.upazila ? `(${req.upazila})` : ''}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="font-bold text-slate-700">
                          {req.requiredTime} ({req.requiredDate})
                        </span>
                      </div>

                      {req.reasonForBlood && (
                        <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/50">
                          <strong>{t('patientReason')}:</strong> {req.reasonForBlood}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Call Button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="text-xs">
                      <p className="text-slate-400 text-[10px] uppercase font-bold">{t('contactPerson')}</p>
                      <p className="font-bold text-slate-800 truncate max-w-[130px]">{req.contactPerson}</p>
                    </div>

                    <a
                      href={`tel:${req.contactNumber}`}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer transition shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5 fill-white" />
                      <span>{language === 'bn' ? 'কল দিন' : 'Call'}</span>
                    </a>
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
