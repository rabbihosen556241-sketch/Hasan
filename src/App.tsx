import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BloodGroupSection } from './components/BloodGroupSection';
import { EmergencySection } from './components/EmergencySection';
import { FindDonorView } from './components/FindDonorView';
import { BloodRequestsView } from './components/BloodRequestsView';
import { BloodGuideSection } from './components/BloodGuideSection';
import { CompatibilityMatrixSection } from './components/CompatibilityMatrixSection';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { HowItWorks } from './components/HowItWorks';
import { FAQSection } from './components/FAQSection';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { SafeContactModal } from './components/SafeContactModal';
import { DonorRegistrationModal } from './components/DonorRegistrationModal';
import { CreateRequestModal } from './components/CreateRequestModal';
import { ReportModal } from './components/ReportModal';
import { RunGuideModal } from './components/RunGuideModal';
import { api } from './services/api';
import {
  Donor,
  BloodRequest,
  NotificationItem,
  PlatformStatistics,
  SuccessStory,
} from './types';
import { BloodGroup } from './data/bloodGroups';

function AppContent() {
  const { language, t } = useLanguage();
  const { role } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<string>('home');
  const [stats, setStats] = useState<PlatformStatistics>({
    totalDonors: 148,
    activeDonors: 112,
    totalRequests: 84,
    completedDonations: 395,
    emergencyRequests: 3,
    verifiedDonorsCount: 94,
  });

  const [donors, setDonors] = useState<Donor[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);

  // Search filter presets passed from Hero or Blood Group cards
  const [searchPresetGroup, setSearchPresetGroup] = useState<string>('ALL');
  const [searchPresetDistrict, setSearchPresetDistrict] = useState<string>('ALL');

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [isRunGuideOpen, setIsRunGuideOpen] = useState(false);
  const [contactDonorTarget, setContactDonorTarget] = useState<Donor | null>(null);
  const [reportTarget, setReportTarget] = useState<{
    targetId: string;
    targetTitle: string;
    reportedType: 'donor' | 'request' | 'user';
  } | null>(null);

  // Load initial data
  const fetchData = async () => {
    try {
      const [statsData, donorsData, requestsData, notifsData, storiesData] = await Promise.all([
        api.getStats(),
        api.getDonors(),
        api.getRequests(),
        api.getNotifications(),
        api.getStories(),
      ]);
      setStats(statsData);
      setDonors(donorsData);
      setRequests(requestsData);
      setNotifications(notifsData);
      setStories(storiesData);
    } catch (e) {
      console.error('Failed to load initial data:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handler from Hero Search form
  const handleHeroSearch = (filters: { bloodGroup?: string; district?: string }) => {
    setSearchPresetGroup(filters.bloodGroup || 'ALL');
    setSearchPresetDistrict(filters.district || 'ALL');
    setActiveTab('find-donor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler when clicking Blood Group Card
  const handleSelectBloodGroupCard = (group: BloodGroup) => {
    setSearchPresetGroup(group);
    setSearchPresetDistrict('ALL');
    setActiveTab('find-donor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for notification click
  const handleNotificationClick = async (notif: NotificationItem) => {
    await api.markNotificationRead(notif.id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    if (notif.type === 'emergency' || notif.type === 'match') {
      setActiveTab('emergency');
    } else if (notif.type === 'request') {
      setActiveTab('dashboard');
    }
  };

  // Donor counts for blood group cards
  const donorCounts = (donors || []).reduce((acc, curr) => {
    if (curr && curr.bloodGroup) {
      acc[curr.bloodGroup] = (acc[curr.bloodGroup] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const emergencyRequests = (requests || []).filter(
    (r) => r && r.status === 'active' && r.urgency === 'emergency'
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white">
      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openDonorRegister={() => setIsRegisterOpen(true)}
        openCreateRequest={() => setIsCreateRequestOpen(true)}
        openRunGuide={() => setIsRunGuideOpen(true)}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              stats={stats}
              onSearch={handleHeroSearch}
              onOpenRegister={() => setIsRegisterOpen(true)}
              onOpenFindDonor={() => setActiveTab('find-donor')}
              onOpenCreateRequest={() => setIsCreateRequestOpen(true)}
            />

            {/* Emergency Blood Alerts Highlight */}
            {emergencyRequests.length > 0 && (
              <EmergencySection
                emergencyRequests={emergencyRequests}
                onOpenCreateRequest={() => setIsCreateRequestOpen(true)}
              />
            )}

            {/* 8 Blood Group Cards with Bengali Names */}
            <BloodGroupSection
              onSelectGroup={handleSelectBloodGroupCard}
              donorCounts={donorCounts}
            />

            {/* How it works: 3 Steps */}
            <HowItWorks />

            {/* Stories teaser */}
            <SuccessStoriesSection
              stories={stories}
              onOpenCreateRequest={() => setIsCreateRequestOpen(true)}
            />

            {/* FAQ Section */}
            <FAQSection />
          </>
        )}

        {activeTab === 'find-donor' && (
          <FindDonorView
            donors={donors}
            initialBloodGroup={searchPresetGroup}
            initialDistrict={searchPresetDistrict}
            onOpenSafeContact={(donor) => setContactDonorTarget(donor)}
            onOpenReport={(targetId, targetTitle, type) =>
              setReportTarget({ targetId, targetTitle, reportedType: type })
            }
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
        )}

        {activeTab === 'emergency' && (
          <div className="py-8 bg-slate-50 min-h-screen">
            <EmergencySection
              emergencyRequests={emergencyRequests}
              onOpenCreateRequest={() => setIsCreateRequestOpen(true)}
            />
          </div>
        )}

        {activeTab === 'requests' && (
          <BloodRequestsView
            requests={requests}
            onOpenCreateRequest={() => setIsCreateRequestOpen(true)}
          />
        )}

        {activeTab === 'guide' && <BloodGuideSection />}

        {activeTab === 'compatibility' && <CompatibilityMatrixSection />}

        {activeTab === 'stories' && <SuccessStoriesSection stories={stories} />}

        {activeTab === 'dashboard' && (
          <UserDashboard
            onOpenCreateRequest={() => setIsCreateRequestOpen(true)}
            onOpenRegisterDonor={() => setIsRegisterOpen(true)}
          />
        )}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Modals */}
      {isRegisterOpen && (
        <DonorRegistrationModal
          onClose={() => setIsRegisterOpen(false)}
          onSuccess={(newDonor) => {
            setIsRegisterOpen(false);
            setDonors((prev) => [newDonor, ...prev]);
            setStats((prev) => ({
              ...prev,
              totalDonors: prev.totalDonors + 1,
              activeDonors: prev.activeDonors + 1,
            }));
            showToast(
              language === 'bn'
                ? 'রক্তদাতা হিসেবে নিবন্ধন সফল হয়েছে! ধন্যবাদ।'
                : 'Registered as blood donor successfully! Thank you.',
              'success'
            );
            setActiveTab('find-donor');
          }}
        />
      )}

      {isCreateRequestOpen && (
        <CreateRequestModal
          onClose={() => setIsCreateRequestOpen(false)}
          onSuccess={(newReq) => {
            setIsCreateRequestOpen(false);
            setRequests((prev) => [newReq, ...prev]);
            setStats((prev) => ({
              ...prev,
              totalRequests: prev.totalRequests + 1,
              emergencyRequests:
                newReq.urgency === 'emergency'
                  ? prev.emergencyRequests + 1
                  : prev.emergencyRequests,
            }));
            showToast(
              language === 'bn'
                ? 'রক্তের অনুরোধ সফলভাবে পোস্ট করা হয়েছে!'
                : 'Blood request posted successfully!',
              'success'
            );
            if (newReq.urgency === 'emergency') {
              setActiveTab('emergency');
            } else {
              setActiveTab('requests');
            }
          }}
        />
      )}

      {contactDonorTarget && (
        <SafeContactModal
          donor={contactDonorTarget}
          onClose={() => setContactDonorTarget(null)}
          onSuccess={() => {
            showToast(
              language === 'bn'
                ? 'যোগাযোগের আবেদন রক্তদাতার কাছে পাঠানো হয়েছে!'
                : 'Connection request sent to donor!',
              'success'
            );
          }}
        />
      )}

      {reportTarget && (
        <ReportModal
          targetId={reportTarget.targetId}
          targetTitle={reportTarget.targetTitle}
          reportedType={reportTarget.reportedType}
          onClose={() => setReportTarget(null)}
          onSuccess={() => {
            showToast(
              language === 'bn' ? 'রিপোর্ট গ্রহণ করা হয়েছে।' : 'Report received.',
              'info'
            );
            setReportTarget(null);
          }}
        />
      )}

      {isRunGuideOpen && (
        <RunGuideModal onClose={() => setIsRunGuideOpen(false)} />
      )}

      {/* Footer */}
      <Footer
        onOpenRunGuide={() => setIsRunGuideOpen(true)}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
