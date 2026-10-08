import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qBn: 'রক্ত দিলে কি শরীরের কোনো ক্ষতি বা দুর্বলতা হয়?',
      qEn: 'Does donating blood cause weakness or harm to health?',
      aBn: 'না। একজন সুস্থ মানুষের শরীরে প্রায় ৫-৬ লিটার রক্ত থাকে। রক্তদানে মাত্র ৩৫০-৪৫০ মিলি রক্ত নেওয়া হয়, যা মোট রক্তের সামান্য অংশ। রক্তদানের ২৪-৪৮ ঘণ্টার মধ্যে তরল অংশ (প্লাজমা) পূরণ হয়ে যায় এবং কয়েক সপ্তাহের মধ্যে নতুন রক্তকণিকা তৈরি হয়। এটি হৃদরোগের ঝুঁকিও কমায়।',
      aEn: 'No. An adult has 5-6 liters of blood. A donation takes only ~350-450 ml. The plasma volume restores within 24-48 hours, and new cells regenerate in a few weeks.',
    },
    {
      qBn: 'কতদিন পর পর পুনরায় রক্ত দেওয়া যায়?',
      qEn: 'How frequently can one donate blood?',
      aBn: 'একজন সুস্থ পুরুষ প্রতি ৩ মাস পর পর এবং নারী প্রতি ৪ মাস পর পর নিরাপদে রক্ত দিতে পারেন। রক্তদানের পূর্বে রক্তদাতার হিমোগ্লোবিন পরীক্ষা করা হয়।',
      aEn: 'Healthy males can safely donate every 3 months, and females every 4 months.',
    },
    {
      qBn: 'রক্তদাতা হিসেবে আমার ফোন নম্বর কি যে কেউ দেখতে পাবে?',
      qEn: 'Will my phone number be publicly visible to strangers?',
      aBn: 'না। রক্তবন্ধু প্ল্যাটফর্মে রক্তদাতার গোপনীয়তা ও সুরক্ষা সর্বোচ্চ অগ্রাধিকার। যে কারও সামনে আপনার সঠিক ঠিকানা ও ফোন নম্বর সরাসরি প্রকাশিত হয় না। রক্তপ্রার্থী আবেদন পাঠালে আপনার সম্মতিক্রমে (Accept করার পর) নিরাপদভাবে নম্বর শেয়ার করা হয়।',
      aEn: 'No. Phone numbers and home addresses are never published to scrapers. Contacts are safely revealed only when you explicitly accept a request.',
    },
    {
      qBn: 'এই প্ল্যাটফর্মে রক্ত কেনাবেচা বা কোনো আর্থিক লেনদেন করা যাবে কি?',
      qEn: 'Is blood buying/selling or financial transactions allowed?',
      aBn: 'সম্পূর্ণ নিষিদ্ধ! রক্তবন্ধু একটি অলাভজনক ও সম্পূর্ণ বিনামূল্যে মানবিক প্ল্যাটফর্ম। রক্ত বিক্রি বা কোনো প্রকার আর্থিক লেনদেন আইনত ও নৈতিকভাবে দণ্ডনীয় অপরাধ। এমন কোনো ঘটনার প্রমাণ পাওয়া গেলে তাৎক্ষণিক অ্যাকাউন্ট বাতিল ও আইনি রিপোর্ট করা হবে।',
      aEn: 'Strictly prohibited! RoktoBondhu is 100% free and voluntary humanitarian service. Commercial transactions are illegal and strictly forbidden.',
    },
    {
      qBn: 'নারীরা কি রক্ত দিতে পারেন?',
      qEn: 'Can women donate blood?',
      aBn: 'অবশ্যই! নারীরা সমানভাবেই রক্ত দিতে পারেন, যদি তাদের ওজন নূন্যতম ৪৫ কেজি থাকে এবং হিমোগ্লোবিনের মাত্রা ১২ গ্রাম/ডেসিলিটার বা তার বেশি থাকে। শুধু গর্ভাবস্থায় বা সন্তানকে বুকের দুধ পান করানোর সময় সাময়িকভাবে রক্তদান থেকে বিরত থাকতে হয়।',
      aEn: 'Yes! Women can donate if their weight is at least 45 kg and hemoglobin is adequate.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'রক্তদান সম্পর্কে সচরাচর জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-800 hover:text-red-600 transition cursor-pointer"
                >
                  <span>{language === 'bn' ? faq.qBn : faq.qEn}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-red-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {language === 'bn' ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
