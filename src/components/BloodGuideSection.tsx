import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MEDICAL_DISCLAIMER_BN, MEDICAL_DISCLAIMER_EN } from '../data/bloodGroups';
import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Clock,
  Heart,
  Droplet,
  Coffee,
  Activity,
  ShieldAlert,
} from 'lucide-react';

export const BloodGuideSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'স্বাস্থ্য ও চিকিৎসা নির্দেশিকা' : 'Health & Clinical Guide'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'নিরাপদ রক্তদান নির্দেশিকা ও যোগ্যতা' : 'Safe Blood Donation Guide & Eligibility'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {language === 'bn'
              ? 'রক্তদানের পূর্বে ও পরে করণীয় এবং প্রয়োজনীয় স্বাস্থ্যবিধি সম্পর্কে নির্ভরযোগ্য তথ্য'
              : 'Verified health guidelines and standard clinical precautions before and after donating blood'}
          </p>
        </div>

        {/* Medical Disclaimer Alert */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-5 mb-8 flex items-start space-x-3.5 shadow-xs">
          <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-red-900 leading-relaxed font-medium">
            <span className="font-bold underline block mb-0.5">
              {language === 'bn' ? 'চিকিৎসাগত গুরুত্বপূর্ণ ঘোষণা:' : 'Mandatory Clinical Notice:'}
            </span>
            {language === 'bn' ? MEDICAL_DISCLAIMER_BN : MEDICAL_DISCLAIMER_EN}
          </div>
        </div>

        {/* 4 Essential Core Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Eligibility */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-red-300 transition">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'রক্তদানের সাধারণ যোগ্যতা (Eligibility)' : 'General Donor Eligibility'}
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>
                  <strong>{language === 'bn' ? 'বয়স:' : 'Age:'}</strong>{' '}
                  {language === 'bn' ? '১৮ থেকে ৬০ বছর (সুস্থ প্রাপ্তবয়স্ক ব্যক্তি)।' : '18 to 60 years old.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>
                  <strong>{language === 'bn' ? 'ওজন:' : 'Weight:'}</strong>{' '}
                  {language === 'bn' ? 'নূন্যতম ৪৫ কেজি (পুরুষদের ৫০ কেজি বা তদুর্ধ আদর্শ)।' : 'Minimum 45 kg (50 kg+ ideal).'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>
                  <strong>{language === 'bn' ? 'হিমোগ্লোবিন:' : 'Hemoglobin:'}</strong>{' '}
                  {language === 'bn' ? '১২.৫ গ্রাম/ডেসিলিটার বা তার বেশি থাকা বাঞ্ছনীয়।' : '12.5 g/dL or higher.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>
                  <strong>{language === 'bn' ? 'রক্তচাপ ও নাড়ি:' : 'Blood Pressure:'}</strong>{' '}
                  {language === 'bn' ? 'স্বাভাবিক মাত্রার রক্তচাপ এবং জ্বরমুক্ত থাকতে হবে।' : 'Normal blood pressure and no fever.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2: Donation Interval */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-red-300 transition">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'কতদিন পর পর রক্ত দেওয়া যায়?' : 'How Often Can You Donate?'}
              </h3>
            </div>
            <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
              <p>
                {language === 'bn'
                  ? 'একজন সুস্থ প্রাপ্তবয়স্ক পুরুষ প্রতি ৩ মাস পর পর (বছরে সর্বোচ্চ ৪ বার) এবং নারী প্রতি ৪ মাস পর পর (বছরে সর্বোচ্চ ৩ বার) নিরাপদে রক্ত দিতে পারেন।'
                  : 'Healthy adult males can safely donate every 3 months (up to 4 times a year), while females can donate every 4 months (up to 3 times a year).'}
              </p>
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-blue-900 font-medium">
                {language === 'bn'
                  ? '💡 মানবদেহের লোহিত রক্তকণিকা (RBC) প্রতি ১২০ দিন পর পর প্রাকৃতিকভাবেই পুনরুৎপাদিত হয়। রক্ত দিলে শরীরের কোনো ক্ষতি হয় না, বরং নতুন রক্তকণিকা সৃষ্টি ত্বরান্বিত হয়।'
                  : '💡 Human red blood cells naturally renew every 120 days. Donating stimulates bone marrow to produce fresh cells.'}
              </div>
            </div>
          </div>

          {/* Card 3: Before Donation */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-red-300 transition">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'রক্তদানের পূর্বে কী করা উচিত?' : 'What to Do Before Donating'}
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{language === 'bn' ? 'রক্তদানের আগের রাতে কমপক্ষে ৭-৮ ঘণ্টা ভালো ঘুম নিশ্চিত করুন।' : 'Get 7-8 hours of good sleep the night before.'}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{language === 'bn' ? 'রক্তদানের আগে প্রচুর পানি, ফলের জুস বা তরল খাবার পান করুন।' : 'Drink plenty of water or fluids before donation.'}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{language === 'bn' ? 'কখনোই খালি পেটে রক্ত দেবেন না; রক্তদানের ২-৩ ঘণ্টা পূর্বে পুষ্টিকর খাবার খান।' : 'Never donate on an empty stomach; eat 2-3 hours before.'}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{language === 'bn' ? 'রক্তদানের অন্তত ২ ঘণ্টা পূর্বে ধূমপান থেকে বিরত থাকুন।' : 'Avoid smoking at least 2 hours before donation.'}</span>
              </li>
            </ul>
          </div>

          {/* Card 4: After Donation */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-red-300 transition">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'রক্তদানের পরে কী করা উচিত?' : 'What to Do After Donating'}
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>{language === 'bn' ? 'রক্তদানের পর সাথে সাথে উঠে দাঁড়াবেন না; বিছানায় অন্তত ১০-১৫ মিনিট বিশ্রাম নিন।' : 'Rest on the couch for 10-15 minutes after donation.'}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>{language === 'bn' ? 'পরবর্তী কয়েক ঘণ্টা পর্যাপ্ত স্যালাইন, ফলের রস বা পানি গ্রহণ করুন।' : 'Drink plenty of water or electrolyte liquids for next few hours.'}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>{language === 'bn' ? 'সেদিন ভারী শারীরিক পরিশ্রম, ব্যায়াম বা ওজন বহন করা থেকে বিরত থাকুন।' : 'Avoid strenuous physical exercise or lifting heavy weights.'}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>{language === 'bn' ? 'যে হাত থেকে রক্ত নেওয়া হয়েছে, সেই হাতে অন্তত ৪-৫ ঘণ্টা ভারী কিছু ধরবেন না।' : 'Avoid lifting heavy items with the donor arm for 4-5 hours.'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* When to consult a physician */}
        <div className="mt-8 bg-amber-50/70 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-center space-x-2.5 mb-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>
              {language === 'bn' ? 'কোন পরিস্থিতিতে রক্তদান স্থগিত রাখা বা চিকিৎসকের পরামর্শ নেওয়া উচিত?' : 'When to Defer Donation & Consult a Doctor?'}
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {language === 'bn'
              ? 'যদি সাম্প্রতিক সময়ে আপনার জন্ডিস (হেপাটাইটিস), ম্যালেরিয়া, ডেঙ্গু, টাইফয়েড, হার্ট বা কিডনির জটিল রোগ, অনিয়ন্ত্রিত ডায়াবেটিস, রক্তস্বল্পতা থাকে, অথবা সাম্প্রতিক সময়ে অ্যান্টিবায়োটিক সেবন করে থাকেন, তবে রক্ত দেওয়ার আগে ব্লাড ব্যাংকের দায়িত্বরত চিকিৎসকের পরামর্শ গ্রহণ আবশ্যক।'
              : 'If you have a history of hepatitis, malaria, dengue, uncontrolled diabetes, cardiovascular conditions, chronic anemia, or recent antibiotic use, clinical consultation with the blood bank doctor is mandatory.'}
          </p>
        </div>
      </div>
    </div>
  );
};
