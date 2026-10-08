import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Donor,
  BloodRequest,
  ReportItem,
  AuditLog,
  PlatformStatistics,
} from '../types';
import { api } from '../services/api';
import {
  ShieldCheck,
  Users,
  Droplet,
  AlertTriangle,
  FileText,
  CheckCircle2,
  XCircle,
  Flag,
  Activity,
  Trash2,
  Check,
  Search,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'donors' | 'requests' | 'reports' | 'logs'>('overview');
  const [stats, setStats] = useState<PlatformStatistics | null>(null);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      const [s, d, r, rep, logs] = await Promise.all([
        api.getStats(),
        api.getDonors(),
        api.getRequests(),
        api.getReports(),
        api.getAuditLogs(),
      ]);
      setStats(s);
      setDonors(d);
      setRequests(r);
      setReports(rep);
      setAuditLogs(logs);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVerifyDonor = async (donorId: string) => {
    try {
      await api.verifyDonor(donorId, user?.name || 'Admin');
      setDonors((prev) =>
        prev.map((d) => (d.id === donorId ? { ...d, isVerified: true } : d))
      );
      showToast(
        language === 'bn' ? 'রক্তদাতাকে ভেরিফায়েড করা হয়েছে! ✓' : 'Donor verified successfully! ✓',
        'success'
      );
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateRequestStatus = async (reqId: string, status: BloodRequest['status']) => {
    try {
      await api.updateRequestStatus(reqId, status, user?.name || 'Admin');
      setRequests((prev) =>
        prev.map((r) => (r.id === reqId ? { ...r, status } : r))
      );
      showToast(
        language === 'bn' ? 'আবেদনের স্ট্যাটাস পরিবর্তিত হয়েছে!' : 'Request status updated!',
        'success'
      );
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleResolveReport = async (repId: string, status: ReportItem['status']) => {
    try {
      await api.resolveReport(repId, status, 'Admin reviewed and resolved action.', user?.name || 'Admin');
      setReports((prev) =>
        prev.map((r) => (r.id === repId ? { ...r, status } : r))
      );
      showToast(
        language === 'bn' ? 'রিপোর্ট সমাধান করা হয়েছে!' : 'Report resolved!',
        'success'
      );
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {language === 'bn' ? 'কেন্দ্রীয় অ্যাডমিন কন্ট্রোল প্যানেল' : 'Central Admin Control Panel'}
                </h1>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {language === 'bn'
                  ? 'রক্তদাতা যাচাই, রক্তের আবেদন পরিচালনা ও অপব্যবহার নিয়ন্ত্রণ হাব'
                  : 'Manage donors, moderate requests, audit system events, and review reports'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: language === 'bn' ? 'সারসংক্ষেপ (Overview)' : 'Overview', icon: Activity },
            { id: 'donors', label: language === 'bn' ? `রক্তদাতা (${donors.length})` : `Donors (${donors.length})`, icon: Users },
            { id: 'requests', label: language === 'bn' ? `আবেদন (${requests.length})` : `Requests (${requests.length})`, icon: Droplet },
            { id: 'reports', label: language === 'bn' ? `অভিযোগ রিপোর্ট (${reports.length})` : `Reports (${reports.length})`, icon: Flag },
            { id: 'logs', label: language === 'bn' ? 'অডিট লগ (Audit Log)' : 'Audit Logs', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & Stats */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">মোট রক্তদাতা</span>
                <span className="text-2xl font-black text-slate-900">{stats.totalDonors}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block">সক্রিয় রক্তদাতা</span>
                <span className="text-2xl font-black text-emerald-700">{stats.activeDonors}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-blue-600 block">মোট আবেদন</span>
                <span className="text-2xl font-black text-slate-900">{stats.totalRequests}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-red-600 block">জরুরি আবেদন</span>
                <span className="text-2xl font-black text-red-600">{stats.emergencyRequests}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-purple-600 block">ভেরিফায়েড দাতা</span>
                <span className="text-2xl font-black text-purple-700">{stats.verifiedDonorsCount}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-600 block">মুলতুবি অভিযোগ</span>
                <span className="text-2xl font-black text-amber-700">
                  {reports.filter((r) => r.status === 'pending').length}
                </span>
              </div>
            </div>

            {/* Recent Audit Activities */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-slate-700" />
                <span>সাম্প্রতিক অ্যাডমিন ও সিস্টেম অডিট লগ</span>
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 mr-2">{log.action}:</span>
                      <span className="text-slate-600">{log.details}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0 ml-4">
                      {log.timestamp ? log.timestamp.split('T')[0] : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Donors */}
        {activeTab === 'donors' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'সকল নিবন্ধিত রক্তদাতা' : 'Registered Donors'}
              </h3>
              <input
                type="text"
                placeholder="রক্তদাতা খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-3 font-bold">নাম ও রক্তের গ্রুপ</th>
                    <th className="p-3 font-bold">জেলা ও এলাকা</th>
                    <th className="p-3 font-bold">ফোন নম্বর</th>
                    <th className="p-3 font-bold">মোট রক্তদান</th>
                    <th className="p-3 font-bold">স্ট্যাটাস</th>
                    <th className="p-3 font-bold">ভেরিফিকেশন</th>
                    <th className="p-3 font-bold text-right">পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {donors
                    .filter((d) => {
                      const q = searchTerm.toLowerCase();
                      return (
                        (d.fullName && d.fullName.toLowerCase().includes(q)) ||
                        (d.district && d.district.toLowerCase().includes(q)) ||
                        (d.bloodGroup && d.bloodGroup.toLowerCase().includes(q))
                      );
                    })
                    .map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50 transition">
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <img src={d.avatar} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="font-bold text-slate-900">{d.fullName}</p>
                              <span className="text-red-600 font-extrabold">{d.bloodGroup}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-slate-600">
                          {d.district} ({d.area})
                        </td>
                        <td className="p-3 font-mono text-slate-700">{d.phone}</td>
                        <td className="p-3 font-bold text-slate-800">{d.totalDonations} বার</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              d.availability === 'available'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {d.availability}
                          </span>
                        </td>
                        <td className="p-3">
                          {d.isVerified ? (
                            <span className="inline-flex items-center space-x-1 text-blue-600 font-bold">
                              <ShieldCheck className="w-4 h-4 fill-blue-600 text-white" />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className="text-amber-600 font-semibold text-[11px]">Unverified</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          {!d.isVerified && (
                            <button
                              onClick={() => handleVerifyDonor(d.id)}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] cursor-pointer"
                            >
                              ভেরিফাই করুন
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Manage Blood Requests */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              {language === 'bn' ? 'সকল রক্তের আবেদন নিয়ন্ত্রণ' : 'Manage Blood Requests'}
            </h3>
            <div className="space-y-3">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{r.patientName}</span>
                      <span className="px-2 py-0.5 bg-red-600 text-white rounded font-black text-[10px]">
                        {r.bloodGroup} ({r.numberOfBags} ব্যাগ)
                      </span>
                      {r.urgency === 'emergency' && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded font-bold text-[10px]">
                          জরুরি
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 mt-1">
                      {r.hospitalName} ({r.district}) • সময়: {r.requiredTime} ({r.requiredDate})
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      যোগাযোগ: {r.contactPerson} ({r.contactNumber})
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        r.status === 'active'
                          ? 'bg-amber-100 text-amber-800'
                          : r.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {r.status}
                    </span>
                    {r.status === 'active' && (
                      <button
                        onClick={() => handleUpdateRequestStatus(r.id, 'completed')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer"
                      >
                        সম্পন্ন চিহ্নিত করুন
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Review Reports */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              {language === 'bn' ? 'ব্যবহারকারীদের দাখিলকৃত অভিযোগ (Safety Reports)' : 'User Safety Reports'}
            </h3>
            {reports.length === 0 ? (
              <p className="text-center text-xs text-slate-500 py-8">কোনো অভিযোগ জমা নেই।</p>
            ) : (
              <div className="space-y-3 text-xs">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">{rep.targetTitle}</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded font-bold text-[10px]">
                          কারণ: {rep.reason}
                        </span>
                      </div>
                      <p className="text-slate-700 mt-1 italic">&quot;{rep.description}&quot;</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        অভিযোগকারী: {rep.reporterName} ({rep.reporterPhone || 'N/A'}) • সময়: {rep.createdAt ? rep.createdAt.split('T')[0] : ''}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {rep.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleResolveReport(rep.id, 'resolved')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer"
                          >
                            সমাধান করুন
                          </button>
                          <button
                            onClick={() => handleResolveReport(rep.id, 'reviewed')}
                            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer"
                          >
                            পর্যালোচনা হয়েছে
                          </button>
                        </>
                      ) : (
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg">
                          ✓ {rep.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Audit Logs */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              {language === 'bn' ? 'সিস্টেম অডিট লগ ট্রেইল' : 'System Audit Log Trail'}
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-start justify-between">
                  <div>
                    <span className="font-bold text-slate-900 mr-2 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {log.action}
                    </span>
                    <span className="text-slate-700">{log.details}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      অ্যাডমিন: {log.adminName} • আইপি: {log.ipAddress || '127.0.0.1'}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0 ml-4">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
