import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const hostHeader = req.headers.host || '';
  const domain = hostHeader.split(':')[0];
  const domainAttr = domain ? `; Domain=${domain}` : '';

  // Support POST, DELETE, and GET for robustness
  res.setHeader(
    'Set-Cookie',
    `neocentra_session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT${domainAttr}`
  );

  return res.status(200).json({ message: 'Logout berhasil' });
}
