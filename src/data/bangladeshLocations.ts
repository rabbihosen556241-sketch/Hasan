// Bangladesh Divisions, Districts, and Upazilas/Areas data

export interface DistrictInfo {
  nameEn: string;
  nameBn: string;
  upazilas: { nameEn: string; nameBn: string }[];
}

export interface DivisionInfo {
  id: string;
  nameEn: string;
  nameBn: string;
  districts: DistrictInfo[];
}

export const BANGLADESH_LOCATIONS: DivisionInfo[] = [
  {
    id: 'dhaka',
    nameEn: 'Dhaka',
    nameBn: 'ঢাকা',
    districts: [
      {
        nameEn: 'Dhaka',
        nameBn: 'ঢাকা',
        upazilas: [
          { nameEn: 'Dhanmondi', nameBn: 'ধানমন্ডি' },
          { nameEn: 'Mirpur', nameBn: 'মিরপুর' },
          { nameEn: 'Uttara', nameBn: 'উত্তরা' },
          { nameEn: 'Gulshan', nameBn: 'গুলশান' },
          { nameEn: 'Banani', nameBn: 'বনানী' },
          { nameEn: 'Mohammadpur', nameBn: 'মোহাম্মদপুর' },
          { nameEn: 'Badda', nameBn: 'বাড্ডা' },
          { nameEn: 'Motijheel', nameBn: 'মতিঝিল' },
          { nameEn: 'Old Dhaka', nameBn: 'পুরান ঢাকা' },
          { nameEn: 'Shahbagh', nameBn: 'শাহবাগ' },
          { nameEn: 'Savar', nameBn: 'সাভার' },
          { nameEn: 'Keraniganj', nameBn: 'কেরানীগঞ্জ' },
          { nameEn: 'Dhamrai', nameBn: 'ধামরাই' },
        ],
      },
      {
        nameEn: 'Gazipur',
        nameBn: 'গাজীপুর',
        upazilas: [
          { nameEn: 'Gazipur Sadar', nameBn: 'গাজীপুর সদর' },
          { nameEn: 'Tongi', nameBn: 'টঙ্গী' },
          { nameEn: 'Kaliakair', nameBn: 'কালিয়াকৈর' },
          { nameEn: 'Kapasia', nameBn: 'কাপাসিয়া' },
          { nameEn: 'Sreepur', nameBn: 'শ্রীপুর' },
        ],
      },
      {
        nameEn: 'Narayanganj',
        nameBn: 'নারায়ণগঞ্জ',
        upazilas: [
          { nameEn: 'Narayanganj Sadar', nameBn: 'নারায়ণগঞ্জ সদর' },
          { nameEn: 'Fatullah', nameBn: 'ফতুল্লা' },
          { nameEn: 'Siddhirganj', nameBn: 'সিদ্ধিরগঞ্জ' },
          { nameEn: 'Bandar', nameBn: 'বন্দর' },
          { nameEn: 'Rupganj', nameBn: 'রূপগঞ্জ' },
          { nameEn: 'Sonargaon', nameBn: 'সোনারগাঁও' },
        ],
      },
      {
        nameEn: 'Tangail',
        nameBn: 'টাঙ্গাইল',
        upazilas: [
          { nameEn: 'Tangail Sadar', nameBn: 'টাঙ্গাইল সদর' },
          { nameEn: 'Mirzapur', nameBn: 'মির্জাপুর' },
          { nameEn: 'Madhupur', nameBn: 'মধুপুর' },
          { nameEn: 'Gopalpur', nameBn: 'গোপালপুর' },
        ],
      },
      {
        nameEn: 'Faridpur',
        nameBn: 'ফরিদপুর',
        upazilas: [
          { nameEn: 'Faridpur Sadar', nameBn: 'ফরিদপুর সদর' },
          { nameEn: 'Boalmari', nameBn: 'বোয়ালমারী' },
          { nameEn: 'Bhanga', nameBn: 'ভাঙ্গা' },
        ],
      },
    ],
  },
  {
    id: 'chattogram',
    nameEn: 'Chattogram',
    nameBn: 'চট্টগ্রাম',
    districts: [
      {
        nameEn: 'Chattogram',
        nameBn: 'চট্টগ্রাম',
        upazilas: [
          { nameEn: 'Agrabad', nameBn: 'আগ্রাবাদ' },
          { nameEn: 'Nasirabad', nameBn: 'নাসিরাবাদ' },
          { nameEn: 'Halishahar', nameBn: 'হালিশহর' },
          { nameEn: 'Panchlaish', nameBn: 'পাঁচলাইশ' },
          { nameEn: 'GEC Circle', nameBn: 'জিইসি মোড়' },
          { nameEn: 'Kotwali', nameBn: 'কোতোয়ালী' },
          { nameEn: 'Hathazari', nameBn: 'হাটহাজারী' },
          { nameEn: 'Raozan', nameBn: 'রাউজান' },
          { nameEn: 'Sitakunda', nameBn: 'সীতাকুণ্ড' },
        ],
      },
      {
        nameEn: 'Cox\'s Bazar',
        nameBn: 'কক্সবাজার',
        upazilas: [
          { nameEn: 'Cox\'s Bazar Sadar', nameBn: 'কক্সবাজার সদর' },
          { nameEn: 'Ramu', nameBn: 'রামু' },
          { nameEn: 'Teknaf', nameBn: 'টেকনাফ' },
          { nameEn: 'Chakaria', nameBn: 'চকরিয়া' },
        ],
      },
      {
        nameEn: 'Cumilla',
        nameBn: 'কুমিল্লা',
        upazilas: [
          { nameEn: 'Cumilla Adarsha Sadar', nameBn: 'কুমিল্লা আদর্শ সদর' },
          { nameEn: 'Laksam', nameBn: 'লাকসাম' },
          { nameEn: 'Debidwar', nameBn: 'দেবিদ্বার' },
          { nameEn: 'Chandina', nameBn: 'চান্দিনা' },
        ],
      },
      {
        nameEn: 'Noakhali',
        nameBn: 'নোয়াখালী',
        upazilas: [
          { nameEn: 'Noakhali Sadar', nameBn: 'নোয়াখালী সদর' },
          { nameEn: 'Begumganj', nameBn: 'বেগমগঞ্জ' },
          { nameEn: 'Chatkhil', nameBn: 'চাটখিল' },
        ],
      },
      {
        nameEn: 'Feni',
        nameBn: 'ফেনী',
        upazilas: [
          { nameEn: 'Feni Sadar', nameBn: 'ফেনী সদর' },
          { nameEn: 'Daganbhuiyan', nameBn: 'দাগনভূঞা' },
          { nameEn: 'Parshuram', nameBn: 'পরশুরাম' },
        ],
      },
    ],
  },
  {
    id: 'sylhet',
    nameEn: 'Sylhet',
    nameBn: 'সিলেট',
    districts: [
      {
        nameEn: 'Sylhet',
        nameBn: 'সিলেট',
        upazilas: [
          { nameEn: 'Sylhet Sadar', nameBn: 'সিলেট সদর' },
          { nameEn: 'Zindabazar', nameBn: 'জিন্দাবাজার' },
          { nameEn: 'Ambarkhana', nameBn: 'আম্বরখানা' },
          { nameEn: 'Beanibazar', nameBn: 'বিয়ানীবাজার' },
          { nameEn: 'Golapganj', nameBn: 'গোলাপগঞ্জ' },
        ],
      },
      {
        nameEn: 'Moulvibazar',
        nameBn: 'মৌলভীবাজার',
        upazilas: [
          { nameEn: 'Moulvibazar Sadar', nameBn: 'মৌলভীবাজার সদর' },
          { nameEn: 'Sreemangal', nameBn: 'শ্রীমঙ্গল' },
          { nameEn: 'Kulaura', nameBn: 'কুলাউড়া' },
        ],
      },
      {
        nameEn: 'Habiganj',
        nameBn: 'হবিগঞ্জ',
        upazilas: [
          { nameEn: 'Habiganj Sadar', nameBn: 'হবিগঞ্জ সদর' },
          { nameEn: 'Madhabpur', nameBn: 'মাধবপুর' },
          { nameEn: 'Nabiganj', nameBn: 'নবীগঞ্জ' },
        ],
      },
    ],
  },
  {
    id: 'rajshahi',
    nameEn: 'Rajshahi',
    nameBn: 'রাজশাহী',
    districts: [
      {
        nameEn: 'Rajshahi',
        nameBn: 'রাজশাহী',
        upazilas: [
          { nameEn: 'Boalia', nameBn: 'বোয়ালিয়া' },
          { nameEn: 'Motihar', nameBn: 'মতিহার' },
          { nameEn: 'Rajpara', nameBn: 'রাজপাড়া' },
          { nameEn: 'Paba', nameBn: 'পবা' },
          { nameEn: 'Godagari', nameBn: 'গোদাগাড়ী' },
        ],
      },
      {
        nameEn: 'Bogura',
        nameBn: 'বগুড়া',
        upazilas: [
          { nameEn: 'Bogura Sadar', nameBn: 'বগুড়া সদর' },
          { nameEn: 'Sherpur', nameBn: 'শেরপুর' },
          { nameEn: 'Shibganj', nameBn: 'শিবগঞ্জ' },
        ],
      },
      {
        nameEn: 'Pabna',
        nameBn: 'পাবনা',
        upazilas: [
          { nameEn: 'Pabna Sadar', nameBn: 'পাবনা সদর' },
          { nameEn: 'Ishwardi', nameBn: 'ঈশ্বরদী' },
        ],
      },
    ],
  },
  {
    id: 'khulna',
    nameEn: 'Khulna',
    nameBn: 'খুলনা',
    districts: [
      {
        nameEn: 'Khulna',
        nameBn: 'খুলনা',
        upazilas: [
          { nameEn: 'Khulna Sadar', nameBn: 'খুলনা সদর' },
          { nameEn: 'Sonadanga', nameBn: 'সোনাডাঙ্গা' },
          { nameEn: 'Khalishpur', nameBn: 'খালিশপুর' },
          { nameEn: 'Daulatpur', nameBn: 'দৌলতপুর' },
          { nameEn: 'Rupsha', nameBn: 'রূপসা' },
        ],
      },
      {
        nameEn: 'Jashore',
        nameBn: 'যশোর',
        upazilas: [
          { nameEn: 'Jashore Sadar', nameBn: 'যশোর সদর' },
          { nameEn: 'Jhikargacha', nameBn: 'ঝিকরগাছা' },
          { nameEn: 'Keshabpur', nameBn: 'কেশবপুর' },
        ],
      },
      {
        nameEn: 'Kushtia',
        nameBn: 'কুষ্টিয়া',
        upazilas: [
          { nameEn: 'Kushtia Sadar', nameBn: 'কুষ্টিয়া সদর' },
          { nameEn: 'Kumarkhali', nameBn: 'কুমারখালী' },
        ],
      },
    ],
  },
  {
    id: 'barishal',
    nameEn: 'Barishal',
    nameBn: 'বরিশাল',
    districts: [
      {
        nameEn: 'Barishal',
        nameBn: 'বরিশাল',
        upazilas: [
          { nameEn: 'Barishal Sadar', nameBn: 'বরিশাল সদর' },
          { nameEn: 'Babuganj', nameBn: 'বাবুগঞ্জ' },
          { nameEn: 'Bakerganj', nameBn: 'বাকেরগঞ্জ' },
        ],
      },
      {
        nameEn: 'Patuakhali',
        nameBn: 'পটুয়াখালী',
        upazilas: [
          { nameEn: 'Patuakhali Sadar', nameBn: 'পটুয়াখালী সদর' },
          { nameEn: 'Kuakata', nameBn: 'কুয়াকাটা' },
        ],
      },
    ],
  },
  {
    id: 'rangpur',
    nameEn: 'Rangpur',
    nameBn: 'রংপুর',
    districts: [
      {
        nameEn: 'Rangpur',
        nameBn: 'রংপুর',
        upazilas: [
          { nameEn: 'Rangpur Sadar', nameBn: 'রংপুর সদর' },
          { nameEn: 'Pirganj', nameBn: 'পীরগঞ্জ' },
          { nameEn: 'Badarganj', nameBn: 'বদরগঞ্জ' },
        ],
      },
      {
        nameEn: 'Dinajpur',
        nameBn: 'দিনাজপুর',
        upazilas: [
          { nameEn: 'Dinajpur Sadar', nameBn: 'দিনাজপুর সদর' },
          { nameEn: 'Birganj', nameBn: 'বীরগঞ্জ' },
        ],
      },
    ],
  },
  {
    id: 'mymensingh',
    nameEn: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    districts: [
      {
        nameEn: 'Mymensingh',
        nameBn: 'ময়মনসিংহ',
        upazilas: [
          { nameEn: 'Mymensingh Sadar', nameBn: 'ময়মনসিংহ সদর' },
          { nameEn: 'Muktagacha', nameBn: 'মুক্তাগাছা' },
          { nameEn: 'Trishal', nameBn: 'ত্রিশাল' },
          { nameEn: 'Bhaluka', nameBn: 'ভালুকা' },
        ],
      },
      {
        nameEn: 'Jamalpur',
        nameBn: 'জামালপুর',
        upazilas: [
          { nameEn: 'Jamalpur Sadar', nameBn: 'জামালপুর সদর' },
          { nameEn: 'Sarishabari', nameBn: 'সরিষাবাড়ী' },
        ],
      },
    ],
  },
];
