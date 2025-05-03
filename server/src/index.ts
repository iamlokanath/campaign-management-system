import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import campaignRoutes from './routes/campaignRoutes';
import messageRoutes from './routes/messageRoutes';
import linkedinRoutes from './routes/linkedinRoutes';

// Load env vars
dotenv.config();

// Initialize app
const app: Application = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Mount routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/profiles', linkedinRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Test route to check API connectivity
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API connection successful!' });
});

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    // Try to connect to MongoDB, but continue even if it fails
    await connectDB().catch(err => {
      console.warn('MongoDB connection failed:', err.message);
      console.warn('Running in memory-only mode - data will not be persisted!');
    });

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer(); 