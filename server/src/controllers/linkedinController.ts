import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Define the LinkedIn Profile schema if not already defined
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: false },
  profileUrl: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Get or create the model
const LinkedInProfile = mongoose.models.LinkedInProfile || 
  mongoose.model('LinkedInProfile', profileSchema);

// @desc    Get all LinkedIn profiles
// @route   GET /api/profiles
// @access  Public
export const getProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search } = req.query;
    let query = {};
    
    // If search parameter exists, add it to the query
    if (search && typeof search === 'string') {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { jobTitle: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const profiles = await LinkedInProfile.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: profiles.length, data: profiles });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'An unknown error occurred' });
    }
  }
};

// @desc    Get single LinkedIn profile
// @route   GET /api/profiles/:id
// @access  Public
export const getProfileById = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await LinkedInProfile.findById(req.params.id);
    
    if (!profile) {
      res.status(404).json({ success: false, error: 'Profile not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'An unknown error occurred' });
    }
  }
};

// @desc    Create LinkedIn profile
// @route   POST /api/profiles
// @access  Public
export const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, jobTitle, company, location, profileUrl } = req.body;
    
    // Validation
    if (!name || !jobTitle || !company || !profileUrl) {
      res.status(400).json({ 
        success: false, 
        error: 'Please provide name, job title, company, and profile URL' 
      });
      return;
    }
    
    // Check if profile with the same URL already exists
    const existingProfile = await LinkedInProfile.findOne({ profileUrl });
    if (existingProfile) {
      res.status(400).json({ 
        success: false, 
        error: 'Profile with this URL already exists' 
      });
      return;
    }
    
    // Create new profile
    const profile = await LinkedInProfile.create({
      name,
      jobTitle,
      company,
      location,
      profileUrl
    });
    
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message });
    } else {
      res.status(400).json({ success: false, error: 'An unknown error occurred' });
    }
  }
};

// @desc    Delete LinkedIn profile
// @route   DELETE /api/profiles/:id
// @access  Public
export const deleteProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await LinkedInProfile.findByIdAndDelete(req.params.id);
    
    if (!profile) {
      res.status(404).json({ success: false, error: 'Profile not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'An unknown error occurred' });
    }
  }
}; 