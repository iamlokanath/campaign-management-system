# Campaign Management System

A full-stack application for managing outreach campaigns and generating personalized LinkedIn messages.

## Features

- Create, Read, Update, and Delete campaigns
- Toggle campaign status between Active and Inactive
- Generate personalized outreach messages using OpenAI
- Modern React UI with Material UI

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- OpenAI API

### Frontend

- React
- TypeScript
- Material UI
- React Router

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/OutFlo-Assignment.git
   cd OutFlo-Assignment
   ```

2. Install backend dependencies

   ```
   cd server
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:

   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Install frontend dependencies
   ```
   cd ../client
   npm install
   ```

### Running the application

1. Start the backend server

   ```
   cd server
   npm run dev
   ```

2. Start the frontend development server

   ```
   cd ../client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Campaign Endpoints

- `GET /api/campaigns` - Get all active and inactive campaigns
- `GET /api/campaigns/:id` - Get a specific campaign by ID
- `POST /api/campaigns` - Create a new campaign
- `PUT /api/campaigns/:id` - Update an existing campaign
- `DELETE /api/campaigns/:id` - Soft delete a campaign (sets status to DELETED)

### Message Generation Endpoint

- `POST /api/personalized-message` - Generate a personalized LinkedIn outreach message

## Project Structure

```
/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── pages/          # Page components
│       ├── services/       # API service functions
│       └── types/          # TypeScript type definitions
└── server/                 # Backend Express application
    ├── src/
    │   ├── config/         # Configuration files
    │   ├── controllers/    # Request handlers
    │   ├── models/         # MongoDB models
    │   ├── routes/         # API routes
    │   └── utils/          # Utility functions
    └── .env                # Environment variables
```
