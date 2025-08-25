<div align="center">

TripMate: Your Intelligent Travel Planner
<br/>

<br/>

TripMate is a modern, AI-powered web application designed to simplify and enhance the travel planning experience. By migrating from an older stack to a powerful React and Firebase architecture, TripMate offers a fast, collaborative, and intelligent platform for organizing trips, managing expenses, and discovering new destinations.

</div>

✨ Key Features & Use Cases

   . TripMate is built around a suite of features designed to address every stage of the travel planning process.
    
   . Seamless User Authentication: Secure sign-up, login, and password recovery flows.
    
   . Centralized Dashboard: A main hub for all travel planning activities with intuitive navigation.
    
   . Dynamic Itinerary Management: Create, edit, and delete detailed, day-by-day trip itineraries.
    
   . Collaborative Expense Tracking: Log costs, categorize spending, and visualize the trip's budget in real-time.
    
   . AI-Powered Recommendations: Leverage the Google Gemini API for personalized suggestions on hotels, attractions, and restaurants based on your travel style.

🚀 Tech Stack
This project is built with a modern, scalable, and efficient technology stack.

<div align="center">
.  Frontend: React (with Vite for a fast development experience)

.  Backend & Database: Google Firebase (including Firestore, Authentication, and Hosting)

.  Routing: React Router DOM

.  Component Library: Material-UI (or a similar modern UI kit)

.  AI Services: Google Gemini API
</div>

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

To get a local copy up and running, follow these simple steps :-

.  Prerequisites

   --> Node.js (v18 or later)
    -->npm

.  Installation & Setup

 -->   Clone the repository:
    
 -->  git clone https://github.com/FardeenKhan-19/tripmate-react.git
    
 -->   Navigate to the project directory:
    
 -->   cd tripmate-react

.  Install NPM packages:

    npm install

.  Set up Firebase:

    Create a .env file in the root of the project.
    
    Add your Firebase configuration details to the .env file.

.  Run the development server:

    npm run dev

👥 Team Roles & Responsibilities :-

This project's development is distributed among a team of four, with each member leading a critical component of the application.

* Khan Fardeen Firoz (Technical, Authentication & UI Kit Lead): Responsible for setting up the entire project foundation, including the Firebase backend, React app structure and all user authentication flows along with building the shared component library.

* Shah Sufiyan Javed (Dashboard & Core Features Lead): Responsible for creating the main application shell &  building the data-heavy Itinerary and Expenses pages and their Firestore integrations.

* Shaikh Afrah Rafiq (AI & Recommendations Lead): Responsible for integrating the Google Gemini API and building the AI Assistant feature.
