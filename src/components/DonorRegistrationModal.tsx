import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { BLOOD_GROUPS, BloodGroup } from '../data/bloodGroups';
import { BANGLADESH_LOCATIONS } from '../data/bangladeshLocations';
import { Donor, AvailabilityStatus, ContactMethod } from '../types';
import { api } from '../services/api';
import {
  Heart,
  X,
  ShieldCheck,
  User,
  MapPin,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface DonorRegistrationModalProps {
  onClose: () => void;
  onSuccess: (newDonor: Donor) => void;
}

export const DonorRegistrationModal: React.FC<DonorRegistrationModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const { language, t } = useLanguage();
  const { user, setUser } = useAuth();

  const [fullName, setFullName] = useState(user?.name || '');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [age, setAge] = useState<number>(24);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [division, setDivision] = useState<string>('dhaka');
  const [district, setDistrict] = useState<string>('Dhaka');
  const [upazila, setUpazila] = useState<string>('Dhanmondi');
  const [area, setArea] = useState<string>('');
  const [lastDonationDate, setLastDonationDate] = useState<string>('');
  const [availability, setAvailability] = useState<AvailabilityStatus>('available');
  const [preferredContact, setPreferredContact] = useState<ContactMethod>('call');
  const [shortBio, setShortBio] = useState<string>('');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Available districts for the selected division
  const currentDistricts = useMemo(() => {
    const divObj = BANGLADESH_LOCATIONS.find((d) => d.id === division);
    return divObj ? divObj.districts : [];
  }, [division]);

  // Available upazilas for the selected district
  const currentUpazilas = useMemo(() => {
    const distObj = currentDistricts.find(
      (d) => d.nameEn.toLowerCase() === district.toLowerCase()
    );
    return distObj ? distObj.upazilas : [];
  }, [district, currentDistricts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !district) {
      setError(language === 'bn' ? 'সকল আবশ্যক ঘর পূরণ করুন।' : 'Please fill all required fields.');
      return;
    }
    if (!agreedTerms) {
      setError(
        language === 'bn'
          ? 'নিবন্ধনের পূর্বে শর্তাবলী ও গোপনীয়তা নীতিতে সম্মতি প্রদান আবশ্যক।'
          : 'You must agree to the Terms & Privacy Policy to register.'
      );
      return;
    }

    try {
      setLoading(true);
      setError('');
      const created = await api.registerDonor({
        userId: user?.id,
        fullName,
        bloodGroup,
        age,
        gender,
        phone,
        email,
        division,
        district,
        upazila,
        area: area || upazila,
        lastDonationDate,
        availability,
        preferredContact,
        shortBio,
        avatar:
          gender === 'female'
            ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      });

      if (user) {
        setUser({
          ...user,
          role: 'donor',
          donorId: created.id,
        });
      }

      onSuccess(created);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                {language === 'bn' ? 'স্বেচ্ছাসেবী রক্তদাতা নিবন্ধন' : 'Register as Volunteer Blood Donor'}
              </h3>
              <p className="text-[11px] text-white/80">
                {language === 'bn' ? 'মানবতার সেবায় আপনার একটি সিদ্ধান্ত বাঁচাবে একটি প্রাণ' : 'Your voluntary step can save a precious human life'}
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

          {/* Privacy Note */}
          <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl flex items-start space-x-2 text-xs text-rose-800">
            <Lock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p>
              {language === 'bn'
                ? 'আপনার ফোন নম্বর ও পূর্ণ ব্যক্তিগত ঠিকানা উন্মুক্ত রাখা হবে না। কেবলমাত্র আপনার সম্মতিতেই জরুরি প্রয়োজনে যোগাযোগ করা যাবে।'
                : 'Your phone number and exact residence will remain shielded. Contact requests will only reach you through safe in-app channels.'}
            </p>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'পূর্ণ নাম *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'bn' ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer"
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg.group} value={bg.group}>
                    {bg.group} - {bg.nameBn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'বয়স (বছর) *' : 'Age (Years) *'}
              </label>
              <input
                type="number"
                min={18}
                max={65}
                required
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10) || 18)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'লিঙ্গ' : 'Gender'}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer"
              >
                <option value="male">{language === 'bn' ? 'পুরুষ' : 'Male'}</option>
                <option value="female">{language === 'bn' ? 'নারী' : 'Female'}</option>
                <option value="other">{language === 'bn' ? 'অন্যান্য' : 'Other'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
              </label>
              <input
                type="tel"
                required
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Location Hierarchy: Division -> District -> Upazila -> Area */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>{language === 'bn' ? 'রক্তদানের সম্ভাব্য এলাকা' : 'Location Hierarchy'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {language === 'bn' ? 'বিভাগ *' : 'Division *'}
                </label>
                <select
                  value={division}
                  onChange={(e) => {
                    const newDiv = e.target.value;
                    setDivision(newDiv);
                    const divObj = BANGLADESH_LOCATIONS.find((d) => d.id === newDiv);
                    if (divObj && divObj.districts.length > 0) {
                      setDistrict(divObj.districts[0].nameEn);
                      if (divObj.districts[0].upazilas.length > 0) {
                        setUpazila(divObj.districts[0].upazilas[0].nameEn);
                      }
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  {BANGLADESH_LOCATIONS.map((div) => (
                    <option key={div.id} value={div.id}>
                      {language === 'bn' ? div.nameBn : div.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {language === 'bn' ? 'জেলা *' : 'District *'}
                </label>
                <select
                  value={district}
                  onChange={(e) => {
                    const newDist = e.target.value;
                    setDistrict(newDist);
                    const distObj = currentDistricts.find(
                      (d) => d.nameEn.toLowerCase() === newDist.toLowerCase()
                    );
                    if (distObj && distObj.upazilas.length > 0) {
                      setUpazila(distObj.upazilas[0].nameEn);
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  {currentDistricts.map((dst) => (
                    <option key={dst.nameEn} value={dst.nameEn}>
                      {language === 'bn' ? dst.nameBn : dst.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {language === 'bn' ? 'উপজেলা/থানা' : 'Upazila/Thana'}
                </label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  {currentUpazilas.map((u) => (
                    <option key={u.nameEn} value={u.nameEn}>
                      {language === 'bn' ? u.nameBn : u.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'সাধারণ এলাকা বা ল্যান্ডমার্ক (বাসার সঠিক ঠিকানা নয়)' : 'General Area or Landmark (Not Exact Address)'}
              </label>
              <input
                type="text"
                placeholder={language === 'bn' ? 'যেমন: ধানমন্ডি ২৭ নম্বর / মিরপুর ১০' : 'e.g. Mirpur 10 / Dhanmondi 27'}
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Donation History & Preferences */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'সর্বশেষ রক্তদানের তারিখ' : 'Last Donation Date'}
              </label>
              <input
                type="date"
                value={lastDonationDate}
                onChange={(e) => setLastDonationDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'উপলব্ধতা (Availability) *' : 'Availability Status *'}
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as AvailabilityStatus)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="available">{t('available')}</option>
                <option value="temporarily_unavailable">{t('temporarily_unavailable')}</option>
                <option value="not_available">{t('not_available')}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {language === 'bn' ? 'পছন্দের যোগাযোগ মাধ্যম' : 'Preferred Contact'}
              </label>
              <select
                value={preferredContact}
                onChange={(e) => setPreferredContact(e.target.value as ContactMethod)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="call">{language === 'bn' ? 'সরাসরি ফোন কল' : 'Direct Call'}</option>
                <option value="whatsapp">{language === 'bn' ? 'হোয়াটসঅ্যাপ (WhatsApp)' : 'WhatsApp'}</option>
                <option value="sms">{language === 'bn' ? 'এসএমএস (SMS)' : 'SMS Message'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              {language === 'bn' ? 'সংক্ষিপ্ত বায়ো / রক্তদান নিয়ে অনুভূতি' : 'Short Bio / Message'}
            </label>
            <textarea
              rows={2}
              placeholder={
                language === 'bn'
                  ? 'যেমন: যেকোনো জরুরি ট্রমা বা প্রসূতি অপারেশনের প্রয়োজনে রক্ত দিতে প্রস্তুত।'
                  : 'e.g. Always ready to donate for emergency trauma and delivery cases.'
              }
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          {/* Terms & Privacy checkbox */}
          <div className="pt-2 flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms-check"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
            />
            <label htmlFor="terms-check" className="text-xs text-slate-600 cursor-pointer">
              {language === 'bn' ? (
                <span>
                  আমি স্বীকার করছি যে আমি স্বেচ্ছায় বিনামূল্যে রক্তদানে আগ্রহী এবং আমি রক্তবন্ধুর{' '}
                  <span className="text-red-600 font-bold underline">শর্তাবলী</span> ও{' '}
                  <span className="text-red-600 font-bold underline">গোপনীয়তা নীতি</span> মেনে চলব।
                </span>
              ) : (
                <span>
                  I declare that I voluntarily wish to donate blood for free and agree to the platform{' '}
                  <span className="text-red-600 font-bold underline">Terms</span> and{' '}
                  <span className="text-red-600 font-bold underline">Privacy Policy</span>.
                </span>
              )}
            </label>
          </div>

          {/* Submit buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
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
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-200 transition cursor-pointer disabled:opacity-50 flex items-center space-x-1.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>
                {loading
                  ? (language === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...')
                  : (language === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Complete Registration')}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
