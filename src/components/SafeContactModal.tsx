import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Donor } from '../types';
import { api } from '../services/api';
import {
  ShieldCheck,
  X,
  Phone,
  Hospital,
  User,
  Heart,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface SafeContactModalProps {
  donor: Donor | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const SafeContactModal: React.FC<SafeContactModalProps> = ({
  donor,
  onClose,
  onSuccess,
}) => {
  const { language, t } = useLanguage();

  const [requesterName, setRequesterName] = useState('');
  const [requesterPhone, setRequesterPhone] = useState('');
  const [patientName, setPatientName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!donor) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requesterName.trim() || !requesterPhone.trim() || !hospitalName.trim()) {
      setError(language === 'bn' ? 'সকল প্রয়োজনীয় তথ্য পূরণ করুন।' : 'Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await api.sendContactRequest({
        donorId: donor.id,
        requesterName,
        requesterPhone,
        patientName: patientName || (language === 'bn' ? 'জরুরি রোগী' : 'Emergency Patient'),
        hospitalName,
        bloodGroupNeeded: donor.bloodGroup,
        message,
      });
      setSubmitted(true);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-white" />
            <h3 className="text-base font-bold">
              {language === 'bn' ? 'নিরাপদ রক্তদাতা যোগাযোগের আবেদন' : 'Safe Donor Connection Request'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {language === 'bn' ? 'আবেদন সফলভাবে পাঠানো হয়েছে!' : 'Request Sent Successfully!'}
              </h4>
              <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                {language === 'bn'
                  ? `রক্তদাতা ${donor.fullName}-এর নোটিফিকেশনে আপনার আবেদন পৌঁছেছে। রক্তদাতা গ্রহণ (Accept) করলে সাথে সাথে ফোন নম্বর শেয়ার করা হবে।`
                  : `Your request has been forwarded to ${donor.fullName}. You will be notified once they accept.`}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                {t('close')}
              </button>
            </div>
          ) : (
            <div>
              {/* Donor Summary Card */}
              <div className="flex items-center space-x-3 bg-red-50/60 p-3 rounded-xl border border-red-100 mb-4">
                <img
                  src={donor.avatar}
                  alt={donor.fullName}
                  className="w-12 h-12 rounded-full object-cover border border-red-200"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-slate-900">{donor.fullName}</span>
                    <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-black text-[10px]">
                      {donor.bloodGroup}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    {donor.district} ({donor.area})
                  </p>
                </div>
              </div>

              {/* Security Banner */}
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl mb-4 text-[11px] text-amber-800 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>{t('safeContactNotice')}</p>
              </div>

              {error && (
                <div className="mb-4 p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              {/* Request Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'bn' ? 'যেমন: আহমেদ কবির' : 'e.g. Ahmed Kabir'}
                      value={requesterName}
                      onChange={(e) => setRequesterName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {language === 'bn' ? 'আপনার ফোন নম্বর *' : 'Your Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={requesterPhone}
                      onChange={(e) => setRequesterPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {language === 'bn' ? 'রোগীর নাম' : 'Patient Name'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'bn' ? 'যেমন: সালমা বেগম' : 'e.g. Salma Begum'}
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {language === 'bn' ? 'হাসপাতালের নাম *' : 'Hospital Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'bn' ? 'যেমন: ঢাকা মেডিকেল কলেজ' : 'e.g. DMCH'}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'জরুরি কারণ / বার্তা (ঐচ্ছিক)' : 'Reason / Note (Optional)'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={
                      language === 'bn'
                        ? 'যেমন: আগামীকাল সকাল ১০টায় জরুরি অস্ত্রোপচারের জন্য রক্ত প্রয়োজন।'
                        : 'e.g. Needed for surgery tomorrow morning.'
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end space-x-2">
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
                    className="px-5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-200 transition cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...') : (language === 'bn' ? 'আবেদন পাঠান' : 'Send Request')}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
