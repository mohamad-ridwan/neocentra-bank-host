import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { neocentra_session } = req.cookies;

  if (!neocentra_session || neocentra_session !== 'mock-jwt-token-neocentra-12345') {
    return res.status(401).json({ message: 'Sesi tidak aktif atau telah kedaluwarsa' });
  }

  // If refresh parameter is set to true, refresh the cookie expiration (sliding window)
  if (req.query.refresh === 'true') {
    const hostHeader = req.headers.host || '';
    const domain = hostHeader.split(':')[0];
    const domainAttr = domain ? `; Domain=${domain}` : '';

    res.setHeader(
      'Set-Cookie',
      `neocentra_session=mock-jwt-token-neocentra-12345; HttpOnly; Path=/; SameSite=Strict; Max-Age=300${domainAttr}`
    );
  }

  return res.status(200).json({
    user: {
      username: 'admin',
      role: 'Super Administrator',
      email: 'admin@neocentra.com',
    },
  });
}
