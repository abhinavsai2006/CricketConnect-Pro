
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ground_id INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  team_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  duration INTEGER NOT NULL,
  total_cost REAL NOT NULL,
  status TEXT DEFAULT 'confirmed',
  payment_method TEXT DEFAULT 'online',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE team_join_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  player_id INTEGER NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_ground_id ON bookings(ground_id);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_team_join_requests_team_id ON team_join_requests(team_id);
CREATE INDEX idx_team_join_requests_player_id ON team_join_requests(player_id);
