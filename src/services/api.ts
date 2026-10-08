import {
  Donor,
  BloodRequest,
  SafeContactRequest,
  PlatformStatistics,
  NotificationItem,
  ReportItem,
  AuditLog,
  SuccessStory,
  User,
} from '../types';

export const api = {
  // Statistics
  async getStats(): Promise<PlatformStatistics> {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return await res.json();
    } catch (e) {
      console.error(e);
      return {
        totalDonors: 148,
        activeDonors: 112,
        totalRequests: 84,
        completedDonations: 395,
        emergencyRequests: 3,
        verifiedDonorsCount: 94,
      };
    }
  },

  // Donors
  async getDonors(filters?: {
    bloodGroup?: string;
    division?: string;
    district?: string;
    upazila?: string;
    availability?: string;
    search?: string;
  }): Promise<Donor[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.bloodGroup && filters.bloodGroup !== 'ALL') params.append('bloodGroup', filters.bloodGroup);
      if (filters?.division && filters.division !== 'ALL') params.append('division', filters.division);
      if (filters?.district && filters.district !== 'ALL') params.append('district', filters.district);
      if (filters?.upazila && filters.upazila !== 'ALL') params.append('upazila', filters.upazila);
      if (filters?.availability && filters.availability !== 'ALL') params.append('availability', filters.availability);
      if (filters?.search) params.append('search', filters.search);

      const res = await fetch(`/api/donors?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch donors');
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async getDonorById(id: string): Promise<Donor | null> {
    try {
      const res = await fetch(`/api/donors/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async registerDonor(data: Partial<Donor>): Promise<Donor> {
    const res = await fetch('/api/donors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to register donor');
    }
    return await res.json();
  },

  async verifyDonor(id: string, adminName: string): Promise<void> {
    await fetch(`/api/donors/${id}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminName }),
    });
  },

  // Blood Requests
  async getRequests(filters?: {
    status?: string;
    urgency?: string;
    bloodGroup?: string;
    district?: string;
  }): Promise<BloodRequest[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.status && filters.status !== 'ALL') params.append('status', filters.status);
      if (filters?.urgency && filters.urgency !== 'ALL') params.append('urgency', filters.urgency);
      if (filters?.bloodGroup && filters.bloodGroup !== 'ALL') params.append('bloodGroup', filters.bloodGroup);
      if (filters?.district && filters.district !== 'ALL') params.append('district', filters.district);

      const res = await fetch(`/api/requests?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch requests');
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async createRequest(data: Partial<BloodRequest>): Promise<BloodRequest> {
    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create request');
    }
    return await res.json();
  },

  async updateRequestStatus(id: string, status: BloodRequest['status'], adminName?: string): Promise<void> {
    await fetch(`/api/requests/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminName }),
    });
  },

  // Safe Contact Requests
  async sendContactRequest(data: {
    donorId: string;
    requesterName: string;
    requesterPhone: string;
    patientName: string;
    hospitalName: string;
    bloodGroupNeeded: string;
    message?: string;
  }): Promise<SafeContactRequest> {
    const res = await fetch('/api/contact-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to send contact request');
    return await res.json();
  },

  async getContactRequestsForDonor(donorId: string): Promise<SafeContactRequest[]> {
    try {
      const res = await fetch(`/api/contact-requests/donor/${donorId}`);
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async updateContactRequestStatus(id: string, status: 'accepted' | 'declined'): Promise<SafeContactRequest> {
    const res = await fetch(`/api/contact-requests/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const res = await fetch('/api/notifications');
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async markNotificationRead(id: string): Promise<void> {
    await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
  },

  // Reports
  async submitReport(data: {
    reportedType: 'donor' | 'request' | 'user';
    targetId: string;
    targetTitle: string;
    reporterName: string;
    reporterPhone?: string;
    reason: string;
    description: string;
  }): Promise<void> {
    await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async getReports(): Promise<ReportItem[]> {
    try {
      const res = await fetch('/api/reports');
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async resolveReport(id: string, status: ReportItem['status'], adminNotes?: string, adminName?: string): Promise<void> {
    await fetch(`/api/reports/${id}/resolve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes, adminName }),
    });
  },

  // Audit Logs
  async getAuditLogs(): Promise<AuditLog[]> {
    try {
      const res = await fetch('/api/audit-logs');
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  // Stories
  async getStories(): Promise<SuccessStory[]> {
    try {
      const res = await fetch('/api/stories');
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async likeStory(id: string): Promise<number> {
    const res = await fetch(`/api/stories/${id}/like`, { method: 'POST' });
    const data = await res.json();
    return data.likes;
  },

  // Auth demo
  async loginDemo(role: 'admin' | 'donor' | 'user'): Promise<User> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    const data = await res.json();
    return data.user;
  },
};
