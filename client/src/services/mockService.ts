// Mock data and services for development when backend is not available
import { useState } from 'react';

// Mock Campaign data
export interface Campaign {
    _id: string;
    name: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
    leads: string[];
    accountIDs: string[];
}

// Sample campaign data
const MOCK_CAMPAIGNS: Campaign[] = [
    {
        _id: 'mock1',
        name: 'Software Engineers Campaign',
        description: 'Campaign targeting software engineers in tech companies',
        status: 'ACTIVE',
        leads: ['https://linkedin.com/in/profile-1', 'https://linkedin.com/in/profile-2'],
        accountIDs: ['acc1', 'acc2']
    },
    {
        _id: 'mock2',
        name: 'Marketing Executives',
        description: 'Campaign for marketing execs in retail industry',
        status: 'INACTIVE',
        leads: ['https://linkedin.com/in/profile-3'],
        accountIDs: ['acc3']
    }
];

// Mock services
export const mockServices = {
    // Get all campaigns
    getCampaigns: async (): Promise<Campaign[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([...MOCK_CAMPAIGNS]);
            }, 500);
        });
    },

    // Get campaign by ID
    getCampaignById: async (id: string): Promise<Campaign | null> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const campaign = MOCK_CAMPAIGNS.find(c => c._id === id) || null;
                resolve(campaign ? { ...campaign } : null);
            }, 300);
        });
    },

    // Create new campaign
    createCampaign: async (campaign: Omit<Campaign, '_id'>): Promise<Campaign> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const newCampaign = {
                    ...campaign,
                    _id: `mock${Date.now()}`
                };
                MOCK_CAMPAIGNS.push(newCampaign);
                resolve({ ...newCampaign });
            }, 600);
        });
    },

    // Update campaign
    updateCampaign: async (id: string, updates: Partial<Campaign>): Promise<Campaign | null> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const index = MOCK_CAMPAIGNS.findIndex(c => c._id === id);
                if (index !== -1) {
                    MOCK_CAMPAIGNS[index] = { ...MOCK_CAMPAIGNS[index], ...updates };
                    resolve({ ...MOCK_CAMPAIGNS[index] });
                } else {
                    resolve(null);
                }
            }, 500);
        });
    },

    // Delete campaign (set status to DELETED)
    deleteCampaign: async (id: string): Promise<boolean> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const index = MOCK_CAMPAIGNS.findIndex(c => c._id === id);
                if (index !== -1) {
                    MOCK_CAMPAIGNS[index].status = 'DELETED';
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 400);
        });
    },

    // Generate message
    generateMessage: async (profile: { 
        name: string; 
        job_title: string; 
        company: string; 
        location: string; 
        summary: string; 
    }): Promise<{message: string}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const message = `Hi ${profile.name}, I noticed you're working as a ${profile.job_title} at ${profile.company} in ${profile.location}. ${
                    profile.summary ? `I was impressed by your experience in ${profile.summary.split(' ').slice(0, 5).join(' ')}...` : ''
                } I'd love to connect and share how our platform could help increase your team's outreach efficiency. Would you be open to a quick chat?`;
                
                resolve({ message });
            }, 1200);
        });
    }
};

// Hook to use mock service when backend is unavailable
export const useMockService = () => {
    const [isUsingMock, setIsUsingMock] = useState(false);
    
    return {
        isUsingMock,
        enableMockService: () => setIsUsingMock(true),
        disableMockService: () => setIsUsingMock(false),
        mockServices
    };
};

export default mockServices; 