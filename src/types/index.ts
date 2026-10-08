import type { BloodGroup } from '../data/bloodGroups.ts';

export type UserRole = 'user' | 'donor' | 'admin';
export type AvailabilityStatus = 'available' | 'temporarily_unavailable' | 'not_available';
export type ContactMethod = 'call' | 'sms' | 'whatsapp';
export type RequestUrgency = 'emergency' | 'regular';
export type RequestStatus = 'active' | 'donor_found' | 'completed' | 'cancelled';
export type ContactRequestStatus = 'pending' | 'accepted' | 'declined';
export type ReportReason = 'fake_donor' | 'fake_request' | 'scam' | 'harassment' | 'wrong_info' | 'abuse';
export type ReportStatus = 'pending' | 'reviewed' | 'resolved';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  donorId?: string;
  isVerified?: boolean;
  createdAt: string;
}

export interface Donor {
  id: string;
  userId?: string;
  fullName: string;
  bloodGroup: BloodGroup;
  age: number;
  gender?: 'male' | 'female' | 'other';
  phone: string; // Securely protected in public views
  email?: string;
  division: string;
  district: string;
  upazila: string;
  area: string; // Publicly shows district & area only; exact address kept private
  lastDonationDate?: string;
  availability: AvailabilityStatus;
  preferredContact: ContactMethod;
  shortBio?: string;
  isVerified: boolean;
  totalDonations: number;
  avatar: string;
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  requesterId?: string;
  patientName: string;
  bloodGroup: BloodGroup;
  hospitalName: string;
  hospitalLocation: string;
  district: string;
  upazila: string;
  requiredDate: string;
  requiredTime: string;
  numberOfBags: number;
  urgency: RequestUrgency;
  reasonForBlood?: string; // Surgery, Thalassemia, Accident, Delivery, etc.
  contactPerson: string;
  contactNumber: string;
  additionalInfo?: string;
  status: RequestStatus;
  matchedDonorsCount?: number;
  createdAt: string;
}

export interface SafeContactRequest {
  id: string;
  requestId?: string;
  donorId: string;
  donorName: string;
  donorBloodGroup: BloodGroup;
  requesterName: string;
  requesterPhone: string;
  patientName: string;
  hospitalName: string;
  bloodGroupNeeded: BloodGroup;
  message?: string;
  status: ContactRequestStatus;
  revealedPhone?: string;
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  donorId: string;
  donorName: string;
  bloodGroup: BloodGroup;
  donationDate: string;
  hospitalName: string;
  location: string;
  notes?: string;
  verified: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  donorId?: string;
  titleBn: string;
  titleEn: string;
  messageBn: string;
  messageEn: string;
  type: 'emergency' | 'match' | 'request' | 'system' | 'verification';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface ReportItem {
  id: string;
  reportedType: 'donor' | 'request' | 'user';
  targetId: string;
  targetTitle: string;
  reporterName: string;
  reporterPhone?: string;
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface SuccessStory {
  id: string;
  titleBn: string;
  titleEn: string;
  patientName: string;
  donorName: string;
  bloodGroup: BloodGroup;
  hospital: string;
  storyBn: string;
  storyEn: string;
  date: string;
  likes: number;
}

export interface PlatformStatistics {
  totalDonors: number;
  activeDonors: number;
  totalRequests: number;
  completedDonations: number;
  emergencyRequests: number;
  verifiedDonorsCount: number;
}
