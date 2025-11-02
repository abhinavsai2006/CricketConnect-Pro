import { VercelRequest, VercelResponse } from '@vercel/node';

// Mock database - Replace with Vercel Postgres or other database
const mockPlayers = [
  {
    id: 1,
    name: "Virat Sharma",
    position: "Batsman",
    batting_style: "Right-hand bat",
    bowling_style: "Right-arm medium",
    rating: 4.8,
    matches_played: 45,
    location: "Mumbai, India",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Virat",
    availability: "available",
    bio: "Aggressive batsman with excellent technique"
  },
  {
    id: 2,
    name: "Rohit Patel",
    position: "All-rounder",
    batting_style: "Right-hand bat",
    bowling_style: "Right-arm off-spin",
    rating: 4.6,
    matches_played: 38,
    location: "Delhi, India",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit",
    availability: "available",
    bio: "Versatile all-rounder, strong in both departments"
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Return mock players data
    res.status(200).json({ players: mockPlayers });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
