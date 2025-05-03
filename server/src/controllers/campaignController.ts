import { Request, Response } from 'express';
import Campaign, { CampaignStatus } from '../models/Campaign';
import mongoose from 'mongoose';

// @desc    Get all campaigns (excluding deleted)
// @route   GET /api/campaigns
// @access  Public
export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaigns = await Campaign.find({ status: { $ne: CampaignStatus.DELETED } });
    res.status(200).json({ success: true, data: campaigns });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'An unknown error occurred' });
    }
  }
};

// @desc    Get single campaign by ID
// @route   GET /api/campaigns/:id
// @access  Public
export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await Campaign.findOne({ 
      _id: req.params.id,
      status: { $ne: CampaignStatus.DELETED }
    });

    if (!campaign) {
      res.status(404).json({ success: false, error: 'Campaign not found' });
      return;
    }

    res.status(200).json({ success: true, data: campaign });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'An unknown error occurred' });
    }
  }
};

// @desc    Create a new campaign
// @route   POST /api/campaigns
// @access  Public
export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Create campaign request body:', req.body);

    // Extract data from request
    const { name, description, status, leads, accountIDs } = req.body;

    // Validate required fields
    if (!name || !description) {
      res.status(400).json({ 
        success: false, 
        error: 'Name and description are required fields' 
      });
      return;
    }

    // Validate status if provided
    if (status && !Object.values(CampaignStatus).includes(status.toLowerCase())) {
      res.status(400).json({ 
        success: false, 
        error: `Status must be one of: ${Object.values(CampaignStatus).join(', ')}` 
      });
      return;
    }

    // Defensive: Parse accountIDs if it's a string
    let parsedAccountIDs = accountIDs;
    if (typeof parsedAccountIDs === 'string') {
      try {
        parsedAccountIDs = JSON.parse(parsedAccountIDs);
      } catch {
        parsedAccountIDs = [];
      }
    }

    // Create campaign object with validated data
    const campaignData: {
      name: string;
      description: string;
      status: CampaignStatus;
      leads: string[];
      accountIDs: (mongoose.Types.ObjectId | string)[];
    } = {
      name,
      description,
      status: status ? status.toLowerCase() : CampaignStatus.ACTIVE,
      leads: Array.isArray(leads) ? leads.filter(lead => lead.trim() !== '') : [],
      accountIDs: []
    };

    // Convert accountIDs strings to ObjectIds if provided
    if (Array.isArray(parsedAccountIDs) && parsedAccountIDs.length > 0) {
      campaignData.accountIDs = parsedAccountIDs
        .filter(id => mongoose.Types.ObjectId.isValid(id))
        .map(id => new mongoose.Types.ObjectId(id));
    }

    console.log('Processed campaign data:', campaignData);

    // Create the campaign with validated data
    const campaign = await Campaign.create(campaignData);
    
    res.status(201).json({ success: true, data: campaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message });
    } else {
      res.status(400).json({ success: false, error: 'An unknown error occurred' });
    }
  }
};

// @desc    Update campaign
// @route   PUT /api/campaigns/:id
// @access  Public
export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ensure only allowed status values
    if (req.body.status && !Object.values(CampaignStatus).includes(req.body.status.toLowerCase())) {
      res.status(400).json({ 
        success: false, 
        error: `Status must be one of: ${Object.values(CampaignStatus).join(', ')}` 
      });
      return;
    }

    // Convert status to lowercase if provided
    if (req.body.status) {
      req.body.status = req.body.status.toLowerCase();
    }

    // Handle accountIDs conversion if provided
    let parsedUpdateAccountIDs = req.body.accountIDs;
    if (typeof parsedUpdateAccountIDs === 'string') {
      try {
        parsedUpdateAccountIDs = JSON.parse(parsedUpdateAccountIDs);
      } catch {
        parsedUpdateAccountIDs = [];
      }
    }
    if (Array.isArray(parsedUpdateAccountIDs)) {
      req.body.accountIDs = parsedUpdateAccountIDs
        .filter((id: string) => mongoose.Types.ObjectId.isValid(id))
        .map((id: string) => new mongoose.Types.ObjectId(id));
    }

    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!campaign) {
      res.status(404).json({ success: false, error: 'Campaign not found' });
      return;
    }

    res.status(200).json({ success: true, data: campaign });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message });
    } else {
      res.status(400).json({ success: false, error: 'An unknown error occurred' });
    }
  }
};

// @desc    Soft delete campaign
// @route   DELETE /api/campaigns/:id
// @access  Public
export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: CampaignStatus.DELETED },
      { new: true }
    );

    if (!campaign) {
      res.status(404).json({ success: false, error: 'Campaign not found' });
      return;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message });
    } else {
      res.status(400).json({ success: false, error: 'An unknown error occurred' });
    }
  }
}; 