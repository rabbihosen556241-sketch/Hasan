import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Droplet, Heart, Phone, ShieldAlert, Terminal, Lock } from 'lucide-react';

interface FooterProps {
  onOpenRunGuide: () => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRunGuide, setActiveTab }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Humanitarian Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white">
                <Droplet className="w-5 h-5 fill-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                {t('brandName')} <span className="text-red-500">BD</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {language === 'bn'
                ? 'রক্তবন্ধু সম্পূর্ণ অলাভজনক ও মানবিক সামাজিক প্ল্যাটফর্ম। বাংলাদেশের প্রতিটি নাগরিকের জরুরি প্রয়োজনে রক্তদাতা খুঁজে দেওয়া এবং স্বেচ্ছায় রক্তদানে মানুষকে উৎসাহিত করাই আমাদের একমাত্র ব্রত।'
                : 'RoktoBondhu is a strictly non-commercial voluntary platform connecting blood donors and patients across Bangladesh to preserve human life.'}
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>নিরাপদ ও ব্যক্তিগত তথ্য সুরক্ষিত</span>
              </span>
              <span>•</span>
              <button
                onClick={onOpenRunGuide}
                className="text-red-400 hover:text-white flex items-center space-x-1 cursor-pointer transition"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{t('runInstructionsBtn')}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              {language === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('find-donor')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t('findDonor')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('emergency')}
                  className="hover:text-white transition cursor-pointer text-red-400"
                >
                  {t('emergencyBlood')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('guide')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t('bloodGuide')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('compatibility')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t('compatibility')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('stories')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t('stories')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Contacts in Bangladesh */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              {language === 'bn' ? 'জরুরি সেবা হটলাইন' : 'Emergency Hotlines'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>জাতীয় জরুরি সেবা: <strong>৯৯৯ (999)</strong></span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>রেড ক্রিসেন্ট ব্লাড ব্যাংক: <strong>০২-৯৩৫৩১৯৬</strong></span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>কোয়ান্টাম ব্লাড ব্যাংক: <strong>০১৭৪০৮৮২২৫৫</strong></span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>সন্ধানী ব্লাড ব্যাংক (DMCH): <strong>০১৭২১১৫১১১৫</strong></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical Rules & Medical Warning Box */}
        <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-xs text-slate-400 space-y-1.5 mb-8">
          <p className="font-bold text-slate-200 flex items-center space-x-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>
              {language === 'bn' ? 'প্ল্যাটফর্মের গুরুত্বপূর্ণ নীতিমালা ও সতর্কতা:' : 'Platform Guidelines & Disclaimer:'}
            </span>
          </p>
          <p>
            {language === 'bn'
              ? '১. রক্তবন্ধু প্ল্যাটফর্মে রক্ত কেনাবেচা সম্পূর্ণ নিষিদ্ধ। ২. রক্তদাতার সঠিক আবাসিক ঠিকানা ও সংবেদনশীল তথ্য গোপন রাখা হয়। ৩. রক্ত দেওয়ার পূর্বে অবশ্যই হাসপাতালের অনুমোদিত চিকিৎসক দ্বারা বাধ্যতামূলক ক্রস-ম্যাচিং সম্পন্ন করতে হবে।'
              : '1. Buying/selling blood is strictly prohibited. 2. Exact residential addresses and sensitive data are shielded. 3. Clinical cross-matching by certified medical practitioners is strictly required prior to transfusion.'}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© ২০২৬ রক্তবন্ধু বাংলাদেশ। মানবিক ও নিঃস্বার্থ সেবায় নিবেদিত।</p>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for humanity across Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
