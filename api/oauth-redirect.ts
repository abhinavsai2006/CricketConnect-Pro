import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const apiUrl = process.env.MOCHA_USERS_SERVICE_API_URL || 'https://users-service.mocha.run';
    const apiKey = process.env.MOCHA_USERS_SERVICE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Missing API configuration' });
    }

    const response = await fetch(`${apiUrl}/oauth/google/redirect_url`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('OAuth redirect error:', error);
    res.status(500).json({ error: 'Failed to get redirect URL' });
  }
}
