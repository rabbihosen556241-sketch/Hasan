import type {
  User,
  Donor,
  BloodRequest,
  SafeContactRequest,
  DonationRecord,
  NotificationItem,
  ReportItem,
  AuditLog,
  SuccessStory,
  PlatformStatistics,
} from '../src/types/index.ts';

export interface DatabaseStore {
  users: User[];
  donors: Donor[];
  bloodRequests: BloodRequest[];
  contactRequests: SafeContactRequest[];
  donationRecords: DonationRecord[];
  notifications: NotificationItem[];
  reports: ReportItem[];
  auditLogs: AuditLog[];
  successStories: SuccessStory[];
}

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-1',
    name: 'ডা. রফিকুল ইসলাম (Admin)',
    email: 'admin@roktobondhu.org',
    phone: '01711000001',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    createdAt: '2025-01-10T09:00:00.000Z',
  },
  {
    id: 'user-donor-1',
    name: 'তানভীর আহমেদ',
    email: 'tanvir@gmail.com',
    phone: '01819223344',
    role: 'donor',
    donorId: 'donor-1',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    createdAt: '2025-01-15T10:00:00.000Z',
  },
  {
    id: 'user-donor-2',
    name: 'সাবরিনা জাহান',
    email: 'sabrina@gmail.com',
    phone: '01712334455',
    role: 'donor',
    donorId: 'donor-2',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    createdAt: '2025-02-01T11:00:00.000Z',
  },
  {
    id: 'user-requester-1',
    name: 'মাহমুদ হাসান',
    email: 'mahmud@gmail.com',
    phone: '01911223344',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    createdAt: '2025-02-10T12:00:00.000Z',
  },
];

export const INITIAL_DONORS: Donor[] = [
  {
    id: 'donor-1',
    userId: 'user-donor-1',
    fullName: 'তানভীর আহমেদ',
    bloodGroup: 'O+',
    age: 28,
    gender: 'male',
    phone: '01819223344',
    email: 'tanvir@gmail.com',
    division: 'dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    area: 'ধানমন্ডি লেক সংলগ্ন',
    lastDonationDate: '2025-11-20',
    availability: 'available',
    preferredContact: 'call',
    shortBio: 'স্বেচ্ছায় নিয়মিত রক্তদান করি। জরুরি মুহূর্তে মানবসেবায় পাশে থাকতে চাই।',
    isVerified: true,
    totalDonations: 8,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-15T10:00:00.000Z',
  },
  {
    id: 'donor-2',
    userId: 'user-donor-2',
    fullName: 'সাবরিনা জাহান',
    bloodGroup: 'A+',
    age: 25,
    gender: 'female',
    phone: '01712334455',
    email: 'sabrina@gmail.com',
    division: 'dhaka',
    district: 'Dhaka',
    upazila: 'Uttara',
    area: 'উত্তরা সেক্টর ৭',
    lastDonationDate: '2025-12-15',
    availability: 'available',
    preferredContact: 'whatsapp',
    shortBio: 'বিশ্ববিদ্যালয় শিক্ষার্থী। ৩ বার থ্যালাসেমিয়া রোগীকে রক্ত দিয়েছি।',
    isVerified: true,
    totalDonations: 4,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-02-01T11:00:00.000Z',
  },
  {
    id: 'donor-3',
    fullName: 'আরিফুল ইসলাম',
    bloodGroup: 'B+',
    age: 31,
    gender: 'male',
    phone: '01678112233',
    email: 'ariful@gmail.com',
    division: 'chattogram',
    district: 'Chattogram',
    upazila: 'Agrabad',
    area: 'আগ্রাবাদ কমার্শিয়াল এরিয়া',
    lastDonationDate: '2025-10-05',
    availability: 'available',
    preferredContact: 'call',
    shortBio: 'চট্টগ্রাম সিটির যেকোনো সরকারি বা বেসরকারি হাসপাতালে রক্ত দিতে ইচ্ছুক।',
    isVerified: true,
    totalDonations: 12,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-20T08:00:00.000Z',
  },
  {
    id: 'donor-4',
    fullName: 'মো. নাজমুল হাসান',
    bloodGroup: 'O-',
    age: 33,
    gender: 'male',
    phone: '01799887766',
    email: 'nazmul@gmail.com',
    division: 'dhaka',
    district: 'Dhaka',
    upazila: 'Mirpur',
    area: 'মিরপুর ১০',
    lastDonationDate: '2025-08-14',
    availability: 'available',
    preferredContact: 'call',
    shortBio: 'ও নেগেটিভ (Universal Donor)। সংকটপূর্ণ ট্রমা বা দুর্ঘটনায় দ্রুত পাশে থাকি।',
    isVerified: true,
    totalDonations: 15,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-05T12:00:00.000Z',
  },
  {
    id: 'donor-5',
    fullName: 'ফারহানা হক',
    bloodGroup: 'AB+',
    age: 27,
    gender: 'female',
    phone: '01552123456',
    email: 'farhana@gmail.com',
    division: 'sylhet',
    district: 'Sylhet',
    upazila: 'Zindabazar',
    area: 'জিন্দাবাজার',
    lastDonationDate: '2026-01-02',
    availability: 'temporarily_unavailable',
    preferredContact: 'sms',
    shortBio: 'সম্প্রতি রক্ত দিয়েছি, ৩ মাস পর পুনরায় রক্তদানে প্রস্তুত হব ইনশাআল্লাহ।',
    isVerified: true,
    totalDonations: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-02-12T14:00:00.000Z',
  },
  {
    id: 'donor-6',
    fullName: 'রাকিবুল হাসান সাজিদ',
    bloodGroup: 'AB-',
    age: 29,
    gender: 'male',
    phone: '01855667788',
    email: 'rakib@gmail.com',
    division: 'rajshahi',
    district: 'Rajshahi',
    upazila: 'Boalia',
    area: 'বোয়ালিয়া বাজার সংলগ্ন',
    lastDonationDate: '2025-11-10',
    availability: 'available',
    preferredContact: 'whatsapp',
    shortBio: 'এবি নেগেটিভ খুবই দুর্লভ রক্তের গ্রুপ। রাজশাহী এলাকার যেকোনো রক্তের প্রয়োজনে কল দিন।',
    isVerified: true,
    totalDonations: 7,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-18T16:00:00.000Z',
  },
  {
    id: 'donor-7',
    fullName: 'তাসনিয়া রহমান',
    bloodGroup: 'B-',
    age: 24,
    gender: 'female',
    phone: '01744332211',
    email: 'tasnia@gmail.com',
    division: 'khulna',
    district: 'Khulna',
    upazila: 'Sonadanga',
    area: 'সোনাডাঙ্গা আবাসিক',
    lastDonationDate: '2025-09-18',
    availability: 'available',
    preferredContact: 'call',
    shortBio: 'বি নেগেটিভ রক্তদাতা। মানবিক দায়িত্ববোধ থেকে নিয়মিত রক্ত দিই।',
    isVerified: true,
    totalDonations: 3,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-02-05T09:30:00.000Z',
  },
  {
    id: 'donor-8',
    fullName: 'কাজী মাহমুদুল হক',
    bloodGroup: 'A-',
    age: 35,
    gender: 'male',
    phone: '01988776655',
    email: 'mahmudul@gmail.com',
    division: 'dhaka',
    district: 'Gazipur',
    upazila: 'Tongi',
    area: 'টঙ্গী কলেজ গেট',
    lastDonationDate: '2025-10-30',
    availability: 'available',
    preferredContact: 'call',
    shortBio: 'এ নেগেটিভ বিরল গ্রুপ। গাজীপুর বা ঢাকায় দ্রুত মুভ করতে পারি।',
    isVerified: false,
    totalDonations: 4,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-02-14T11:20:00.000Z',
  },
];

export const INITIAL_REQUESTS: BloodRequest[] = [
  {
    id: 'req-emergency-1',
    requesterId: 'user-requester-1',
    patientName: 'সালমা বেগম (৪৫ বছর)',
    bloodGroup: 'O+',
    hospitalName: 'ঢাকা মেডিকেল কলেজ হাসপাতাল (DMCH)',
    hospitalLocation: 'জরুরি বিভাগ, ওয়ান স্টপ ক্রাইসিস',
    district: 'Dhaka',
    upazila: 'Shahbagh',
    requiredDate: '২০২৬-০৯-৩০',
    requiredTime: 'জরুরি সকাল ১০:০০ টা',
    numberOfBags: 2,
    urgency: 'emergency',
    reasonForBlood: 'সড়ক দুর্ঘটনায় অতিরিক্ত রক্তক্ষরণ ও ইমার্জেন্সি অপারেশন',
    contactPerson: 'আহমেদ জুবায়ের (রোগীর ভাই)',
    contactNumber: '01712998877',
    additionalInfo: 'হাসপাতালের ব্লাড ব্যাংকে ক্রস-ম্যাচিংয়ের ব্যবস্থা প্রস্তুত রাখা হয়েছে। রক্তদাতার যাতায়াত খরচ বহন করা হবে।',
    status: 'active',
    matchedDonorsCount: 4,
    createdAt: '2026-09-29T10:00:00.000Z',
  },
  {
    id: 'req-emergency-2',
    patientName: 'শিশু রাফসান (৮ বছর)',
    bloodGroup: 'B-',
    hospitalName: 'বাংলাদেশ শিশু হাসপাতাল ও ইনস্টিটিউট',
    hospitalLocation: 'শ্যামলী, ঢাকা',
    district: 'Dhaka',
    upazila: 'Mohammadpur',
    requiredDate: '২০২৬-০৯-৩০',
    requiredTime: 'দুপুর ১২:০০ এর মধ্যে',
    numberOfBags: 1,
    urgency: 'emergency',
    reasonForBlood: 'থ্যালাসেমিয়া নিয়মিত মাসিক রক্ত সঞ্চালন',
    contactPerson: 'ফারুক হোসাইন (পিতা)',
    contactNumber: '01811223399',
    additionalInfo: 'বি নেগেটিভ রক্ত খুব জরুরি। সরাসরি শিশু হাসপাতালে যোগাযোগ করতে অনুরোধ করা হলো।',
    status: 'active',
    matchedDonorsCount: 2,
    createdAt: '2026-09-29T12:30:00.000Z',
  },
  {
    id: 'req-regular-1',
    patientName: 'নাসরিন আক্তার',
    bloodGroup: 'A+',
    hospitalName: 'বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU/PG Hospital)',
    hospitalLocation: 'কেবিন ব্লক, শাহবাগ',
    district: 'Dhaka',
    upazila: 'Shahbagh',
    requiredDate: '২০২৬-১০-০২',
    requiredTime: 'সকাল ৯:০০ টা',
    numberOfBags: 2,
    urgency: 'regular',
    reasonForBlood: 'গাইনি অস্ত্রোপচার ও সিজারিয়ান ডেলিভারি',
    contactPerson: 'কামরুল ইসলাম (স্বামী)',
    contactNumber: '01919887766',
    additionalInfo: 'রোগীর অবস্থা স্থিতিশীল, ২ দিন পূর্বে ক্রস-ম্যাচিং করতে হবে।',
    status: 'active',
    matchedDonorsCount: 6,
    createdAt: '2026-09-28T15:00:00.000Z',
  },
  {
    id: 'req-chattogram-1',
    patientName: 'হাজী নুরুল আমিন',
    bloodGroup: 'AB+',
    hospitalName: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল (CMCH)',
    hospitalLocation: 'কার্ডিওলজি ওয়ার্ড, ৪র্থ তলা',
    district: 'Chattogram',
    upazila: 'Panchlaish',
    requiredDate: '২০২৬-১০-০১',
    requiredTime: 'বিকাল ৪:০০ টা',
    numberOfBags: 1,
    urgency: 'emergency',
    reasonForBlood: 'হার্ট বাইপাস সার্জারি',
    contactPerson: 'আরিফ মাহমুদ (ছেলে)',
    contactNumber: '01877665544',
    additionalInfo: 'অপারেশনের জন্য সংরক্ষিত রক্ত প্রয়োজন।',
    status: 'active',
    matchedDonorsCount: 3,
    createdAt: '2026-09-29T08:15:00.000Z',
  },
];

export const INITIAL_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    titleBn: 'রাতের আঁধারে জরুরি ও-নেগেটিভ রক্তদানে বাঁচল এক মায়ের প্রাণ',
    titleEn: 'Emergency O- Blood Donation Saved a Mother\'s Life at Midnight',
    patientName: 'রেহানা বেগম',
    donorName: 'মো. নাজমুল হাসান',
    bloodGroup: 'O-',
    hospital: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
    storyBn: 'মধ্যরাতে প্রসূতি মায়ের অতিরিক্ত রক্তক্ষরণে ও-নেগেটিভ রক্তের চরম সংকট দেখা দেয়। রক্তবন্ধু প্ল্যাটফর্মে রিকুয়েস্ট পোস্ট করার মাত্র ১৫ মিনিটের মধ্যে রক্তদাতা নাজমুল ভাই হাসপাতালে ছুটে আসেন এবং সফল রক্তদান করেন। মা ও নবজাতক দুজনই এখন সুস্থ।',
    storyEn: 'During a midnight delivery complication, rare O- blood was urgently needed. Within 15 minutes of posting on RoktoBondhu, donor Nazmul arrived at DMCH and donated blood. Both mother and newborn are safe today.',
    date: '২০২৬-০৮-১৫',
    likes: 142,
  },
  {
    id: 'story-2',
    titleBn: 'থ্যালাসেমিয়া আক্রান্ত ছোট্ট সায়ানের পাশে চট্টগ্রামের রক্তদাতারা',
    titleEn: 'Chattogram Donors Rallying for 6-Year-Old Thalassemia Patient Sayan',
    patientName: 'সায়ান (৬ বছর)',
    donorName: 'আরিফুল ইসলাম',
    bloodGroup: 'B+',
    hospital: 'চট্টগ্রাম মা ও শিশু হাসপাতাল',
    storyBn: 'প্রতিমাসে বি-পজিটিভ রক্তের প্রয়োজন হয় ছোট্ট সায়ানের। রক্তবন্ধুর মাধ্যমে আরিফুল ভাই নিয়মিত রক্তদাতার দায়িত্ব নিয়েছেন। মানবিকতাই পৃথিবীর সেরা বন্ধন।',
    storyEn: 'Young Sayan requires regular blood transfusions every month. Through RoktoBondhu, Ariful volunteered as a regular donor, ensuring he never misses a transfusion.',
    date: '২০২৬-০৯-০৫',
    likes: 98,
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    titleBn: 'জরুরি রক্তের আবেদন: ঢাকা মেডিকেল কলেজ',
    titleEn: 'Emergency Blood Need: Dhaka Medical College',
    messageBn: 'আপনার রক্তের গ্রুপ O+ এর সাথে মিলে এমন ১টি জরুরি রিকুয়েস্ট শাহবাগে তৈরি হয়েছে।',
    messageEn: 'An emergency O+ blood request matching your blood group has been posted at Shahbagh.',
    type: 'emergency',
    isRead: false,
    createdAt: '2026-09-29T10:05:00.000Z',
    link: '/blood-requests',
  },
  {
    id: 'notif-2',
    titleBn: 'স্বাগতম রক্তবন্ধু পরিবারে!',
    titleEn: 'Welcome to RoktoBondhu!',
    messageBn: 'রক্তদাতা হিসেবে নিবন্ধন সম্পন্ন করার জন্য আপনাকে ধন্যবাদ। আপনার সামান্য রক্তদান কারও জীবন বাঁচাবে।',
    messageEn: 'Thank you for registering as a blood donor. Your single donation can save lives.',
    type: 'system',
    isRead: true,
    createdAt: '2026-09-28T09:00:00.000Z',
  },
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    reportedType: 'donor',
    targetId: 'donor-fake-99',
    targetTitle: 'সন্দেহভাজন বিকাশ প্রতারক কলার',
    reporterName: 'জসিম উদ্দিন',
    reporterPhone: '01711229988',
    reason: 'scam',
    description: 'ফোন করে রক্তদানের নাম করে যাতায়াত ভাড়া বাবদ অগ্রিম টাকা দাবি করেছিল।',
    status: 'pending',
    createdAt: '2026-09-28T14:30:00.000Z',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    adminName: 'ডা. রফিকুল ইসলাম',
    action: 'VERIFY_DONOR',
    details: 'Donor #donor-1 (তানভীর আহমেদ) এর ফোন নম্বর ও জাতীয় পরিচয়পত্র যাচাইপূর্বক ভেরিফায়েড ব্যাজ প্রদান।',
    timestamp: '2026-09-27T10:00:00.000Z',
    ipAddress: '103.114.98.24',
  },
  {
    id: 'log-2',
    adminName: 'ডা. রফিকুল ইসলাম',
    action: 'RESOLVE_REPORT',
    details: 'Spam phone report reviewed and resolved.',
    timestamp: '2026-09-28T16:00:00.000Z',
    ipAddress: '103.114.98.24',
  },
];

// Single in-memory repository store (can be persisted to JSON file / DB)
class DatabaseManager {
  private store: DatabaseStore;

  constructor() {
    this.store = {
      users: [...INITIAL_USERS],
      donors: [...INITIAL_DONORS],
      bloodRequests: [...INITIAL_REQUESTS],
      contactRequests: [],
      donationRecords: [],
      notifications: [...INITIAL_NOTIFICATIONS],
      reports: [...INITIAL_REPORTS],
      auditLogs: [...INITIAL_AUDIT_LOGS],
      successStories: [...INITIAL_SUCCESS_STORIES],
    };
  }

  // Statistics
  getStatistics(): PlatformStatistics {
    const totalDonors = this.store.donors.length;
    const activeDonors = this.store.donors.filter((d) => d.availability === 'available').length;
    const totalRequests = this.store.bloodRequests.length;
    const completedDonations =
      this.store.bloodRequests.filter((r) => r.status === 'completed').length +
      this.store.donors.reduce((acc, curr) => acc + curr.totalDonations, 0);
    const emergencyRequests = this.store.bloodRequests.filter(
      (r) => r.status === 'active' && r.urgency === 'emergency'
    ).length;
    const verifiedDonorsCount = this.store.donors.filter((d) => d.isVerified).length;

    return {
      totalDonors,
      activeDonors,
      totalRequests,
      completedDonations,
      emergencyRequests,
      verifiedDonorsCount,
    };
  }

  // Users & Auth
  getUsers(): User[] {
    return this.store.users;
  }

  getUserById(id: string): User | undefined {
    return this.store.users.find((u) => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.store.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  addUser(user: User): User {
    this.store.users.unshift(user);
    return user;
  }

  // Donors
  getDonors(filters?: {
    bloodGroup?: string;
    division?: string;
    district?: string;
    upazila?: string;
    availability?: string;
    search?: string;
  }): Donor[] {
    let result = [...this.store.donors];

    if (filters) {
      if (filters.bloodGroup && filters.bloodGroup !== 'ALL') {
        result = result.filter((d) => d.bloodGroup === filters.bloodGroup);
      }
      if (filters.division && filters.division !== 'ALL') {
        result = result.filter(
          (d) => d.division.toLowerCase() === filters.division?.toLowerCase()
        );
      }
      if (filters.district && filters.district !== 'ALL') {
        result = result.filter(
          (d) => d.district.toLowerCase() === filters.district?.toLowerCase()
        );
      }
      if (filters.upazila && filters.upazila !== 'ALL') {
        result = result.filter(
          (d) => d.upazila.toLowerCase() === filters.upazila?.toLowerCase()
        );
      }
      if (filters.availability && filters.availability !== 'ALL') {
        result = result.filter((d) => d.availability === filters.availability);
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (d) =>
            d.fullName.toLowerCase().includes(query) ||
            d.district.toLowerCase().includes(query) ||
            d.area.toLowerCase().includes(query) ||
            d.bloodGroup.toLowerCase().includes(query)
        );
      }
    }

    return result;
  }

  getDonorById(id: string): Donor | undefined {
    return this.store.donors.find((d) => d.id === id);
  }

  addDonor(donor: Donor): Donor {
    this.store.donors.unshift(donor);
    return donor;
  }

  updateDonor(id: string, updates: Partial<Donor>): Donor | undefined {
    const index = this.store.donors.findIndex((d) => d.id === id);
    if (index === -1) return undefined;
    this.store.donors[index] = { ...this.store.donors[index], ...updates };
    return this.store.donors[index];
  }

  deleteDonor(id: string): boolean {
    const initialLen = this.store.donors.length;
    this.store.donors = this.store.donors.filter((d) => d.id !== id);
    return this.store.donors.length < initialLen;
  }

  // Blood Requests
  getRequests(filters?: {
    status?: string;
    urgency?: string;
    bloodGroup?: string;
    district?: string;
  }): BloodRequest[] {
    let list = [...this.store.bloodRequests];

    if (filters) {
      if (filters.status && filters.status !== 'ALL') {
        list = list.filter((r) => r.status === filters.status);
      }
      if (filters.urgency && filters.urgency !== 'ALL') {
        list = list.filter((r) => r.urgency === filters.urgency);
      }
      if (filters.bloodGroup && filters.bloodGroup !== 'ALL') {
        list = list.filter((r) => r.bloodGroup === filters.bloodGroup);
      }
      if (filters.district && filters.district !== 'ALL') {
        list = list.filter((r) => r.district.toLowerCase() === filters.district?.toLowerCase());
      }
    }

    return list;
  }

  getRequestById(id: string): BloodRequest | undefined {
    return this.store.bloodRequests.find((r) => r.id === id);
  }

  addRequest(request: BloodRequest): BloodRequest {
    this.store.bloodRequests.unshift(request);

    // Auto-create notification for matching donors
    const matchedCount = this.store.donors.filter(
      (d) => d.bloodGroup === request.bloodGroup && d.district.toLowerCase() === request.district.toLowerCase()
    ).length;
    request.matchedDonorsCount = matchedCount;

    if (request.urgency === 'emergency') {
      this.addNotification({
        id: `notif-${Date.now()}`,
        titleBn: `🚨 জরুরি রক্তের প্রয়োজন: ${request.bloodGroup}`,
        titleEn: `🚨 Urgent Blood Request: ${request.bloodGroup}`,
        messageBn: `${request.hospitalName}-এ ${request.patientName} এর জন্য ${request.numberOfBags} ব্যাগ ${request.bloodGroup} রক্ত প্রয়োজন।`,
        messageEn: `${request.numberOfBags} bag(s) of ${request.bloodGroup} blood urgently needed at ${request.hospitalName}.`,
        type: 'emergency',
        isRead: false,
        createdAt: new Date().toISOString(),
        link: '/blood-requests',
      });
    }

    return request;
  }

  updateRequestStatus(id: string, status: BloodRequest['status']): BloodRequest | undefined {
    const req = this.store.bloodRequests.find((r) => r.id === id);
    if (!req) return undefined;
    req.status = status;
    return req;
  }

  // Safe Contact Requests
  getContactRequestsForDonor(donorId: string): SafeContactRequest[] {
    return this.store.contactRequests.filter((c) => c.donorId === donorId);
  }

  addContactRequest(req: SafeContactRequest): SafeContactRequest {
    this.store.contactRequests.unshift(req);

    // Create notification for donor
    this.addNotification({
      id: `notif-${Date.now()}`,
      donorId: req.donorId,
      titleBn: 'নতুন রক্তের যোগাযোগের আবেদন',
      titleEn: 'New Safe Blood Contact Request',
      messageBn: `${req.requesterName} আপনার কাছে ${req.bloodGroupNeeded} রক্তের জন্য নিরাপদ যোগাযোগের আবেদন জানিয়েছেন (${req.hospitalName})।`,
      messageEn: `${req.requesterName} requested to connect for ${req.bloodGroupNeeded} blood at ${req.hospitalName}.`,
      type: 'request',
      isRead: false,
      createdAt: new Date().toISOString(),
      link: '/donor-dashboard',
    });

    return req;
  }

  updateContactRequestStatus(id: string, status: 'accepted' | 'declined'): SafeContactRequest | undefined {
    const item = this.store.contactRequests.find((c) => c.id === id);
    if (!item) return undefined;
    item.status = status;
    if (status === 'accepted') {
      const donor = this.getDonorById(item.donorId);
      if (donor) {
        item.revealedPhone = donor.phone;
      }
    }
    return item;
  }

  // Notifications
  getNotifications(): NotificationItem[] {
    return this.store.notifications;
  }

  addNotification(notif: NotificationItem): NotificationItem {
    this.store.notifications.unshift(notif);
    return notif;
  }

  markNotificationAsRead(id: string): void {
    const notif = this.store.notifications.find((n) => n.id === id);
    if (notif) notif.isRead = true;
  }

  // Reports
  getReports(): ReportItem[] {
    return this.store.reports;
  }

  addReport(report: ReportItem): ReportItem {
    this.store.reports.unshift(report);
    return report;
  }

  updateReportStatus(id: string, status: ReportItem['status'], adminNotes?: string): ReportItem | undefined {
    const rep = this.store.reports.find((r) => r.id === id);
    if (!rep) return undefined;
    rep.status = status;
    if (adminNotes) rep.adminNotes = adminNotes;
    return rep;
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return this.store.auditLogs;
  }

  addAuditLog(log: AuditLog): void {
    this.store.auditLogs.unshift(log);
  }

  // Stories
  getSuccessStories(): SuccessStory[] {
    return this.store.successStories;
  }

  likeStory(id: string): number {
    const story = this.store.successStories.find((s) => s.id === id);
    if (story) {
      story.likes += 1;
      return story.likes;
    }
    return 0;
  }
}

export const db = new DatabaseManager();
