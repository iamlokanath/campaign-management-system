import { Request, Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI if API key is available
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
} else {
  console.warn('No OpenAI API key found. Will use template-based message generation only.');
}

interface ProfileData {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

/**
 * @desc    Generate a personalized message based on profile data
 * @route   POST /api/messages/generate
 * @access  Public
 */
export const generateMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const profileData: ProfileData = req.body;
    
    // Validate required fields
    if (!profileData.name || !profileData.job_title || !profileData.company) {
      res.status(400).json({ 
        success: false, 
        error: 'Name, job title, and company fields are required'
      });
      return;
    }

    let message: string;

    // Use OpenAI if available, otherwise fallback to template
    if (openai && process.env.OPENAI_API_KEY) {
      try {
        // Attempt to use OpenAI
        console.log('Using OpenAI for message generation');
        // OpenAI implementation would go here
        // This is simplified for this example
        message = `Hi ${profileData.name}, I noticed you're working as a ${profileData.job_title} at ${profileData.company}${
          profileData.location ? ` in ${profileData.location}` : ''
        }. ${
          profileData.summary 
            ? `I was impressed by your experience in ${profileData.summary.substring(0, 50)}${profileData.summary.length > 50 ? '...' : ''}.` 
            : ''
        } I'd love to connect and share how our platform could help increase your team's outreach efficiency. Would you be open to a quick chat?`;
      } catch (apiError) {
        console.error('OpenAI API error:', apiError);
        // Fallback to template on API error
        message = generateTemplateMessage(profileData);
      }
    } else {
      // Use template-based generation
      console.log('Using template-based message generation');
      message = generateTemplateMessage(profileData);
    }

    // Return the generated message
    res.status(200).json({
      success: true,
      message: message
    });
  } catch (error) {
    console.error('Error generating message:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error while generating message'
    });
  }
};

/**
 * Generate a message using templates without AI
 */
const generateTemplateMessage = (profile: ProfileData): string => {
  return `Hi ${profile.name}, I noticed you're working as a ${profile.job_title} at ${profile.company}${
    profile.location ? ` in ${profile.location}` : ''
  }. ${
    profile.summary 
      ? `I was impressed by your experience in ${profile.summary.substring(0, 50)}${profile.summary.length > 50 ? '...' : ''}.` 
      : ''
  } I'd love to connect and share how our platform could help increase your team's outreach efficiency. Would you be open to a quick chat?`;
}; 