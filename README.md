TripMate: Your Intelligent Travel Planner
TripMate is a modern, AI-powered web application designed to simplify and enhance the travel planning experience. By migrating from an older stack to a powerful React and Firebase architecture, TripMate offers a fast, collaborative, and intelligent platform for organizing trips, managing expenses, and discovering new destinations.

✨ Key Features & Use Cases
TripMate is built around a suite of features designed to address every stage of the travel planning process.

1. Seamless User Authentication
Secure Sign-Up & Login: Users can create an account and log in securely using their email and password.

Password Recovery: A "Forgot Password" flow allows users to reset their credentials with ease.

Persistent State: Authentication state is managed globally, ensuring users remain logged in as they navigate the application.

2. Centralized Dashboard & Layout
Main Dashboard: After logging in, users are greeted with a central dashboard that serves as the main hub for all their travel planning activities.

Intuitive Navigation: A persistent sidebar and header provide easy access to all key features like the Itinerary, Expenses, and the AI Assistant.

Responsive Design: The layout is designed to be fully responsive, providing a seamless experience on both desktop and mobile devices.

3. Core Planning Tools
Dynamic Itinerary Management: Users can create detailed, day-by-day itineraries for their trips. They can add, edit, and delete activities, flights, and accommodation details.

Collaborative Expense Tracking: A dedicated expenses page allows users and their travel companions to log costs, categorize spending, and visualize the trip's budget in real-time.

4. AI-Powered Assistant & Recommendations
Intelligent Suggestions: Leveraging the Google Gemini API, the "AI Assistant" provides personalized recommendations for hotels, attractions, and restaurants.

Preference-Based Results: The AI considers the user's destination, budget, and travel style (e.g., "adventure," "relaxation," "family-friendly") to generate tailored suggestions.

Visual Discovery: Recommendations are presented in a clean, card-based UI, making it easy for users to browse and add suggestions directly to their itinerary.

🚀 Tech Stack
This project is built with a modern, scalable, and efficient technology stack.

Frontend: React (with Vite for a fast development experience)

Backend & Database: Google Firebase (including Firestore, Authentication, and Hosting)

Routing: React Router DOM

Component Library: Material-UI (or a similar modern UI kit)

AI Services: Google Gemini API

📂 Project Structure
The project follows a structured and scalable folder organization to ensure maintainability.

/src
├── assets/         # Static assets like images, fonts
├── components/     # Reusable UI components (Button, Card, Sidebar)
├── contexts/       # React Context for global state (AuthContext)
├── hooks/          # Custom hooks (useAuth)
├── pages/          # Full-page components (LoginPage, DashboardLayout)
└── services/       # Logic for external services (Firebase, Gemini API)

🏁 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

npm

Installation & Setup
Clone the repository:

git clone https://github.com/FardeenKhan-19/tripmate-react.git

Navigate to the project directory:

cd tripmate-react

Install NPM packages:

npm install

Set up Firebase:

Create a .env file in the root of the project.

Add your Firebase configuration details to the .env file.

Run the development server:

npm run dev

👥 Team Roles & Responsibilities
This project's development is distributed among a team of four, with each member leading a critical component of the application.

Member 1 (Authentication & UI Kit Lead): Responsible for all user authentication flows and building the shared component library.
Member 2 (Dashboard & Layout Lead): Responsible for creating the main application shell, including the sidebar and header.

Member 3 (Core Features Lead): Responsible for building the data-heavy Itinerary and Expenses pages and their Firestore integrations.

Member 4 (AI & Recommendations Lead): Responsible for integrating the Google Gemini API and building the AI Assistant feature.
