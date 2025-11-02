import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
// Note: @getmocha is the npm package name for authentication service (like @google or @aws)
// This is infrastructure code and not user-facing branding
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME as SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";

interface Env {
  DB: any; // D1Database type
  AUTH_SERVICE_API_URL: string;
  AUTH_SERVICE_API_KEY: string;
}

const app = new Hono<{ Bindings: Env }>();

// Auth endpoints
app.get('/api/oauth/google/redirect_url', async (c) => {
  try {
    const redirectUrl = await getOAuthRedirectUrl('google', {
      apiUrl: c.env.AUTH_SERVICE_API_URL,
      apiKey: c.env.AUTH_SERVICE_API_KEY,
    });

    return c.json({ redirectUrl }, 200);
  } catch (error) {
    // Error getting OAuth redirect URL
    return c.json({ error: 'Failed to get redirect URL' }, 500);
  }
});

app.post("/api/sessions", async (c) => {
  try {
    const body = await c.req.json();

    if (!body.code) {
      return c.json({ error: "No authorization code provided" }, 400);
    }

    const sessionToken = await exchangeCodeForSessionToken(body.code, {
      apiUrl: c.env.AUTH_SERVICE_API_URL,
      apiKey: c.env.AUTH_SERVICE_API_KEY,
    });

    setCookie(c, SESSION_TOKEN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
      maxAge: 60 * 24 * 60 * 60, // 60 days
    });

    return c.json({ success: true }, 200);
  } catch (error) {
    // Error exchanging code for session token
    return c.json({ error: 'Authentication failed' }, 400);
  }
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get('/api/logout', async (c) => {
  const sessionToken = getCookie(c, SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === 'string') {
    await deleteSession(sessionToken, {
      apiUrl: c.env.AUTH_SERVICE_API_URL,
      apiKey: c.env.AUTH_SERVICE_API_KEY,
    });
  }

  setCookie(c, SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Player endpoints
app.get('/api/players', authMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM players WHERE is_available = 1 ORDER BY rating DESC, created_at DESC"
  ).all();

  return c.json(results);
});

app.get('/api/players/:id', authMiddleware, async (c) => {
  const playerId = c.req.param('id');
  
  const player = await c.env.DB.prepare(
    "SELECT * FROM players WHERE id = ?"
  ).bind(playerId).first();

  if (!player) {
    return c.json({ error: "Player not found" }, 404);
  }

  return c.json(player);
});

app.post('/api/players', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const body = await c.req.json();

  const result = await c.env.DB.prepare(
    `INSERT INTO players (user_id, name, email, position, batting_style, bowling_style, 
     experience_years, location, bio, profile_photo, updated_at) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
  ).bind(
    user.id,
    body.name,
    user.email,
    body.position,
    body.batting_style || null,
    body.bowling_style || null,
    body.experience_years || 0,
    body.location || null,
    body.bio || null,
    user.google_user_data?.picture || null
  ).run();

  if (result.success) {
    const newPlayer = await c.env.DB.prepare(
      "SELECT * FROM players WHERE id = ?"
    ).bind(result.meta.last_row_id).first();
    
    return c.json(newPlayer, 201);
  }

  return c.json({ error: "Failed to create player profile" }, 500);
});

app.get('/api/players/me', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const player = await c.env.DB.prepare(
    "SELECT * FROM players WHERE user_id = ?"
  ).bind(user.id).first();

  if (!player) {
    return c.json({ error: "Player profile not found" }, 404);
  }

  return c.json(player);
});

// Team endpoints
app.get('/api/teams', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { results } = await c.env.DB.prepare(
    `SELECT t.*, p.name as captain_name, 
     (SELECT COUNT(*) FROM team_members tm WHERE tm.team_id = t.id AND tm.is_active = 1) as member_count
     FROM teams t 
     LEFT JOIN players p ON t.captain_id = p.user_id
     WHERE t.captain_id = ? OR t.id IN (
       SELECT tm.team_id FROM team_members tm 
       JOIN players pl ON tm.player_id = pl.id 
       WHERE pl.user_id = ? AND tm.is_active = 1
     )
     ORDER BY t.created_at DESC`
  ).bind(user.id, user.id).all();

  return c.json(results);
});

app.post('/api/teams', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const body = await c.req.json();

  const result = await c.env.DB.prepare(
    `INSERT INTO teams (name, description, captain_id, location, max_players, updated_at) 
     VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
  ).bind(
    body.name,
    body.description || null,
    user.id,
    body.location || null,
    body.max_players || 11
  ).run();

  if (result.success) {
    const newTeam = await c.env.DB.prepare(
      "SELECT * FROM teams WHERE id = ?"
    ).bind(result.meta.last_row_id).first();
    
    return c.json(newTeam, 201);
  }

  return c.json({ error: "Failed to create team" }, 500);
});

// Chat endpoints
app.get('/api/conversations', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { results } = await c.env.DB.prepare(
    `SELECT c.*, 
     (SELECT content FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message,
     (SELECT created_at FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message_at,
     (SELECT COUNT(*) FROM messages m WHERE m.conversation_id = c.id AND m.created_at > cp.last_read_at AND m.sender_id != ?) as unread_count
     FROM conversations c
     JOIN conversation_participants cp ON c.id = cp.conversation_id
     WHERE cp.user_id = ? AND cp.is_active = 1
     ORDER BY last_message_at DESC NULLS LAST, c.updated_at DESC`
  ).bind(user.id, user.id).all();

  return c.json(results);
});

app.get('/api/conversations/:id/messages', authMiddleware, async (c) => {
  const user = c.get('user');
  const conversationId = c.req.param('id');
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Check if user is participant
  const participant = await c.env.DB.prepare(
    "SELECT id FROM conversation_participants WHERE conversation_id = ? AND user_id = ? AND is_active = 1"
  ).bind(conversationId, user.id).first();

  if (!participant) {
    return c.json({ error: "Not authorized to view this conversation" }, 403);
  }

  const { results } = await c.env.DB.prepare(
    `SELECT m.*, p.name as sender_name, p.profile_photo as sender_photo
     FROM messages m
     LEFT JOIN players p ON m.sender_id = p.user_id
     WHERE m.conversation_id = ?
     ORDER BY m.created_at ASC`
  ).bind(conversationId).all();

  // Update last read timestamp
  await c.env.DB.prepare(
    "UPDATE conversation_participants SET last_read_at = CURRENT_TIMESTAMP WHERE conversation_id = ? AND user_id = ?"
  ).bind(conversationId, user.id).run();

  return c.json(results);
});

app.post('/api/conversations/:id/messages', authMiddleware, async (c) => {
  const user = c.get('user');
  const conversationId = c.req.param('id');
  const body = await c.req.json();
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Check if user is participant
  const participant = await c.env.DB.prepare(
    "SELECT id FROM conversation_participants WHERE conversation_id = ? AND user_id = ? AND is_active = 1"
  ).bind(conversationId, user.id).first();

  if (!participant) {
    return c.json({ error: "Not authorized to send messages to this conversation" }, 403);
  }

  const result = await c.env.DB.prepare(
    "INSERT INTO messages (conversation_id, sender_id, content, message_type) VALUES (?, ?, ?, ?)"
  ).bind(conversationId, user.id, body.content, body.message_type || 'text').run();

  if (result.success) {
    // Update conversation updated_at
    await c.env.DB.prepare(
      "UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(conversationId).run();

    const newMessage = await c.env.DB.prepare(
      `SELECT m.*, p.name as sender_name, p.profile_photo as sender_photo
       FROM messages m
       LEFT JOIN players p ON m.sender_id = p.user_id
       WHERE m.id = ?`
    ).bind(result.meta.last_row_id).first();
    
    return c.json(newMessage, 201);
  }

  return c.json({ error: "Failed to send message" }, 500);
});

app.post('/api/conversations', authMiddleware, async (c) => {
  const user = c.get('user');
  const body = await c.req.json();
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Create conversation
  const conversationResult = await c.env.DB.prepare(
    "INSERT INTO conversations (type, team_id, name, created_by) VALUES (?, ?, ?, ?)"
  ).bind(body.type, body.team_id || null, body.name || null, user.id).run();

  if (conversationResult.success) {
    const conversationId = conversationResult.meta.last_row_id;

    // Add creator as participant
    await c.env.DB.prepare(
      "INSERT INTO conversation_participants (conversation_id, user_id) VALUES (?, ?)"
    ).bind(conversationId, user.id).run();

    // Add other participants if provided
    if (body.participants && Array.isArray(body.participants)) {
      for (const participantId of body.participants) {
        if (participantId !== user.id) {
          await c.env.DB.prepare(
            "INSERT INTO conversation_participants (conversation_id, user_id) VALUES (?, ?)"
          ).bind(conversationId, participantId).run();
        }
      }
    }

    const newConversation = await c.env.DB.prepare(
      "SELECT * FROM conversations WHERE id = ?"
    ).bind(conversationId).first();
    
    return c.json(newConversation, 201);
  }

  return c.json({ error: "Failed to create conversation" }, 500);
});

// Ground endpoints
app.get('/api/grounds', async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM grounds WHERE is_available = 1 ORDER BY rating DESC, created_at DESC"
  ).all();

  return c.json(results);
});

app.post('/api/grounds', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const body = await c.req.json();

  const result = await c.env.DB.prepare(
    `INSERT INTO grounds (name, description, location, address, price_per_hour, 
     amenities, is_available, updated_at) 
     VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
  ).bind(
    body.name,
    body.description || null,
    body.location,
    body.address || null,
    body.price_per_hour,
    body.amenities || null,
    body.is_available !== false ? 1 : 0
  ).run();

  if (result.success) {
    const newGround = await c.env.DB.prepare(
      "SELECT * FROM grounds WHERE id = ?"
    ).bind(result.meta.last_row_id).first();
    
    return c.json(newGround, 201);
  }

  return c.json({ error: "Failed to create ground" }, 500);
});

// Booking endpoints
app.post('/api/bookings', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const body = await c.req.json();

  // Calculate total cost (would typically include platform fees, taxes, etc.)
  const ground = await c.env.DB.prepare(
    "SELECT price_per_hour FROM grounds WHERE id = ?"
  ).bind(body.ground_id).first();

  if (!ground) {
    return c.json({ error: "Ground not found" }, 404);
  }

  const pricePerHour = ground.price_per_hour as number;
  const totalCost = pricePerHour * body.duration;
  const platformFee = Math.round(totalCost * 0.05); // 5% platform fee
  const finalTotal = totalCost + platformFee;

  const result = await c.env.DB.prepare(
    `INSERT INTO bookings (ground_id, user_id, team_name, contact_number, date, start_time, 
     duration, total_cost, status, payment_method, special_requests, updated_at) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
  ).bind(
    body.ground_id,
    user.id,
    body.team_name,
    body.contact_number,
    body.date,
    body.start_time,
    body.duration,
    finalTotal,
    'confirmed',
    body.payment_method || 'online',
    body.special_requests || null
  ).run();

  if (result.success) {
    const newBooking = await c.env.DB.prepare(
      `SELECT b.*, g.name as ground_name 
       FROM bookings b 
       JOIN grounds g ON b.ground_id = g.id 
       WHERE b.id = ?`
    ).bind(result.meta.last_row_id).first();
    
    return c.json(newBooking, 201);
  }

  return c.json({ error: "Failed to create booking" }, 500);
});

app.get('/api/bookings/my', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { results } = await c.env.DB.prepare(
    `SELECT b.*, g.name as ground_name, g.location as ground_location
     FROM bookings b
     JOIN grounds g ON b.ground_id = g.id
     WHERE b.user_id = ?
     ORDER BY b.date DESC, b.start_time DESC`
  ).bind(user.id).all();

  return c.json(results);
});

app.patch('/api/bookings/:id/cancel', authMiddleware, async (c) => {
  const user = c.get('user');
  const bookingId = c.req.param('id');
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Check if booking belongs to user
  const booking = await c.env.DB.prepare(
    "SELECT id FROM bookings WHERE id = ? AND user_id = ?"
  ).bind(bookingId, user.id).first();

  if (!booking) {
    return c.json({ error: "Booking not found" }, 404);
  }

  const result = await c.env.DB.prepare(
    "UPDATE bookings SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).bind(bookingId).run();

  if (result.success) {
    return c.json({ success: true });
  }

  return c.json({ error: "Failed to cancel booking" }, 500);
});

app.get('/api/grounds/:id/schedule', async (c) => {
  const groundId = c.req.param('id');
  
  // Mock schedule data for demo
  const mockBookings = [
    {
      id: 1,
      ground_id: parseInt(groundId),
      ground_name: "Mock Ground",
      team_name: "Thunder Bolts",
      date: new Date().toISOString().split('T')[0],
      start_time: "10:00",
      duration: 2,
      status: "confirmed"
    },
    {
      id: 2,
      ground_id: parseInt(groundId),
      ground_name: "Mock Ground",
      team_name: "Lightning Stars",
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      start_time: "14:00",
      duration: 3,
      status: "confirmed"
    }
  ];

  return c.json(mockBookings);
});

app.get('/api/schedule', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { results } = await c.env.DB.prepare(
    `SELECT b.*, g.name as ground_name 
     FROM bookings b
     JOIN grounds g ON b.ground_id = g.id
     WHERE b.user_id = ? AND b.status != 'cancelled'
     ORDER BY b.date ASC, b.start_time ASC`
  ).bind(user.id).all();

  return c.json(results);
});

// Team management endpoints
app.get('/api/teams/:id/members', authMiddleware, async (c) => {
  const user = c.get('user');
  const teamId = c.req.param('id');
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Check if user is captain or member of the team
  const teamCheck = await c.env.DB.prepare(
    `SELECT id FROM teams WHERE id = ? AND (captain_id = ? OR id IN (
      SELECT tm.team_id FROM team_members tm 
      JOIN players p ON tm.player_id = p.id 
      WHERE p.user_id = ? AND tm.is_active = 1
    ))`
  ).bind(teamId, user.id, user.id).first();

  if (!teamCheck) {
    return c.json({ error: "Not authorized to view team members" }, 403);
  }

  const { results } = await c.env.DB.prepare(
    `SELECT tm.*, p.name as player_name, p.position, p.profile_photo, p.email
     FROM team_members tm
     JOIN players p ON tm.player_id = p.id
     WHERE tm.team_id = ? AND tm.is_active = 1
     ORDER BY tm.joined_at ASC`
  ).bind(teamId).all();

  return c.json(results);
});

app.get('/api/teams/:id/join-requests', authMiddleware, async (c) => {
  const user = c.get('user');
  const teamId = c.req.param('id');
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Check if user is captain of the team
  const team = await c.env.DB.prepare(
    "SELECT id FROM teams WHERE id = ? AND captain_id = ?"
  ).bind(teamId, user.id).first();

  if (!team) {
    return c.json({ error: "Only team captains can view join requests" }, 403);
  }

  const { results } = await c.env.DB.prepare(
    `SELECT tjr.*, p.name as player_name, p.position, p.profile_photo, p.email
     FROM team_join_requests tjr
     JOIN players p ON tjr.player_id = p.id
     WHERE tjr.team_id = ?
     ORDER BY tjr.created_at DESC`
  ).bind(teamId).all();

  return c.json(results);
});

app.post('/api/teams/join-request', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const body = await c.req.json();

  // Get player profile
  const player = await c.env.DB.prepare(
    "SELECT id FROM players WHERE user_id = ?"
  ).bind(user.id).first();

  if (!player) {
    return c.json({ error: "Player profile required to join teams" }, 400);
  }

  // Check if request already exists
  const existingRequest = await c.env.DB.prepare(
    "SELECT id FROM team_join_requests WHERE team_id = ? AND player_id = ? AND status = 'pending'"
  ).bind(body.team_id, player.id).first();

  if (existingRequest) {
    return c.json({ error: "Join request already pending" }, 400);
  }

  const result = await c.env.DB.prepare(
    "INSERT INTO team_join_requests (team_id, player_id, message, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
  ).bind(body.team_id, player.id, body.message || null).run();

  if (result.success) {
    return c.json({ success: true }, 201);
  }

  return c.json({ error: "Failed to send join request" }, 500);
});

app.patch('/api/teams/join-requests/:id', authMiddleware, async (c) => {
  const user = c.get('user');
  const requestId = c.req.param('id');
  const body = await c.req.json();
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Check if user is captain of the team for this request
  const request = await c.env.DB.prepare(
    `SELECT tjr.id, tjr.team_id, tjr.player_id, t.captain_id
     FROM team_join_requests tjr
     JOIN teams t ON tjr.team_id = t.id
     WHERE tjr.id = ?`
  ).bind(requestId).first();

  if (!request || request.captain_id !== user.id) {
    return c.json({ error: "Not authorized to handle this request" }, 403);
  }

  const result = await c.env.DB.prepare(
    "UPDATE team_join_requests SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).bind(body.status, requestId).run();

  // If approved, add player to team
  if (result.success && body.status === 'approved') {
    await c.env.DB.prepare(
      "INSERT INTO team_members (team_id, player_id, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)"
    ).bind(request.team_id, request.player_id).run();
  }

  if (result.success) {
    return c.json({ success: true });
  }

  return c.json({ error: "Failed to update request" }, 500);
});

app.delete('/api/teams/members/:id', authMiddleware, async (c) => {
  const user = c.get('user');
  const memberId = c.req.param('id');
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Check if user is captain of the team for this member
  const member = await c.env.DB.prepare(
    `SELECT tm.id, t.captain_id
     FROM team_members tm
     JOIN teams t ON tm.team_id = t.id
     WHERE tm.id = ?`
  ).bind(memberId).first();

  if (!member || member.captain_id !== user.id) {
    return c.json({ error: "Not authorized to remove this member" }, 403);
  }

  const result = await c.env.DB.prepare(
    "UPDATE team_members SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).bind(memberId).run();

  if (result.success) {
    return c.json({ success: true });
  }

  return c.json({ error: "Failed to remove member" }, 500);
});

export default {
  fetch: app.fetch,
};
