import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SafeContactRequest, BloodRequest, Donor } from '../types';
import { api } from '../services/api';
import {
  User,
  Heart,
  Droplet,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Calendar,
  Hospital,
  AlertCircle,
  Save,
} from 'lucide-react';

interface UserDashboardProps {
  onOpenCreateRequest: () => void;
  onOpenRegisterDonor: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onOpenCreateRequest,
  onOpenRegisterDonor,
}) => {
  const { language, t } = useLanguage();
  const { user, role } = useAuth();
  const { showToast } = useToast();

  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'requests' | 'contact_requests' | 'history'>('profile');
  const [incomingContactRequests, setIncomingContactRequests] = useState<SafeContactRequest[]>([]);
  const [myBloodRequests, setMyBloodRequests] = useState<BloodRequest[]>([]);
  const [donorProfile, setDonorProfile] = useState<Donor | null>(null);
  const [availability, setAvailability] = useState<string>('available');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load incoming safe contact requests if user is a donor
  useEffect(() => {
    if (user?.donorId) {
      api.getContactRequestsForDonor(user.donorId).then(setIncomingContactRequests);
      api.getDonorById(user.donorId).then((d) => {
        if (d) {
          setDonorProfile(d);
          setAvailability(d.availability || 'available');
        }
      });
    }
    // Fetch requests created by this user
    api.getRequests().then((allReqs) => {
      const uName = (user?.name || '').toLowerCase();
      setMyBloodRequests(
        allReqs.filter(
          (r) =>
            (user?.id && r.requesterId === user.id) ||
            (uName && r.contactPerson && r.contactPerson.toLowerCase().includes(uName))
        )
      );
    });
  }, [user]);

  const handleContactStatus = async (contactId: string, status: 'accepted' | 'declined') => {
    try {
      const updated = await api.updateContactRequestStatus(contactId, status);
      setIncomingContactRequests((prev) =>
        prev.map((c) => (c.id === contactId ? updated : c))
      );
      showToast(
        status === 'accepted'
          ? (language === 'bn' ? 'আবেদন গ্রহণ করা হয়েছে! যোগাযোগ নম্বর প্রকাশ হয়েছে।' : 'Request accepted! Contact revealed.')
          : (language === 'bn' ? 'আবেদন প্রত্যাখ্যান করা হয়েছে।' : 'Request declined.'),
        status === 'accepted' ? 'success' : 'info'
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateAvailability = async () => {
    if (!user?.donorId) return;
    try {
      await fetch(`/api/donors/${user.donorId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availability }),
      });
      if (donorProfile) {
        setDonorProfile({ ...donorProfile, availability: availability as any });
      }
      setSaveSuccess(true);
      showToast(
        language === 'bn' ? 'উপলব্ধতা স্ট্যাটাস সংরক্ষিত হয়েছে!' : 'Availability status saved!',
        'success'
      );
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
              }
              alt={user?.name || 'User'}
              className="w-16 h-16 rounded-full object-cover border-2 border-red-200 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-slate-900">{user?.name || 'User Profile'}</h1>
                {user?.isVerified && (
                  <span className="text-blue-600 inline-flex items-center" title="Verified">
                    <ShieldCheck className="w-5 h-5 fill-blue-600 text-white" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user?.phone} • {user?.email}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-red-50 text-red-700">
                {role === 'donor'
                  ? (language === 'bn' ? '🩸 রক্তদাতা প্রোফাইল' : '🩸 Donor Account')
                  : role === 'admin'
                  ? (language === 'bn' ? '🛡️ অ্যাডমিনিস্ট্রেটর' : '🛡️ Administrator')
                  : (language === 'bn' ? '👤 সাধারণ সদস্য' : '👤 Regular Member')}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {role !== 'donor' && (
              <button
                onClick={onOpenRegisterDonor}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{language === 'bn' ? 'রক্তদাতা হিসেবে সক্রিয় হন' : 'Activate Donor Profile'}</span>
              </button>
            )}
            <button
              onClick={onOpenCreateRequest}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Droplet className="w-4 h-4 fill-white" />
              <span>{t('btnCreateRequest')}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Sub-Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === 'profile'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{t('myProfile')}</span>
          </button>

          {role === 'donor' && (
            <button
              onClick={() => setActiveSubTab('contact_requests')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                activeSubTab === 'contact_requests'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>
                {language === 'bn' ? 'যোগাযোগের আবেদন' : 'Contact Requests'}
                {incomingContactRequests.filter((c) => c.status === 'pending').length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px]">
                    {incomingContactRequests.filter((c) => c.status === 'pending').length}
                  </span>
                )}
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveSubTab('requests')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === 'requests'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'আমার রক্তের আবেদন' : 'My Blood Requests'}</span>
          </button>
        </div>

        {/* Tab 1: Profile & Availability Settings */}
        {activeSubTab === 'profile' && (
          <div className="space-y-6">
            {role === 'donor' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>{language === 'bn' ? 'রক্তদান উপলব্ধতা স্ট্যাটাস (Availability)' : 'Blood Donation Availability'}</span>
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full sm:w-72 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >
                    <option value="available">🟢 {t('available')}</option>
                    <option value="temporarily_unavailable">🟡 {t('temporarily_unavailable')}</option>
                    <option value="not_available">🔴 {t('not_available')}</option>
                  </select>

                  <button
                    onClick={handleUpdateAvailability}
                    className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{t('save')}</span>
                  </button>

                  {saveSuccess && (
                    <span className="text-xs font-semibold text-emerald-600">
                      ✓ {language === 'bn' ? 'স্ট্যাটাস আপডেট হয়েছে' : 'Status updated!'}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Account Details Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                {language === 'bn' ? 'অ্যাকাউন্টের বিবরণ' : 'Account Information'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-semibold mb-0.5">{language === 'bn' ? 'নাম' : 'Name'}</span>
                  <span className="font-bold text-slate-800">{user?.name}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-semibold mb-0.5">{language === 'bn' ? 'ফোন নম্বর' : 'Phone'}</span>
                  <span className="font-bold text-slate-800">{user?.phone}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-semibold mb-0.5">{language === 'bn' ? 'ইমেইল' : 'Email'}</span>
                  <span className="font-bold text-slate-800">{user?.email}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-semibold mb-0.5">{language === 'bn' ? 'নিবন্ধন তারিখ' : 'Registered On'}</span>
                  <span className="font-bold text-slate-800">
                    {user?.createdAt ? user.createdAt.split('T')[0] : '২০২৬-০১-১৫'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Incoming Contact Requests (Donor Safe Connect) */}
        {activeSubTab === 'contact_requests' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {language === 'bn' ? 'আগত নিরাপদ রক্তদানের যোগাযোগের আবেদন' : 'Incoming Safe Connection Requests'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {language === 'bn'
                ? 'রক্তপ্রার্থীর আবেদন গ্রহণ (Accept) করলে আপনার ফোন নম্বর তার সাথে শেয়ার করা হবে।'
                : 'Accepting a request securely reveals your phone number to the patient family.'}
            </p>

            {incomingContactRequests.length === 0 ? (
              <p className="text-center text-xs text-slate-500 py-8">
                {language === 'bn' ? 'বর্তমানে কোনো নতুন যোগাযোগের আবেদন নেই' : 'No incoming requests at this time'}
              </p>
            ) : (
              <div className="space-y-4">
                {incomingContactRequests.map((cr) => (
                  <div
                    key={cr.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="text-xs space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">{cr.requesterName}</span>
                        <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                          {cr.bloodGroupNeeded} রক্ত প্রয়োজন
                        </span>
                      </div>
                      <p className="text-slate-600">
                        <strong>রোগী:</strong> {cr.patientName} • <strong>হাসপাতাল:</strong> {cr.hospitalName}
                      </p>
                      {cr.message && <p className="italic text-slate-500">&quot;{cr.message}&quot;</p>}
                      <p className="text-[11px] text-slate-400">
                        আবেদনের সময়: {cr.createdAt ? cr.createdAt.split('T')[0] : ''}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {cr.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleContactStatus(cr.id, 'accepted')}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t('accept')}</span>
                          </button>
                          <button
                            onClick={() => handleContactStatus(cr.id, 'declined')}
                            className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>{t('decline')}</span>
                          </button>
                        </>
                      ) : cr.status === 'accepted' ? (
                        <div className="text-right">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold inline-block mb-1">
                            ✓ গৃহীত (Accepted)
                          </span>
                          <a
                            href={`tel:${cr.requesterPhone}`}
                            className="block text-xs font-bold text-red-600 hover:underline"
                          >
                            📞 রোগীর পরিবারে কল দিন: {cr.requesterPhone}
                          </a>
                        </div>
                      ) : (
                        <span className="px-2.5 py-1 bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold">
                          প্রত্যাখ্যাত
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: My Blood Requests */}
        {activeSubTab === 'requests' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'আমার রক্তের আবেদনসমূহ' : 'My Blood Requests'}
              </h3>
              <button
                onClick={onOpenCreateRequest}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                + {t('btnCreateRequest')}
              </button>
            </div>

            {myBloodRequests.length === 0 ? (
              <p className="text-center text-xs text-slate-500 py-8">
                {language === 'bn' ? 'আপনার কোনো রক্তের আবেদন নেই' : 'No active blood requests found'}
              </p>
            ) : (
              <div className="space-y-3">
                {myBloodRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">{req.patientName}</span>
                        <span className="px-2 py-0.5 bg-red-600 text-white rounded text-xs font-black">
                          {req.bloodGroup}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        {req.hospitalName} • {req.numberOfBags} ব্যাগ • {req.requiredDate}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        req.status === 'active'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {req.status === 'active' ? 'সক্রিয়' : 'সম্পন্ন'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
