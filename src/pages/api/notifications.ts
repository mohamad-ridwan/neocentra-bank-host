import type { NextApiRequest, NextApiResponse } from 'next';

export interface NotificationItem {
  id: string;
  category: 'MAKER_CHECKER' | 'COMPLIANCE' | 'SYSTEM' | 'TICKET';
  priority: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  message: string;
  status: 'UNREAD' | 'READ';
  actionUrl: string;
  createdAt: string;
  metadata?: any;
}

// In-memory notifications store for the demo session
let notifications: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'MAKER_CHECKER',
    priority: 'CRITICAL',
    title: 'Persetujuan Transfer Valas',
    message: 'Teller John Doe mengajukan transfer outbound senilai USD 250,000 ke Bank XYZ.',
    status: 'UNREAD',
    actionUrl: '/verification/transactions/tx-77665',
    createdAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // 3 mins ago
    metadata: {
      initiatedBy: 'John Doe (Teller-02)',
      amount: 250000,
      currency: 'USD',
    },
  },
  {
    id: 'notif-2',
    category: 'SYSTEM',
    priority: 'CRITICAL',
    title: 'Koneksi BI-FAST Down',
    message: 'Koneksi interbank BI-FAST mendeteksi RTO berulang. Sistem dialihkan ke SKNBI.',
    status: 'UNREAD',
    actionUrl: '/system/status',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
  },
  {
    id: 'notif-3',
    category: 'COMPLIANCE',
    priority: 'WARNING',
    title: 'Peringatan Transaksi AML',
    message: 'Deteksi pencucian uang (transaksi pecahan berulang) pada rekening Budi Santoso.',
    status: 'UNREAD',
    actionUrl: '/compliance/aml/user-budi',
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: 'notif-4',
    category: 'TICKET',
    priority: 'INFO',
    title: 'Disput ATM Cabang Slipi',
    message: 'Nasabah melaporkan kegagalan penarikan kas Rp 1.500.000, saldo terdebit.',
    status: 'UNREAD',
    actionUrl: '/tickets/dispute-atm-102',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 'notif-5',
    category: 'MAKER_CHECKER',
    priority: 'WARNING',
    title: 'Pengajuan Kredit Baru',
    message: 'Pengajuan KPR baru atas nama PT Maju Bersama membutuhkan review dokumen jaminan.',
    status: 'READ',
    actionUrl: '/verification/loans/loan-5544',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS & Options handling
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Cookie Validation for Security
  const { neocentra_session } = req.cookies;
  if (!neocentra_session || neocentra_session !== 'mock-jwt-token-neocentra-12345') {
    return res.status(401).json({ message: 'Unauthorized access: Missing or invalid session cookie.' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ notifications });
  }

  if (req.method === 'POST') {
    const { id, markAll } = req.body;

    if (markAll) {
      notifications = notifications.map((n) => ({ ...n, status: 'READ' }));
      return res.status(200).json({ success: true, notifications });
    }

    if (id) {
      notifications = notifications.map((n) =>
        n.id === id ? { ...n, status: 'READ' } : n
      );
      return res.status(200).json({ success: true, notifications });
    }

    return res.status(400).json({ message: 'Invalid action payload. Provide id or markAll.' });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (id && typeof id === 'string') {
      notifications = notifications.filter((n) => n.id !== id);
      return res.status(200).json({ success: true, notifications });
    }
    return res.status(400).json({ message: 'Invalid delete query. Provide notification id.' });
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
