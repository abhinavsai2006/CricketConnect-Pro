-- CricketConnect Pro - Vercel Postgres Schema
-- Run this after creating a Vercel Postgres database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Players table
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    position VARCHAR(100),
    batting_style VARCHAR(100),
    bowling_style VARCHAR(100),
    rating DECIMAL(3, 2) DEFAULT 0,
    matches_played INTEGER DEFAULT 0,
    location VARCHAR(255),
    avatar_url TEXT,
    availability VARCHAR(50) DEFAULT 'available',
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    captain_id INTEGER REFERENCES players(id),
    description TEXT,
    max_players INTEGER DEFAULT 11,
    member_count INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team Members junction table
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
    player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
    role VARCHAR(100),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team_id, player_id)
);

-- Grounds table
CREATE TABLE IF NOT EXISTS grounds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    address TEXT,
    facilities TEXT[],
    price_per_hour DECIMAL(10, 2),
    rating DECIMAL(3, 2) DEFAULT 0,
    images TEXT[],
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    ground_id INTEGER REFERENCES grounds(id),
    team_id INTEGER REFERENCES teams(id),
    player_id INTEGER REFERENCES players(id),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration INTEGER NOT NULL, -- in hours
    total_cost DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(100),
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    location VARCHAR(255),
    max_teams INTEGER DEFAULT 16,
    entry_fee DECIMAL(10, 2),
    prize_pool DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER REFERENCES tournaments(id),
    team1_id INTEGER REFERENCES teams(id),
    team2_id INTEGER REFERENCES teams(id),
    ground_id INTEGER REFERENCES grounds(id),
    match_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'scheduled',
    winner_id INTEGER REFERENCES teams(id),
    team1_score VARCHAR(100),
    team2_score VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat Messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
    player_id INTEGER REFERENCES players(id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(50),
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_teams_captain_id ON teams(captain_id);
CREATE INDEX idx_team_members_team_id ON team_members(team_id);
CREATE INDEX idx_team_members_player_id ON team_members(player_id);
CREATE INDEX idx_bookings_ground_id ON bookings(ground_id);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_player_id ON bookings(player_id);
CREATE INDEX idx_matches_tournament_id ON matches(tournament_id);
CREATE INDEX idx_chat_messages_team_id ON chat_messages(team_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);

-- Insert sample data (optional)
INSERT INTO players (name, position, batting_style, bowling_style, rating, matches_played, location, availability, bio) VALUES
('Virat Sharma', 'Batsman', 'Right-hand bat', 'Right-arm medium', 4.8, 45, 'Mumbai, India', 'available', 'Aggressive batsman with excellent technique'),
('Rohit Patel', 'All-rounder', 'Right-hand bat', 'Right-arm off-spin', 4.6, 38, 'Delhi, India', 'available', 'Versatile all-rounder'),
('Jasprit Kumar', 'Bowler', 'Right-hand bat', 'Right-arm fast', 4.7, 42, 'Gujarat, India', 'available', 'Fast bowler with deadly yorkers'),
('MS Reddy', 'Wicket-keeper', 'Right-hand bat', 'N/A', 4.9, 50, 'Chennai, India', 'available', 'Experienced wicket-keeper batsman');

INSERT INTO grounds (name, location, address, facilities, price_per_hour, rating, available) VALUES
('Wankhede Stadium Ground', 'Mumbai', 'D Road, Churchgate, Mumbai', ARRAY['Parking', 'Lights', 'Changing Rooms', 'Scoreboard'], 5000.00, 4.8, true),
('Eden Gardens Practice Ground', 'Kolkata', 'BBD Bagh, Kolkata', ARRAY['Parking', 'Lights', 'Café'], 4500.00, 4.7, true),
('Chepauk Ground', 'Chennai', 'Chepauk, Chennai', ARRAY['Parking', 'Lights', 'Changing Rooms'], 4000.00, 4.6, true);
