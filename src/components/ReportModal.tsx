import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ReportReason } from '../types';
import { api } from '../services/api';
import { Flag, X, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface ReportModalProps {
  targetId: string;
  targetTitle: string;
  reportedType: 'donor' | 'request' | 'user';
  onClose: () => void;
  onSuccess: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  targetId,
  targetTitle,
  reportedType,
  onClose,
  onSuccess,
}) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [reason, setReason] = useState<ReportReason>('fake_donor');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState(user?.name || '');
  const [reporterPhone, setReporterPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError(language === 'bn' ? 'অভিযোগের বিবরণ দিন।' : 'Please describe the issue.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await api.submitReport({
        reportedType,
        targetId,
        targetTitle,
        reporterName: reporterName || 'Anonymous',
        reporterPhone,
        reason,
        description,
      });
      setSubmitted(true);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertOctagon className="w-5 h-5" />
            <h3 className="text-base font-bold">
              {language === 'bn' ? 'রিপোর্ট বা অভিযোগ দাখিল' : 'Submit Safety Report'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'আপনার রিপোর্ট গ্রহণ করা হয়েছে' : 'Report Received'}
              </h4>
              <p className="text-xs text-slate-600 mt-2">
                {language === 'bn'
                  ? 'অ্যাডমিন টিম দ্রুত বিষয়টি তদন্ত করে যথাযথ ব্যবস্থা গ্রহণ করবে।'
                  : 'Our moderation team will review this shortly to protect community safety.'}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-red-600 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                {t('close')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  {language === 'bn' ? 'অভিযোগের লক্ষ্যবস্তু' : 'Target Entity'}
                </span>
                <span className="font-bold text-slate-900">{targetTitle}</span>
              </div>

              {error && (
                <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'অভিযোগের কারণ *' : 'Reason for Report *'}
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as ReportReason)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  <option value="fake_donor">
                    {language === 'bn' ? 'ভুয়া বা প্রতারক রক্তদাতা (Fake Donor)' : 'Fake Donor'}
                  </option>
                  <option value="fake_request">
                    {language === 'bn' ? 'ভুয়া রক্তের অনুরোধ (Fake Request)' : 'Fake Request'}
                  </option>
                  <option value="scam">
                    {language === 'bn' ? 'টাকা বা বিকাশ স্ক্যামের চেষ্টা (Scam / Fraud)' : 'Financial Scam / Fraud'}
                  </option>
                  <option value="harassment">
                    {language === 'bn' ? 'হয়রানি বা অশ্লীল আচরণ (Harassment)' : 'Harassment'}
                  </option>
                  <option value="wrong_info">
                    {language === 'bn' ? 'ভুল তথ্য প্রদান (Wrong Information)' : 'Wrong Information'}
                  </option>
                  <option value="abuse">
                    {language === 'bn' ? 'অন্যান্য অপব্যবহার (Abuse)' : 'Abuse'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'বিস্তারিত বিবরণ *' : 'Detailed Description *'}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={
                    language === 'bn'
                      ? 'ঘটনাটি সংক্ষেপে ব্যাখ্যা করুন যাতে অ্যাডমিন সঠিক পদক্ষেপ নিতে পারেন।'
                      : 'Briefly explain what happened so administrators can take action.'
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer disabled:opacity-50"
                >
                  {loading
                    ? (language === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...')
                    : (language === 'bn' ? 'রিপোর্ট দাখিল করুন' : 'Submit Report')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
