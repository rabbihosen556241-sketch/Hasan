import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { safeCopyText } from '../utils/clipboard';
import { Terminal, Copy, Check, X, Smartphone, Monitor, BookOpen } from 'lucide-react';

interface RunGuideModalProps {
  onClose: () => void;
}

export const RunGuideModal: React.FC<RunGuideModalProps> = ({ onClose }) => {
  const { language, t } = useLanguage();
  const { showToast } = useToast();
  const [copiedSection, setCopiedSection] = React.useState<string | null>(null);

  const copyToClipboard = async (text: string, sectionId: string) => {
    const success = await safeCopyText(text);
    if (success) {
      setCopiedSection(sectionId);
      showToast(
        language === 'bn' ? 'কমান্ড কপি করা হয়েছে!' : 'Commands copied to clipboard!',
        'success'
      );
      setTimeout(() => setCopiedSection(null), 2000);
    } else {
      showToast(
        language === 'bn' ? 'কপি করা যায়নি।' : 'Could not copy.',
        'error'
      );
    }
  };

  const pcCommands = `# ১. প্রজেক্ট ফোল্ডারে টার্মিনাল ওপেন করুন
# ২. ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# ৩. লোকাল ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev

# অথবা প্রোডাকশন বিল্ড ও রান করতে:
npm run build
npm start

# ব্রাউজারে প্রবেশ করুন:
# http://localhost:3000`;

  const termuxCommands = `# ১. Termux অ্যাপ ওপেন করে প্যাকেজ আপডেট করুন
pkg update && pkg upgrade -y

# ২. Node.js ও Git ইনস্টল করুন
pkg install nodejs git -y

# ৩. প্রজেক্ট ডিরেক্টরিতে প্রবেশ করুন (অথবা গিট ক্লোন করুন)
# cd roktobondhu

# ৪. প্যাকেজ ইনস্টল করুন
npm install

# ৫. সার্ভার চালু করুন (0.0.0.0 হোস্টে)
npm run dev

# মোবাইলের যেকোনো ব্রাউজারে (Chrome) প্রবেশ করুন:
# http://localhost:3000`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold">
              {language === 'bn'
                ? '💻 Local PC এবং 📱 Android Termux-এ চালানোর পূর্ণ গাইড'
                : 'Run Guide: Local PC & Android Termux'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-xs sm:text-sm text-slate-700">
          {/* Intro */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900">
            <p className="font-semibold">
              {language === 'bn'
                ? '✅ রক্তবন্ধু প্ল্যাটফর্মটি Node.js, Express, React এবং Tailwind CSS দিয়ে এমনভাবে ডিজাইন করা হয়েছে যাতে এটি যেকোনো উইন্ডোজ, ম্যাক, লিনাক্স পিসি এবং অ্যান্ড্রয়েড টারমাক্স (Termux)-এ কোনো বাড়তি কনফিগারেশন ছাড়াই এক ক্লিকে চলতে পারে।'
                : '✅ RoktoBondhu is built with Node.js, Express, React, and Tailwind CSS to run effortlessly on Windows, macOS, Linux, and Android Termux.'}
            </p>
          </div>

          {/* Section 1: PC Guide */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 flex items-center space-x-2 text-sm">
                <Monitor className="w-4 h-4 text-blue-600" />
                <span>{language === 'bn' ? '১. Local PC (Windows / Mac / Linux) নির্দেশনা:' : '1. Local PC Guide (Windows/Mac/Linux)'}</span>
              </h4>
              <button
                onClick={() => copyToClipboard(pcCommands, 'pc')}
                className="flex items-center space-x-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition"
              >
                {copiedSection === 'pc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'pc' ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
              </button>
            </div>
            <pre className="p-3.5 bg-slate-900 text-emerald-400 font-mono rounded-xl text-xs overflow-x-auto leading-relaxed">
              {pcCommands}
            </pre>
          </div>

          {/* Section 2: Android Termux Guide */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 flex items-center space-x-2 text-sm">
                <Smartphone className="w-4 h-4 text-purple-600" />
                <span>{language === 'bn' ? '২. Android Termux নির্দেশনা (স্মার্টফোনে চালানোর পদ্ধতি):' : '2. Android Termux Mobile Guide'}</span>
              </h4>
              <button
                onClick={() => copyToClipboard(termuxCommands, 'termux')}
                className="flex items-center space-x-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition"
              >
                {copiedSection === 'termux' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'termux' ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
              </button>
            </div>
            <pre className="p-3.5 bg-slate-900 text-emerald-400 font-mono rounded-xl text-xs overflow-x-auto leading-relaxed">
              {termuxCommands}
            </pre>
            <p className="text-[11px] text-slate-500 italic">
              {language === 'bn'
                ? 'টিপস: অ্যান্ড্রয়েড ফোনে Termux চালানোর সময় পোর্ট 3000 ব্যবহার করা হয়েছে যাতে Chrome/Firefox দিয়ে সহজেই অ্যাপের পূর্ণ ফিচার ব্যবহার করা যায়।'
                : 'Tip: Runs on port 3000, access directly via your mobile Chrome/Firefox browser.'}
            </p>
          </div>

          {/* Section 3: Architecture & Tech Stack */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900">
              {language === 'bn' ? 'প্রজেক্ট আর্কিটেকচার ও ডেটাবেজ নিরাপত্তা:' : 'Architecture & Security:'}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li><strong>Frontend:</strong> React 19 + Tailwind CSS + Lucide Icons + Motion</li>
              <li><strong>Backend:</strong> Node.js + Express (server.ts)</li>
              <li><strong>Safe Contact:</strong> রোগীর আবেদনের পর রক্তদাতার সম্মতিক্রমে নম্বর শেয়ার ব্যবস্থা</li>
              <li><strong>Privacy:</strong> রক্তদাতার বাসার ব্যক্তিগত সঠিক ঠিকানা সর্বজনীনভাবে অপ্রকাশিত</li>
              <li><strong>Admin Hub:</strong> রিয়েল-টাইম অডিট লগ, রিপোর্ট মডারেশন ও রক্তদাতা ভেরিফিকেশন ব্যাজ</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
