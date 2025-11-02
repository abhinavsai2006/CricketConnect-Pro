
INSERT INTO players (user_id, name, email, position, batting_style, bowling_style, experience_years, rating, location, bio, is_available) VALUES
('demo_user_1', 'Rajesh Kumar', 'rajesh@example.com', 'Batsman', 'Right-handed', NULL, 5, 4, 'Mumbai', 'Aggressive opener with strong technique', 1),
('demo_user_2', 'Priya Sharma', 'priya@example.com', 'All-rounder', 'Right-handed', 'Right-arm Spin', 3, 4, 'Delhi', 'Versatile player, good with both bat and ball', 1),
('demo_user_3', 'Amit Singh', 'amit@example.com', 'Bowler', NULL, 'Right-arm Fast', 7, 5, 'Bangalore', 'Fast bowler with excellent line and length', 1),
('demo_user_4', 'Sneha Patel', 'sneha@example.com', 'Wicket-keeper', 'Left-handed', NULL, 4, 4, 'Chennai', 'Reliable wicket-keeper with quick reflexes', 1),
('demo_user_5', 'Rahul Gupta', 'rahul@example.com', 'All-rounder', 'Right-handed', 'Left-arm Spin', 6, 4, 'Pune', 'Experienced all-rounder and team captain', 1),
('demo_user_6', 'Kavya Reddy', 'kavya@example.com', 'Batsman', 'Left-handed', NULL, 2, 3, 'Hyderabad', 'Young talent with great potential', 1);

INSERT INTO teams (name, description, captain_id, location, max_players) VALUES
('Mumbai Warriors', 'Competitive team for weekend tournaments', 'demo_user_1', 'Mumbai', 11),
('Delhi Challengers', 'Friendly team looking for regular matches', 'demo_user_2', 'Delhi', 11),
('Bangalore Strikers', 'Professional team with experienced players', 'demo_user_3', 'Bangalore', 11);

INSERT INTO grounds (name, description, location, address, price_per_hour, amenities, rating, total_reviews, is_available) VALUES
('Lord''s Cricket Ground', 'Premium cricket ground with excellent facilities', 'Mumbai, Maharashtra', '123 Cricket Street, Mumbai', 2500, 'parking,wifi,food,security', 4.8, 156, 1),
('Champions Stadium', 'Modern stadium with all amenities', 'Delhi, India', '456 Stadium Road, Delhi', 3000, 'parking,wifi,food', 4.6, 203, 1),
('Green Field Cricket Club', 'Beautiful ground in peaceful location', 'Bangalore, Karnataka', '789 Club Avenue, Bangalore', 1800, 'parking,security', 4.4, 89, 0),
('Riverside Cricket Ground', 'Scenic ground near the river', 'Chennai, Tamil Nadu', '321 River Road, Chennai', 2200, 'wifi,food,security', 4.7, 124, 1);
