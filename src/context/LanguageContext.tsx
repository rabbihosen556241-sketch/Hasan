import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'bn' | 'en';

interface Translations {
  [key: string]: {
    bn: string;
    en: string;
  };
}

export const translations: Translations = {
  // Brand & Header
  brandName: {
    bn: 'রক্তবন্ধু',
    en: 'RoktoBondhu',
  },
  brandSlogan: {
    bn: 'বাংলাদেশের জীবন রক্ষাকারী রক্তদাতা নেটওয়ার্ক',
    en: 'Life Saving Blood Donor Network of Bangladesh',
  },
  home: {
    bn: 'হোম',
    en: 'Home',
  },
  findDonor: {
    bn: 'রক্তদাতা খুঁজুন',
    en: 'Find Donor',
  },
  bloodGroups: {
    bn: 'রক্তের গ্রুপসমূহ',
    en: 'Blood Groups',
  },
  bloodRequests: {
    bn: 'রক্তের অনুরোধ',
    en: 'Blood Requests',
  },
  emergencyBlood: {
    bn: 'জরুরি রক্ত',
    en: 'Emergency Blood',
  },
  becomeDonor: {
    bn: 'রক্তদাতা হিসেবে নিবন্ধন',
    en: 'Become a Donor',
  },
  bloodGuide: {
    bn: 'রক্তদান নির্দেশিকা',
    en: 'Blood Guide',
  },
  compatibility: {
    bn: 'রক্তের সামঞ্জস্যতা',
    en: 'Compatibility',
  },
  stories: {
    bn: 'সফলতার গল্প',
    en: 'Stories',
  },
  admin: {
    bn: 'অ্যাডমিন',
    en: 'Admin',
  },
  login: {
    bn: 'লগইন',
    en: 'Login',
  },
  register: {
    bn: 'নিবন্ধন',
    en: 'Register',
  },
  logout: {
    bn: 'লগআউট',
    en: 'Logout',
  },
  dashboard: {
    bn: 'ড্যাশবোর্ড',
    en: 'Dashboard',
  },
  myProfile: {
    bn: 'আমার প্রোফাইল',
    en: 'My Profile',
  },

  // Hero Section
  heroHeadline: {
    bn: 'এক ব্যাগ রক্ত, একটি জীবন',
    en: 'One Bag of Blood, One Precious Life',
  },
  heroSubheadline: {
    bn: 'আপনার একটুখানি সহযোগিতা কারও জীবনে নতুন আশার আলো জ্বালাতে পারে।',
    en: 'Your small act of kindness can kindle a new ray of hope in someone\'s life.',
  },
  btnFindDonor: {
    bn: 'রক্তদাতা খুঁজুন',
    en: 'Find Blood Donor',
  },
  btnRegisterDonor: {
    bn: 'রক্তদাতা হিসেবে নিবন্ধন করুন',
    en: 'Register as a Blood Donor',
  },
  btnCreateRequest: {
    bn: 'রক্তের অনুরোধ তৈরি করুন',
    en: 'Post Blood Request',
  },

  // Stats
  statTotalDonors: {
    bn: 'মোট রক্তদাতা',
    en: 'Total Donors',
  },
  statActiveDonors: {
    bn: 'সক্রিয় রক্তদাতা',
    en: 'Active Donors',
  },
  statTotalRequests: {
    bn: 'মোট Blood Request',
    en: 'Total Blood Requests',
  },
  statCompletedDonations: {
    bn: 'সম্পন্ন হওয়া রক্তদান',
    en: 'Completed Donations',
  },
  statEmergencyRequests: {
    bn: 'বর্তমানে জরুরি Request',
    en: 'Active Emergency Requests',
  },

  // Search & Filters
  searchPlaceholder: {
    bn: 'রক্তের গ্রুপ, জেলা বা এলাকা দিয়ে সার্চ করুন...',
    en: 'Search by blood group, district, or area...',
  },
  selectBloodGroup: {
    bn: 'রক্তের গ্রুপ নির্বাচন করুন',
    en: 'Select Blood Group',
  },
  selectDivision: {
    bn: 'বিভাগ নির্বাচন করুন',
    en: 'Select Division',
  },
  selectDistrict: {
    bn: 'জেলা নির্বাচন করুন',
    en: 'Select District',
  },
  selectUpazila: {
    bn: 'উপজেলা/থানা নির্বাচন করুন',
    en: 'Select Upazila/Thana',
  },
  selectAvailability: {
    bn: 'উপলব্ধতা (Availability)',
    en: 'Availability Status',
  },
  allDivisions: {
    bn: 'সকল বিভাগ',
    en: 'All Divisions',
  },
  allDistricts: {
    bn: 'সকল জেলা',
    en: 'All Districts',
  },
  allUpazilas: {
    bn: 'সকল উপজেলা',
    en: 'All Upazilas',
  },
  allBloodGroups: {
    bn: 'সকল রক্তের গ্রুপ',
    en: 'All Blood Groups',
  },
  searchDonors: {
    bn: 'রক্তদাতা অনুসন্ধান করুন',
    en: 'Search Donors',
  },
  filterReset: {
    bn: 'ফিল্টার রিসেট',
    en: 'Reset Filters',
  },
  findDonorsForGroup: {
    bn: 'এই গ্রুপের রক্তদাতা খুঁজুন',
    en: 'Find Donors For This Group',
  },

  // Statuses
  available: {
    bn: 'রক্তদানে প্রস্তুত',
    en: 'Available Now',
  },
  temporarily_unavailable: {
    bn: 'সাময়িকভাবে অনুপলব্ধ',
    en: 'Temporarily Unavailable',
  },
  not_available: {
    bn: 'বর্তমানে অনুপলব্ধ',
    en: 'Not Available',
  },
  verifiedDonor: {
    bn: 'ভেরিফায়েড রক্তদাতা',
    en: 'Verified Donor',
  },
  unverified: {
    bn: 'যাচাইাধীন',
    en: 'Under Verification',
  },
  urgentBadge: {
    bn: 'জরুরি প্রয়োজন!',
    en: 'Emergency Need!',
  },

  // Actions & Buttons
  requestBloodBtn: {
    bn: 'রক্তের জন্য যোগাযোগ করুন',
    en: 'Request Blood',
  },
  viewDetails: {
    bn: 'বিস্তারিত দেখুন',
    en: 'View Details',
  },
  cancel: {
    bn: 'বাতিল',
    en: 'Cancel',
  },
  save: {
    bn: 'সংরক্ষণ করুন',
    en: 'Save',
  },
  submit: {
    bn: 'জমা দিন',
    en: 'Submit',
  },
  accept: {
    bn: 'গ্রহণ করুন',
    en: 'Accept Request',
  },
  decline: {
    bn: 'প্রত্যাখ্যান করুন',
    en: 'Decline',
  },
  close: {
    bn: 'বন্ধ করুন',
    en: 'Close',
  },
  share: {
    bn: 'শেয়ার করুন',
    en: 'Share Request',
  },
  report: {
    bn: 'রিপোর্ট করুন',
    en: 'Report',
  },

  // Donor Card / Profile
  lastDonation: {
    bn: 'সর্বশেষ রক্তদান',
    en: 'Last Donation',
  },
  totalDonationsLabel: {
    bn: 'মোট রক্তদান',
    en: 'Total Donations',
  },
  times: {
    bn: 'বার',
    en: 'times',
  },
  location: {
    bn: 'অবস্থান',
    en: 'Location',
  },
  ageLabel: {
    bn: 'বয়স',
    en: 'Age',
  },
  yearsOld: {
    bn: 'বছর',
    en: 'years',
  },
  neverDonated: {
    bn: 'প্রথমবার দাতা',
    en: 'First Time Donor',
  },
  safeContactNotice: {
    bn: 'নিরাপত্তার স্বার্থে রক্তদাতার ব্যক্তিগত ফোন নম্বর ও সঠিক ঠিকানা সরাসরি সর্বজনীনভাবে প্রকাশিত নয়। যোগাযোগের আবেদন পাঠালে রক্তদাতার অনুমতিক্রমে নম্বর শেয়ার করা হবে।',
    en: 'For security, donors\' phone numbers and exact home addresses are not published publicly. Send a safe request, and contact details will be shared upon donor acceptance.',
  },

  // Emergency Section
  emergencyHeadline: {
    bn: '🚨 এই মুহূর্তে জরুরি রক্তের আবেদন',
    en: '🚨 Urgent Emergency Blood Requests Right Now',
  },
  emergencySubhead: {
    bn: 'অসহায় রোগীদের পাশে দাঁড়ান, রক্তদানে এগিয়ে আসুন',
    en: 'Stand by vulnerable patients, come forward to donate blood',
  },
  hospital: {
    bn: 'হাসপাতাল',
    en: 'Hospital',
  },
  requiredBags: {
    bn: 'প্রয়োজনীয় ব্যাগ',
    en: 'Bags Required',
  },
  requiredTime: {
    bn: 'প্রয়োজনের সময়',
    en: 'Required Time',
  },
  contactPerson: {
    bn: 'যোগাযোগের ব্যক্তি',
    en: 'Contact Person',
  },
  contactNumber: {
    bn: 'যোগাযোগ নম্বর',
    en: 'Phone Number',
  },
  patientReason: {
    bn: 'রোগীর অবস্থা / কারণ',
    en: 'Reason / Condition',
  },

  // How it works
  howItWorksTitle: {
    bn: 'রক্তবন্ধু যেভাবে কাজ করে',
    en: 'How RoktoBondhu Works',
  },
  howItWorksSubtitle: {
    bn: 'মাত্র ৩টি সহজ ধাপে জীবন বাঁচান বা জরুরি রক্ত খুঁজে নিন',
    en: 'Save lives or find urgent blood in just 3 simple steps',
  },
  step1Title: {
    bn: '১. রক্তদাতা খুঁজুন বা অনুরোধ করুন',
    en: '1. Search Donor or Post Request',
  },
  step1Desc: {
    bn: 'আপনার প্রয়োজনীয় রক্তের গ্রুপ এবং জেলা নির্বাচন করে তাৎক্ষণিক রক্তদাতা খুঁজুন অথবা একটি জরুরি রিকুয়েস্ট পোস্ট করুন।',
    en: 'Search immediately by your required blood group and district, or post an emergency request.',
  },
  step2Title: {
    bn: '২. নিরাপদ যোগাযোগ',
    en: '2. Safe & Direct Contact',
  },
  step2Desc: {
    bn: 'রক্তদাতার গোপনীয়তা রক্ষা করে সরাসরি অ্যাপের মাধ্যমে রিকুয়েস্ট পাঠান। রক্তদাতা গ্রহণ করলেই নম্বর দৃশ্যমান হবে।',
    en: 'Respecting donor privacy, request through the app. The phone number is safely revealed once accepted.',
  },
  step3Title: {
    bn: '৩. রক্তদান ও জীবন রক্ষা',
    en: '3. Donate Blood & Save Life',
  },
  step3Desc: {
    bn: 'হাসপাতালে গিয়ে চিকিৎসকের পরামর্শে ক্রস-ম্যাচিংয়ের মাধ্যমে রক্ত দিন এবং একজনের মুখে স্বস্তির হাসি ফোটান।',
    en: 'Visit the hospital, conduct standard medical cross-matching, donate blood, and bring back a precious smile.',
  },

  // Medical Disclaimer
  medicalDisclaimerNotice: {
    bn: 'গুরুত্বপূর্ণ সতর্কতা: রক্তদানের পূর্বে হাসপাতাল বা অনুমোদিত ব্লাড ব্যাংকে বাধ্যতামূলক ক্রস-ম্যাচিং এবং স্ক্রিনিং টেস্ট করাতে হবে। রক্তবন্ধু সম্পূর্ণ অলাভজনক ও মানবিক যোগাযোগের মাধ্যম, কোনো বাণিজ্যিক রক্ত কেনাবেচা সমর্থন করে না।',
    en: 'Important: Mandatory cross-matching and disease screening must be performed at certified hospitals/blood banks before transfusion. RoktoBondhu is strictly a non-commercial humanitarian platform.',
  },

  // Run Instructions for user
  runInstructionsBtn: {
    bn: '💻 PC ও 📱 Termux চালানোর গাইড',
    en: '💻 Run on PC & 📱 Termux Guide',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('roktobondhu_lang');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn';
  });

  useEffect(() => {
    localStorage.setItem('roktobondhu_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) {
      return key;
    }
    return translations[key][language] || translations[key].bn || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
