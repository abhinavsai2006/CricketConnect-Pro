// This file mocks the /api/users/me endpoint for development bypass
export function setupMockApi() {
  // Intercept fetch requests
  const originalFetch = window.fetch;
  window.fetch = async (input, init) => {
    if (typeof input === "string") {
      // Mock POST /api/bookings/:id/cancel
      const cancelMatch = input.match(/\/api\/bookings\/(\d+)\/cancel/);
      if (cancelMatch && init && init.method === "POST") {
        return new Response(
          JSON.stringify({ success: true, message: "Booking cancelled!" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      // Mock GET /api/bookings/my
      if (input.includes("/api/bookings/my") && (!init || init.method === "GET")) {
        return new Response(
          JSON.stringify([
            {
              id: 1,
              ground_id: 3,
              ground_name: "Eden Gardens",
              team_name: "Demo",
              contact_number: "7984141818",
              date: "2025-09-25",
              start_time: "10:00",
              duration: 4,
              total_cost: 13440,
              status: "confirmed",
              payment_method: "Pay at Ground",
              special_requests: null,
              created_at: "2025-09-18T10:00:00.000Z"
            }
          ]),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      // Mock /api/users/me
      if (input.includes("/api/users/me")) {
        return new Response(
          JSON.stringify({
            email: "demo@bypass.com",
            google_user_data: {
              given_name: "Demo",
              name: "Demo User",
              picture: "https://ui-avatars.com/api/?name=Demo+User"
            }
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      // Mock /api/players
      if (input.includes("/api/players") && !input.includes("/api/players/me")) {
        return new Response(
          JSON.stringify([
            {
              id: 1,
              name: "Sachin Tendulkar",
              email: "sachin@demo.com",
              role: "Batsman",
              rating: 4.9,
              avatar: "https://ui-avatars.com/api/?name=Sachin+Tendulkar"
            },
            {
              id: 2,
              name: "Virat Kohli",
              email: "virat@demo.com",
              role: "Batsman",
              rating: 4.8,
              avatar: "https://ui-avatars.com/api/?name=Virat+Kohli"
            },
            {
              id: 3,
              name: "Jasprit Bumrah",
              email: "bumrah@demo.com",
              role: "Bowler",
              rating: 4.7,
              avatar: "https://ui-avatars.com/api/?name=Jasprit+Bumrah"
            }
          ]),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      // Mock /api/players/me
      if (input.includes("/api/players/me")) {
        return new Response(
          JSON.stringify({
            id: 99,
            name: "Demo User",
            email: "demo@bypass.com",
            role: "All-rounder",
            rating: 4.5,
            avatar: "https://ui-avatars.com/api/?name=Demo+User"
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      // Mock DELETE /api/teams/:id
      const deleteTeamMatch = input.match(/\/api\/teams\/(\d+)$/);
      if (deleteTeamMatch && init && init.method === "DELETE") {
        return new Response(
          JSON.stringify({ success: true, message: "Team deleted successfully!" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      // Mock /api/teams (GET)
      if (input.includes("/api/teams") && (!init || init.method === "GET")) {
        return new Response(
          JSON.stringify([
            {
              id: 1,
              name: "Mumbai Indians",
              member_count: 11,
              max_players: 11,
              captain: "Rohit Sharma",
              created_at: "2025-08-01T10:00:00.000Z"
            },
            {
              id: 2,
              name: "Chennai Super Kings",
              member_count: 10,
              max_players: 11,
              captain: "MS Dhoni",
              created_at: "2025-07-15T15:30:00.000Z"
            }
          ]),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      // Mock /api/grounds
      if (input.includes("/api/grounds")) {
        return new Response(
          JSON.stringify([
            {
              id: 1,
              name: "Wankhede Stadium",
              location: "Mumbai",
              address: "Churchgate, Mumbai, Maharashtra 400020",
              description: "Iconic cricket stadium in Mumbai.",
              price_per_hour: 2500,
              amenities: "parking,wifi,food,security",
              rating: 4.8,
              total_reviews: 120,
              is_available: true
            },
            {
              id: 2,
              name: "M. A. Chidambaram Stadium",
              location: "Chennai",
              address: "Chepauk, Chennai, Tamil Nadu 600005",
              description: "Historic ground in Chennai.",
              price_per_hour: 1800,
              amenities: "parking,food,security",
              rating: 4.6,
              total_reviews: 98,
              is_available: false
            },
            {
              id: 3,
              name: "Eden Gardens",
              location: "Kolkata",
              address: "B.B.D. Bagh, Kolkata, West Bengal 700021",
              description: "Famous cricket ground in Kolkata.",
              price_per_hour: 3200,
              amenities: "parking,wifi,security",
              rating: 4.9,
              total_reviews: 150,
              is_available: true
            }
          ]),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      // Mock POST /api/bookings
      if (input.includes("/api/bookings") && init && init.method === "POST") {
        // Optionally, you can parse the body and log it for debugging:
        // const bookingData = JSON.parse(init.body);
        return new Response(
          JSON.stringify({ success: true, message: "Booking confirmed!" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    }
    return originalFetch(input, init);
  };
}
