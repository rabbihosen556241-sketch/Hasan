import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Heart,
  Droplet,
  Search,
  Bell,
  User as UserIcon,
  ShieldCheck,
  Menu,
  X,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Share2,
  Terminal,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openDonorRegister: () => void;
  openCreateRequest: () => void;
  openRunGuide: () => void;
  notifications: NotificationItem[];
  onNotificationClick: (notif: NotificationItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openDonorRegister,
  openCreateRequest,
  openRunGuide,
  notifications,
  onNotificationClick,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, role, loginAs, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navItems = [
    { id: 'home', label: t('home') },
    { id: 'find-donor', label: t('findDonor') },
    { id: 'emergency', label: t('emergencyBlood'), isEmergency: true },
    { id: 'requests', label: t('bloodRequests') },
    { id: 'guide', label: t('bloodGuide') },
    { id: 'compatibility', label: t('compatibility') },
    { id: 'stories', label: t('stories') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      {/* Top Notice Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>{language === 'bn' ? 'জরুরি প্রয়োজনে হটলাইন: ৯৯৯ | রেড ক্রিসেন্ট ব্লাড ব্যাংক: ০২-৯৩৫৩১৯৬' : 'Emergency Hotline: 999 | Red Crescent Blood Bank: 02-9353196'}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={openRunGuide}
              className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded transition text-xs font-semibold cursor-pointer"
              title="View Run Instructions for PC & Android Termux"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{t('runInstructionsBtn')}</span>
            </button>
            <div className="flex items-center bg-black/20 rounded p-0.5 text-xs">
              <button
                onClick={() => setLanguage('bn')}
                className={`px-1.5 py-0.5 rounded font-bold transition cursor-pointer ${
                  language === 'bn' ? 'bg-white text-red-700 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <span className="text-white/40 px-0.5">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded font-bold transition cursor-pointer ${
                  language === 'en' ? 'bg-white text-red-700 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2.5 cursor-pointer select-none group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-200 group-hover:scale-105 transition-transform">
              <Droplet className="w-6 h-6 fill-white text-white" />
              <Heart className="w-3 h-3 absolute text-red-600 fill-white -bottom-0.5 -right-0.5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  <span className="text-red-600">{t('brandName')}</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-red-50 text-red-700 rounded-md border border-red-200">
                  BD
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block leading-none">
                {t('brandSlogan')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center space-x-1 ${
                  activeTab === item.id
                    ? 'text-red-600 bg-red-50 font-bold'
                    : item.isEmergency
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                }`}
              >
                {item.isEmergency && (
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping mr-1 inline-block"></span>
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center space-x-2.5">
            {/* Quick Post Request Button */}
            <button
              onClick={openCreateRequest}
              className="hidden lg:flex items-center space-x-1 px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition cursor-pointer"
            >
              <Droplet className="w-3.5 h-3.5 fill-red-600" />
              <span>{language === 'bn' ? 'রক্তের অনুরোধ' : 'Post Request'}</span>
            </button>

            {/* Become a Donor Button */}
            <button
              onClick={openDonorRegister}
              className="flex items-center space-x-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-lg shadow-sm shadow-red-200 transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{t('becomeDonor')}</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-800">
                      {language === 'bn' ? 'বিজ্ঞপ্তি ও নোটিফিকেশন' : 'Notifications'}
                    </span>
                    <span className="text-xs text-red-600 font-semibold">
                      {unreadCount} {language === 'bn' ? 'নতুন' : 'new'}
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center text-xs text-slate-500">
                        {language === 'bn' ? 'কোনো নতুন বিজ্ঞপ্তি নেই' : 'No notifications'}
                      </p>
                    ) : (
                      notifications.slice(0, 5).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            onNotificationClick(notif);
                            setNotifDropdownOpen(false);
                          }}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition flex items-start space-x-2.5 ${
                            !notif.isRead ? 'bg-red-50/50' : ''
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-lg shrink-0 ${
                              notif.type === 'emergency'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-rose-100 text-rose-600'
                            }`}
                          >
                            <AlertCircle className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-800">
                              {language === 'bn' ? notif.titleBn : notif.titleEn}
                            </p>
                            <p className="text-slate-600 text-[11px] line-clamp-2 mt-0.5">
                              {language === 'bn' ? notif.messageBn : notif.messageEn}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Role Switcher Menu */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center space-x-1.5 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer border border-slate-200"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-rose-300"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-700 hidden sm:inline max-w-[80px] truncate">
                  {user?.name ? user.name.split(' ')[0] : t('login')}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Guest User'}</p>
                    <p className="text-[11px] text-slate-500">
                      {role === 'admin'
                        ? '🛡️ ' + t('admin')
                        : role === 'donor'
                        ? '🩸 ' + t('verifiedDonor')
                        : '👤 ' + (language === 'bn' ? 'সাধারণ ব্যবহারকারী' : 'General User')}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab(role === 'admin' ? 'admin' : 'dashboard');
                        setRoleMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-red-50 hover:text-red-700 flex items-center space-x-2 font-medium cursor-pointer"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>{t('dashboard')}</span>
                    </button>
                    {role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setRoleMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-rose-700 hover:bg-red-50 flex items-center space-x-2 font-semibold cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                        <span>{language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
                      </button>
                    )}
                  </div>

                  {/* Demo switch convenience */}
                  <div className="px-3 py-1.5 bg-slate-50 border-t border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'bn' ? 'টেস্ট রোল সুইচ করুন' : 'Switch Demo Role'}
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        loginAs('donor');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1 text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer ${
                        role === 'donor' ? 'font-bold text-red-600' : 'text-slate-600'
                      }`}
                    >
                      <span>🩸 {language === 'bn' ? 'রক্তদাতা (তানভীর)' : 'Donor (Tanvir)'}</span>
                      {role === 'donor' && <span className="text-[10px] text-red-600">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        loginAs('admin');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1 text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer ${
                        role === 'admin' ? 'font-bold text-red-600' : 'text-slate-600'
                      }`}
                    >
                      <span>🛡️ {language === 'bn' ? 'অ্যাডমিন (ডা. রফিক)' : 'Admin (Dr. Rafiq)'}</span>
                      {role === 'admin' && <span className="text-[10px] text-red-600">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        loginAs('user');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1 text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer ${
                        role === 'user' ? 'font-bold text-red-600' : 'text-slate-600'
                      }`}
                    >
                      <span>👤 {language === 'bn' ? 'রক্তপ্রার্থী (মাহমুদ)' : 'Requester (Mahmud)'}</span>
                      {role === 'user' && <span className="text-[10px] text-red-600">✓</span>}
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setRoleMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 cursor-pointer font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-red-600 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-rose-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer flex items-center space-x-2 ${
                activeTab === item.id ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.isEmergency && <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                openCreateRequest();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs font-bold text-red-600 bg-red-50 rounded-lg"
            >
              {language === 'bn' ? 'রক্তের অনুরোধ তৈরি করুন' : 'Create Blood Request'}
            </button>
            <button
              onClick={() => {
                openRunGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs font-bold text-slate-700 bg-slate-100 rounded-lg flex items-center justify-center space-x-1.5"
            >
              <Terminal className="w-4 h-4 text-red-600" />
              <span>{t('runInstructionsBtn')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
