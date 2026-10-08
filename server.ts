import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './server/db.ts';
import { BANGLADESH_LOCATIONS } from './src/data/bangladeshLocations.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API Routes
  const router = express.Router();

  // Statistics
  router.get('/stats', (_req: Request, res: Response) => {
    res.json(db.getStatistics());
  });

  // Locations
  router.get('/locations', (_req: Request, res: Response) => {
    res.json(BANGLADESH_LOCATIONS);
  });

  // Donors
  router.get('/donors', (req: Request, res: Response) => {
    const { bloodGroup, division, district, upazila, availability, search } = req.query;
    const donors = db.getDonors({
      bloodGroup: bloodGroup as string,
      division: division as string,
      district: district as string,
      upazila: upazila as string,
      availability: availability as string,
      search: search as string,
    });

    // Strip sensitive fields (exact phone/email only exposed on authorized safe contact)
    const sanitized = donors.map((d) => ({
      ...d,
      phone: d.phone ? `${d.phone.substring(0, 4)}***${d.phone.substring(d.phone.length - 2)}` : '',
    }));

    res.json(sanitized);
  });

  router.get('/donors/:id', (req: Request, res: Response) => {
    const donor = db.getDonorById(req.params.id);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    // Safe masking
    const safeDonor = {
      ...donor,
      phone: `${donor.phone.substring(0, 4)}***${donor.phone.substring(donor.phone.length - 2)}`,
    };
    res.json(safeDonor);
  });

  router.post('/donors', (req: Request, res: Response) => {
    const data = req.body;
    if (!data.fullName || !data.bloodGroup || !data.district || !data.phone) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const newDonor = db.addDonor({
      id: `donor-${Date.now()}`,
      userId: data.userId,
      fullName: data.fullName,
      bloodGroup: data.bloodGroup,
      age: parseInt(data.age, 10) || 24,
      gender: data.gender || 'male',
      phone: data.phone,
      email: data.email,
      division: data.division || 'dhaka',
      district: data.district,
      upazila: data.upazila || '',
      area: data.area || '',
      lastDonationDate: data.lastDonationDate || '',
      availability: data.availability || 'available',
      preferredContact: data.preferredContact || 'call',
      shortBio: data.shortBio || '',
      isVerified: false,
      totalDonations: parseInt(data.totalDonations, 10) || 0,
      avatar:
        data.avatar ||
        `https://images.unsplash.com/photo-${1534528741775 + (Date.now() % 50000)}?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString(),
    });

    db.addAuditLog({
      id: `log-${Date.now()}`,
      adminName: 'System',
      action: 'DONOR_REGISTERED',
      details: `New donor registered: ${newDonor.fullName} (${newDonor.bloodGroup}, ${newDonor.district})`,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json(newDonor);
  });

  router.patch('/donors/:id', (req: Request, res: Response) => {
    const updated = db.updateDonor(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    res.json(updated);
  });

  router.post('/donors/:id/verify', (req: Request, res: Response) => {
    const { adminName } = req.body;
    const donor = db.updateDonor(req.params.id, { isVerified: true });
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    db.addAuditLog({
      id: `log-${Date.now()}`,
      adminName: adminName || 'Admin',
      action: 'VERIFY_DONOR',
      details: `Verified donor ${donor.fullName} (${donor.bloodGroup})`,
      timestamp: new Date().toISOString(),
    });
    res.json({ success: true, donor });
  });

  // Blood Requests
  router.get('/requests', (req: Request, res: Response) => {
    const { status, urgency, bloodGroup, district } = req.query;
    const requests = db.getRequests({
      status: status as string,
      urgency: urgency as string,
      bloodGroup: bloodGroup as string,
      district: district as string,
    });
    res.json(requests);
  });

  router.post('/requests', (req: Request, res: Response) => {
    const data = req.body;
    if (!data.patientName || !data.bloodGroup || !data.hospitalName || !data.district || !data.contactNumber) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const newRequest = db.addRequest({
      id: `req-${Date.now()}`,
      requesterId: data.requesterId,
      patientName: data.patientName,
      bloodGroup: data.bloodGroup,
      hospitalName: data.hospitalName,
      hospitalLocation: data.hospitalLocation || '',
      district: data.district,
      upazila: data.upazila || '',
      requiredDate: data.requiredDate || new Date().toISOString().split('T')[0],
      requiredTime: data.requiredTime || 'জরুরি প্রয়োজন',
      numberOfBags: parseInt(data.numberOfBags, 10) || 1,
      urgency: data.urgency || 'regular',
      reasonForBlood: data.reasonForBlood || '',
      contactPerson: data.contactPerson || data.patientName,
      contactNumber: data.contactNumber,
      additionalInfo: data.additionalInfo || '',
      status: 'active',
      createdAt: new Date().toISOString(),
    });

    db.addAuditLog({
      id: `log-${Date.now()}`,
      adminName: 'System',
      action: 'REQUEST_CREATED',
      details: `Blood request created for ${newRequest.patientName} (${newRequest.bloodGroup}, ${newRequest.hospitalName})`,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json(newRequest);
  });

  router.patch('/requests/:id/status', (req: Request, res: Response) => {
    const { status, adminName } = req.body;
    const reqItem = db.updateRequestStatus(req.params.id, status);
    if (!reqItem) {
      return res.status(404).json({ error: 'Request not found' });
    }
    db.addAuditLog({
      id: `log-${Date.now()}`,
      adminName: adminName || 'System',
      action: 'UPDATE_REQUEST_STATUS',
      details: `Request ${req.params.id} status changed to ${status}`,
      timestamp: new Date().toISOString(),
    });
    res.json(reqItem);
  });

  // Safe Contact Requests
  router.post('/contact-requests', (req: Request, res: Response) => {
    const data = req.body;
    if (!data.donorId || !data.requesterName || !data.requesterPhone) {
      return res.status(400).json({ error: 'Missing contact info' });
    }

    const donor = db.getDonorById(data.donorId);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    const contactReq = db.addContactRequest({
      id: `cr-${Date.now()}`,
      requestId: data.requestId,
      donorId: donor.id,
      donorName: donor.fullName,
      donorBloodGroup: donor.bloodGroup,
      requesterName: data.requesterName,
      requesterPhone: data.requesterPhone,
      patientName: data.patientName || 'জরুরি রোগী',
      hospitalName: data.hospitalName || 'হাসপাতাল',
      bloodGroupNeeded: data.bloodGroupNeeded || donor.bloodGroup,
      message: data.message || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(contactReq);
  });

  router.get('/contact-requests/donor/:donorId', (req: Request, res: Response) => {
    const requests = db.getContactRequestsForDonor(req.params.donorId);
    res.json(requests);
  });

  router.patch('/contact-requests/:id/status', (req: Request, res: Response) => {
    const { status } = req.body;
    const updated = db.updateContactRequestStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Contact request not found' });
    }
    res.json(updated);
  });

  // Notifications
  router.get('/notifications', (_req: Request, res: Response) => {
    res.json(db.getNotifications());
  });

  router.patch('/notifications/:id/read', (req: Request, res: Response) => {
    db.markNotificationAsRead(req.params.id);
    res.json({ success: true });
  });

  // Reports
  router.get('/reports', (_req: Request, res: Response) => {
    res.json(db.getReports());
  });

  router.post('/reports', (req: Request, res: Response) => {
    const data = req.body;
    const report = db.addReport({
      id: `rep-${Date.now()}`,
      reportedType: data.reportedType || 'donor',
      targetId: data.targetId || 'unknown',
      targetTitle: data.targetTitle || 'সন্দেহভাজন কার্যক্রম',
      reporterName: data.reporterName || 'বেনামী অভিযোগকারী',
      reporterPhone: data.reporterPhone,
      reason: data.reason || 'fake_donor',
      description: data.description || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    db.addAuditLog({
      id: `log-${Date.now()}`,
      adminName: 'System',
      action: 'REPORT_SUBMITTED',
      details: `Report lodged against ${report.targetTitle} for ${report.reason}`,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json(report);
  });

  router.patch('/reports/:id/resolve', (req: Request, res: Response) => {
    const { status, adminNotes, adminName } = req.body;
    const rep = db.updateReportStatus(req.params.id, status, adminNotes);
    if (!rep) {
      return res.status(404).json({ error: 'Report not found' });
    }
    db.addAuditLog({
      id: `log-${Date.now()}`,
      adminName: adminName || 'Admin',
      action: 'RESOLVE_REPORT',
      details: `Report ${req.params.id} resolved as ${status}`,
      timestamp: new Date().toISOString(),
    });
    res.json(rep);
  });

  // Audit Logs
  router.get('/audit-logs', (_req: Request, res: Response) => {
    res.json(db.getAuditLogs());
  });

  // Success Stories
  router.get('/stories', (_req: Request, res: Response) => {
    res.json(db.getSuccessStories());
  });

  router.post('/stories/:id/like', (req: Request, res: Response) => {
    const likes = db.likeStory(req.params.id);
    res.json({ likes });
  });

  // Authentication Demo API
  router.post('/auth/login', (req: Request, res: Response) => {
    const { email, role } = req.body;
    if (role === 'admin') {
      const admin = db.getUsers().find((u) => u.role === 'admin');
      return res.json({ user: admin, token: 'demo-admin-token' });
    }
    if (role === 'donor') {
      const donorUser = db.getUsers().find((u) => u.role === 'donor');
      return res.json({ user: donorUser, token: 'demo-donor-token' });
    }
    if (email) {
      const user = db.getUserByEmail(email);
      if (user) {
        return res.json({ user, token: `demo-token-${user.id}` });
      }
    }
    // Default fallback demo user
    const defaultUser = db.getUsers()[3];
    res.json({ user: defaultUser, token: 'demo-user-token' });
  });

  router.post('/auth/register', (req: Request, res: Response) => {
    const { name, email, phone, role } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone required' });
    }
    const newUser = db.addUser({
      id: `user-${Date.now()}`,
      name,
      email: email || `${phone}@roktobondhu.org`,
      phone,
      role: role || 'user',
      isVerified: true,
      avatar: `https://images.unsplash.com/photo-${1535713875002 + (Date.now() % 50000)}?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ user: newUser, token: `demo-token-${newUser.id}` });
  });

  // Mount API router
  app.use('/api', router);

  // Development vs Production
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RoktoBondhu Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
