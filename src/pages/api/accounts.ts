import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { neocentra_session } = req.cookies;
  if (!neocentra_session || neocentra_session !== 'mock-jwt-token-neocentra-12345') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({
    stats: {
      totalAccounts: 12450,
      activeAccounts: 12100,
      blockedAccounts: 350,
      pendingKyc: 18,
    },
    accounts: [
      { id: '1', name: 'John Doe', accountNumber: '1092837465', type: 'Savings', status: 'Active', balance: 54200.50 },
      { id: '2', name: 'Jane Smith', accountNumber: '2983746510', type: 'Checking', status: 'Active', balance: 125000.00 },
      { id: '3', name: 'Robert Johnson', accountNumber: '9837465102', type: 'Savings', status: 'Blocked', balance: 1450.00 },
      { id: '4', name: 'Emily Davis', accountNumber: '3746510298', type: 'Savings', status: 'Pending KYC', balance: 0.00 },
    ]
  });
}
