export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export interface BloodGroupInfo {
  group: BloodGroup;
  nameBn: string;
  nameEn: string;
  canDonateTo: BloodGroup[];
  canReceiveFrom: BloodGroup[];
  descriptionBn: string;
  descriptionEn: string;
  isUniversalDonor?: boolean;
  isUniversalRecipient?: boolean;
  rarityEstimateBn: string;
  rarityEstimateEn: string;
}

export const BLOOD_GROUPS: BloodGroupInfo[] = [
  {
    group: 'O+',
    nameBn: 'ও পজিটিভ',
    nameEn: 'O Positive',
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O+', 'O-'],
    descriptionBn: 'বাংলাদেশে সবচেয়ে সচরাচর রক্তের গ্রুপগুলোর অন্যতম। সব পজিটিভ গ্রুপকে রক্ত দিতে সক্ষম।',
    descriptionEn: 'One of the most common blood types in Bangladesh. Can donate to all positive blood types.',
    rarityEstimateBn: 'সাধারণ (প্রায় ৩১-৩৫%)',
    rarityEstimateEn: 'Common (~31-35%)',
  },
  {
    group: 'A+',
    nameBn: 'এ পজিটিভ',
    nameEn: 'A Positive',
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
    descriptionBn: 'খুবই পরিচিত ও প্রয়োজনীয় রক্তের গ্রুপ। A+ এবং AB+ গ্রহীতাকে রক্ত দিতে পারে।',
    descriptionEn: 'Very common and essential blood type. Can give to A+ and AB+ recipients.',
    rarityEstimateBn: 'সাধারণ (প্রায় ২৫-২৮%)',
    rarityEstimateEn: 'Common (~25-28%)',
  },
  {
    group: 'B+',
    nameBn: 'বি পজিটিভ',
    nameEn: 'B Positive',
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
    descriptionBn: 'দক্ষিণ এশিয়া ও বাংলাদেশে বহুল প্রচলিত রক্তের গ্রুপ।',
    descriptionEn: 'Widely prevalent blood type across South Asia and Bangladesh.',
    rarityEstimateBn: 'সর্বাধিক প্রাপ্ত (প্রায় ৩৪-৩৮%)',
    rarityEstimateEn: 'Most Prevalent (~34-38%)',
  },
  {
    group: 'AB+',
    nameBn: 'এবি পজিটিভ',
    nameEn: 'AB Positive',
    canDonateTo: ['AB+'],
    canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    descriptionBn: 'সর্বজনীন গ্রহীতা (Universal Recipient)। যেকোনো রক্তের গ্রুপের কাছ থেকে লোহিত রক্তকণিকা গ্রহণ করতে পারে।',
    descriptionEn: 'Universal recipient for red blood cells. Can receive blood from any blood group.',
    isUniversalRecipient: true,
    rarityEstimateBn: 'তুলনামূলক কম (প্রায় ৭-৯%)',
    rarityEstimateEn: 'Relatively Rare (~7-9%)',
  },
  {
    group: 'O-',
    nameBn: 'ও নেগেটিভ',
    nameEn: 'O Negative',
    canDonateTo: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    canReceiveFrom: ['O-'],
    descriptionBn: 'সর্বজনীন রক্তদাতা (Universal Red Cell Donor)। জরুরি মুহূর্তে যেকোনো রোগীকে জীবন বাঁচাতে দেওয়া যায়।',
    descriptionEn: 'Universal red blood cell donor. Vital in emergency trauma cases for any patient.',
    isUniversalDonor: true,
    rarityEstimateBn: 'বিরল (প্রায় ১-২%)',
    rarityEstimateEn: 'Rare (~1-2%)',
  },
  {
    group: 'A-',
    nameBn: 'এ নেগেটিভ',
    nameEn: 'A Negative',
    canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
    canReceiveFrom: ['A-', 'O-'],
    descriptionBn: 'বিরল নেগেটিভ রক্তের গ্রুপ। জরুরি সার্জারি ও প্রসূতি সেবায় বিশেষ প্রয়োজন হয়।',
    descriptionEn: 'Rare negative blood group. Crucial for elective surgeries and maternal care.',
    rarityEstimateBn: 'বিরল (প্রায় ০.৫-১%)',
    rarityEstimateEn: 'Rare (~0.5-1%)',
  },
  {
    group: 'B-',
    nameBn: 'বি নেগেটিভ',
    nameEn: 'B Negative',
    canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
    canReceiveFrom: ['B-', 'O-'],
    descriptionBn: 'বিরল রক্তের গ্রুপ। প্রয়োজনীয় রক্তদাতা খুঁজে পেতে কিছুটা সময় লাগতে পারে।',
    descriptionEn: 'Rare blood group. Requires active community networks to locate on short notice.',
    rarityEstimateBn: 'বিরল (প্রায় ১-১.৫%)',
    rarityEstimateEn: 'Rare (~1-1.5%)',
  },
  {
    group: 'AB-',
    nameBn: 'এবি নেগেটিভ',
    nameEn: 'AB Negative',
    canDonateTo: ['AB+', 'AB-'],
    canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
    descriptionBn: 'বাংলাদেশের অন্যতম বিরলতম রক্তের গ্রুপ। সচেতন রক্তদাতাদের তালিকাভুক্ত থাকা বিশেষ জরুরি।',
    descriptionEn: 'One of the rarest blood groups in Bangladesh. Having enlisted donors is critical.',
    rarityEstimateBn: 'সবচেয়ে বিরল (প্রায় ০.৩-০.৫%)',
    rarityEstimateEn: 'Rarest (~0.3-0.5%)',
  },
];

export const MEDICAL_DISCLAIMER_BN =
  'জরুরি সতর্কতা: রক্ত গ্রহণের পূর্বে অবশ্যই অনুমোদিত হাসপাতাল বা ব্লাড ব্যাংকের চিকিৎসক দ্বারা ক্রস-ম্যাচিং (Cross-Matching) ও স্ক্রিনিং টেস্ট সম্পন্ন করতে হবে। এই ওয়েবসাইট কেবল মানবিক যোগাযোগ রক্ষাকারী প্ল্যাটফর্ম এবং কোনো অবস্থাতেই চিকিৎসকের পেশাদার সিদ্ধান্তের বিকল্প নয়।';

export const MEDICAL_DISCLAIMER_EN =
  'Important Medical Disclaimer: Prior to blood transfusion, mandatory cross-matching and infectious disease screening must be performed by certified hospitals or blood banks. This platform solely facilitates voluntary humanitarian connections and does not replace medical advice or clinical decisions.';
