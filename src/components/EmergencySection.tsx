import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { safeCopyText } from '../utils/clipboard';
import { BloodRequest } from '../types';
import {
  AlertTriangle,
  Hospital,
  MapPin,
  Clock,
  Phone,
  Droplet,
  Share2,
  CheckCircle,
} from 'lucide-react';

interface EmergencySectionProps {
  emergencyRequests: BloodRequest[];
  onOpenCreateRequest: () => void;
  onSelectRequest?: (req: BloodRequest) => void;
}

export const EmergencySection: React.FC<EmergencySectionProps> = ({
  emergencyRequests,
  onOpenCreateRequest,
  onSelectRequest,
}) => {
  const { language, t } = useLanguage();
  const { showToast } = useToast();

  const handleShare = async (req: BloodRequest) => {
    const text = `🚨 জরুরি রক্ত প্রয়োজন! রক্তের গ্রুপ: ${req.bloodGroup}, হাসপাতাল: ${req.hospitalName}, জেলা: ${req.district}, যোগাযোগ: ${req.contactNumber}। রক্তবন্ধু প্ল্যাটফর্মে বিস্তারিত দেখুন।`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `জরুরি রক্ত প্রয়োজন: ${req.bloodGroup}`,
          text: text,
          url: window.location.href,
        });
        return;
      } catch {
        // Fall back to copy
      }
    }

    const success = await safeCopyText(text);
    if (success) {
      showToast(
        language === 'bn'
          ? 'তথ্যটি ক্লিপবোর্ডে কপি করা হয়েছে! ফেসবুকে বা হোয়াটসঅ্যাপে শেয়ার করুন।'
          : 'Details copied to clipboard! Ready to share on social media.',
        'success'
      );
    } else {
      showToast(
        language === 'bn' ? 'কপি করতে সমস্যা হয়েছে।' : 'Could not copy to clipboard.',
        'error'
      );
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-red-500/10 via-rose-50 to-white border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold mb-2 shadow-xs animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'জীবন বাঁচানোর জরুরি ডাক' : 'Urgent Emergency Call'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
              <span>{t('emergencyHeadline')}</span>
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {t('emergencySubhead')}
            </p>
          </div>

          <button
            onClick={onOpenCreateRequest}
            className="self-start md:self-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md shadow-red-200 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Droplet className="w-4 h-4 fill-white" />
            <span>{t('btnCreateRequest')}</span>
          </button>
        </div>

        {/* Emergency Cards Grid */}
        {emergencyRequests.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-xs max-w-lg mx-auto">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-800">
              {language === 'bn' ? 'এই মুহূর্তে কোনো জরুরি রক্তের আবেদন নেই' : 'No emergency requests pending at the moment'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'bn' ? 'সকল রোগী রক্তদাতার সহযোগিতা পেয়েছেন।' : 'All patients have connected with donors.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {emergencyRequests.map((req) => (
              <div
                key={req.id}
                className="relative bg-white rounded-2xl p-5 border-2 border-red-500 shadow-lg shadow-red-100/60 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                {/* Top Pulsing Emergency Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white flex flex-col items-center justify-center font-black shadow-md shadow-red-200 shrink-0">
                      <span className="text-xl leading-none">{req.bloodGroup}</span>
                      <span className="text-[9px] font-medium opacity-90">{req.numberOfBags} {language === 'bn' ? 'ব্যাগ' : 'Bag(s)'}</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] font-extrabold uppercase tracking-wide">
                        {t('urgentBadge')}
                      </span>
                      <h3 className="text-base font-black text-slate-900 mt-0.5 leading-snug">
                        {req.patientName}
                      </h3>
                      <p className="text-xs text-red-600 font-semibold line-clamp-1">
                        {req.reasonForBlood || (language === 'bn' ? 'জরুরি অস্ত্রোপচার' : 'Emergency Surgery')}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleShare(req)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title={t('share')}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details List */}
                <div className="mt-4 space-y-2 text-xs text-slate-600 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-start space-x-2">
                    <Hospital className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">{req.hospitalName}</span>
                      {req.hospitalLocation && (
                        <p className="text-[11px] text-slate-500">{req.hospitalLocation}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-700">
                      {req.district} {req.upazila ? `(${req.upazila})` : ''}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="font-bold text-amber-700">
                      {language === 'bn' ? 'সময়:' : 'Time:'} {req.requiredTime} ({req.requiredDate})
                    </span>
                  </div>

                  {req.additionalInfo && (
                    <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/50">
                      &quot;{req.additionalInfo}&quot;
                    </p>
                  )}
                </div>

                {/* Bottom Call & Connect Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-xs">
                    <p className="text-slate-400 text-[10px] uppercase font-bold">{t('contactPerson')}</p>
                    <p className="font-bold text-slate-800 truncate max-w-[140px]">{req.contactPerson}</p>
                  </div>

                  <a
                    href={`tel:${req.contactNumber}`}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-200 flex items-center space-x-1.5 cursor-pointer shrink-0 transition"
                  >
                    <Phone className="w-3.5 h-3.5 fill-white" />
                    <span>{language === 'bn' ? 'কল দিন' : 'Call Now'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
