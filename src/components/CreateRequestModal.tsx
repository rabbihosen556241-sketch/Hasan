import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { BLOOD_GROUPS, BloodGroup } from '../data/bloodGroups';
import { BANGLADESH_LOCATIONS } from '../data/bangladeshLocations';
import { BloodRequest, RequestUrgency } from '../types';
import { api } from '../services/api';
import {
  Droplet,
  X,
  AlertTriangle,
  Hospital,
  MapPin,
  Calendar,
  Clock,
  Phone,
  User,
  CheckCircle2,
} from 'lucide-react';

interface CreateRequestModalProps {
  onClose: () => void;
  onSuccess: (newReq: BloodRequest) => void;
}

export const CreateRequestModal: React.FC<CreateRequestModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalLocation, setHospitalLocation] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [upazila, setUpazila] = useState('');
  const [requiredDate, setRequiredDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [requiredTime, setRequiredTime] = useState('জরুরি প্রয়োজন');
  const [numberOfBags, setNumberOfBags] = useState<number>(1);
  const [urgency, setUrgency] = useState<RequestUrgency>('emergency');
  const [reasonForBlood, setReasonForBlood] = useState('');
  const [contactPerson, setContactPerson] = useState(user?.name || '');
  const [contactNumber, setContactNumber] = useState(user?.phone || '');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const allDistricts = BANGLADESH_LOCATIONS.flatMap((d) => d.districts);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !hospitalName.trim() || !contactNumber.trim()) {
      setError(language === 'bn' ? 'সকল আবশ্যক তথ্য পূরণ করুন।' : 'Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const created = await api.createRequest({
        requesterId: user?.id,
        patientName,
        bloodGroup,
        hospitalName,
        hospitalLocation,
        district,
        upazila,
        requiredDate,
        requiredTime,
        numberOfBags,
        urgency,
        reasonForBlood,
        contactPerson,
        contactNumber,
        additionalInfo,
      });

      onSuccess(created);
    } catch (err: any) {
      setError(err.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header */}
        <div
          className={`px-6 py-4 text-white flex items-center justify-between ${
            urgency === 'emergency'
              ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700'
              : 'bg-gradient-to-r from-slate-800 to-slate-900'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Droplet className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                {language === 'bn' ? 'রক্তের জন্য আবেদন তৈরি করুন' : 'Post Blood Request'}
              </h3>
              <p className="text-[11px] text-white/80">
                {language === 'bn'
                  ? 'আপনার অনুরোধটি সংশ্লিষ্ট জেলার রক্তদাতাদের নোটিফিকেশনে পৌঁছে যাবে'
                  : 'Your request will be notified to matching donors in the district'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {/* Urgency Selector */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setUrgency('emergency')}
              className={`py-2 text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                urgency === 'emergency'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? '🚨 জরুরি (Emergency)' : '🚨 Urgent Emergency'}</span>
            </button>
            <button
              type="button"
              onClick={() => setUrgency('regular')}
              className={`py-2 text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                urgency === 'regular'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? '📅 নিয়মিত / অপারেশনের জন্য' : '📅 Regular Scheduled'}</span>
            </button>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'রোগীর নাম ও বয়স *' : 'Patient Name & Age *'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'bn' ? 'যেমন: সালমা বেগম (৪৫ বছর)' : 'e.g. Salma Begum (45 yrs)'}
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'রক্তের গ্রুপ *' : 'Blood Group *'}
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-red-600 focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg.group} value={bg.group}>
                    {bg.group} ({bg.nameBn})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hospital & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'হাসপাতালের নাম *' : 'Hospital Name *'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'bn' ? 'যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল' : 'e.g. Dhaka Medical College Hospital'}
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'হাসপাতালের ওয়ার্ড / কেবিন / ফ্লোর' : 'Ward / Cabin / Floor'}
              </label>
              <input
                type="text"
                placeholder={language === 'bn' ? 'যেমন: গাইনি ওয়ার্ড, ৩য় তলা' : 'e.g. Gynae Ward, 3rd Floor'}
                value={hospitalLocation}
                onChange={(e) => setHospitalLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'জেলা *' : 'District *'}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                {allDistricts.map((dst) => (
                  <option key={dst.nameEn} value={dst.nameEn}>
                    {language === 'bn' ? dst.nameBn : dst.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'উপজেলা / এলাকা' : 'Upazila / Area'}
              </label>
              <input
                type="text"
                placeholder={language === 'bn' ? 'যেমন: শাহবাগ' : 'e.g. Shahbagh'}
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Time & Bags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'প্রয়োজনের তারিখ *' : 'Required Date *'}
              </label>
              <input
                type="date"
                required
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'প্রয়োজনের নির্দিষ্ট সময় *' : 'Required Time *'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'bn' ? 'যেমন: সকাল ১০:০০ টা' : 'e.g. 10:00 AM'}
                value={requiredTime}
                onChange={(e) => setRequiredTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'প্রয়োজনীয় রক্ত (ব্যাগ) *' : 'Bags Needed *'}
              </label>
              <input
                type="number"
                min={1}
                max={10}
                required
                value={numberOfBags}
                onChange={(e) => setNumberOfBags(parseInt(e.target.value, 10) || 1)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'যোগাযোগের ব্যক্তির নাম ও সম্পর্ক *' : 'Contact Person & Relation *'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'bn' ? 'যেমন: আহমেদ জুবায়ের (রোগীর ভাই)' : 'e.g. Ahmed Jubayer (Brother)'}
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'সরাসরি ফোন নম্বর *' : 'Contact Phone Number *'}
              </label>
              <input
                type="tel"
                required
                placeholder="01XXXXXXXXX"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Reason & Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {language === 'bn' ? 'রক্তের প্রয়োজন কেন? (অস্ত্রোপচার / থ্যালাসেমিয়া / দুর্ঘটনা)' : 'Reason for Blood (Surgery, Thalassemia, Accident)'}
            </label>
            <input
              type="text"
              placeholder={language === 'bn' ? 'যেমন: ওপেন হার্ট সার্জারি ও রক্তক্ষরণ' : 'e.g. Open heart surgery'}
              value={reasonForBlood}
              onChange={(e) => setReasonForBlood(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {language === 'bn' ? 'অতিরিক্ত তথ্য (ঐচ্ছিক)' : 'Additional Info (Optional)'}
            </label>
            <textarea
              rows={2}
              placeholder={
                language === 'bn'
                  ? 'যেমন: ক্রস-ম্যাচিংয়ের জন্য ব্লাড ব্যাংকে ব্যবস্থা করা আছে। রক্তদাতার যাতায়াত খরচ দেওয়া হবে।'
                  : 'e.g. Cross-matching ready at blood bank. Transport support will be provided.'
              }
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          {/* Submit buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2.5 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer disabled:opacity-50 flex items-center space-x-1.5 ${
                urgency === 'emergency'
                  ? 'bg-red-600 hover:bg-red-700 shadow-red-200'
                  : 'bg-slate-800 hover:bg-slate-900 shadow-slate-200'
              }`}
            >
              <Droplet className="w-4 h-4 fill-white" />
              <span>
                {loading
                  ? (language === 'bn' ? 'অনুরোধ তৈরি হচ্ছে...' : 'Submitting...')
                  : (language === 'bn' ? 'অনুরোধ পোস্ট করুন' : 'Post Blood Request')}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
