import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { username, role, email, otpCode } = req.body;

  if (otpCode !== '123456') {
    return res.status(400).json({ message: 'Kode OTP salah (Gunakan kode mock: 123456)' });
  }

  const hostHeader = req.headers.host || '';
  const domain = hostHeader.split(':')[0];
  const domainAttr = domain ? `; Domain=${domain}` : '';

  // Set-Cookie header with SameSite=Strict, Path=/, and dynamic Domain
  res.setHeader(
    'Set-Cookie',
    `neocentra_session=mock-jwt-token-neocentra-12345; HttpOnly; Path=/; SameSite=Strict; Max-Age=300${domainAttr}`
  );

  return res.status(200).json({
    user: {
      username: username || 'admin',
      role: role || 'Super Administrator',
      email: email || 'admin@neocentra.com',
    },
  });
}
