import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import '../styles/CampaignList.css';
import '../styles/NewCampaign.css';
import mockServices from '../services/mockService';

interface Campaign {
    _id: string;
    name: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
    leads: string[];
    accountIDs: string[];
}

const CampaignList: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [useMockData, setUseMockData] = useState<boolean>(false);
    const [apiConnected, setApiConnected] = useState<boolean | null>(null);
    const navigate = useNavigate();

    // Test API connection before fetching data
    const testApiConnection = async (): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/test`, {
                method: 'GET',
                signal: AbortSignal.timeout(5000)
            }).catch(() => {
                throw new Error("Network error: Cannot connect to the server");
            });

            if (response.ok) {
                const data = await response.json();
                return data.success === true;
            }
            return false;
        } catch (err) {
            console.error("API connection test failed:", err);
            return false;
        }
    };

    const fetchCampaigns = useCallback(async () => {
        // If using mock data, get campaigns from mock service
        if (useMockData) {
            try {
                setLoading(true);
                const data = await mockServices.getCampaigns();
                setCampaigns(data);
                setError(null);
            } catch (err: any) {
                setError(`Error with mock data: ${err.message}`);
            } finally {
                setLoading(false);
            }
            return;
        }

        // Test API connectivity first
        const isConnected = await testApiConnection();
        setApiConnected(isConnected);

        if (!isConnected) {
            setError('Cannot connect to the server. Please check if the backend is running or use mock data.');
            setLoading(false);
            return;
        }

        // Otherwise, attempt to fetch from real API
        try {
            setLoading(true);

            console.log(`Fetching campaigns from: ${API_URL}/campaigns`);

            const response = await fetch(`${API_URL}/campaigns`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                // Add a reasonable timeout for the request
                signal: AbortSignal.timeout(10000)
            }).catch(err => {
                console.error("Network error:", err);
                throw new Error("Network error: Cannot connect to the server");
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.text();
                console.error('API Error:', errorData);
                throw new Error(`Failed to fetch campaigns: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Campaign data received:', data);

            // If API returns null or undefined, provide empty array
            setCampaigns(data.data || []);
            setError(null);
        } catch (err: any) {
            console.error('Fetch error:', err);

            if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('Network error'))) {
                setError('Cannot connect to the server. Please check if the backend is running or use mock data.');
            } else {
                setError(`Failed to load campaigns: ${err.message}`);
            }

            // Set empty array to avoid rendering issues
            setCampaigns([]);
        } finally {
            setLoading(false);
        }
    }, [useMockData]);

    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

        // If using mock data, update with mock service
        if (useMockData) {
            try {
                await mockServices.updateCampaign(id, { status: newStatus as 'ACTIVE' | 'INACTIVE' });
                setCampaigns(campaigns.map(campaign =>
                    campaign._id === id ? { ...campaign, status: newStatus as 'ACTIVE' | 'INACTIVE' } : campaign
                ));
            } catch (err: any) {
                setError(`Error updating mock campaign: ${err.message}`);
            }
            return;
        }

        // Otherwise use real API
        try {
            const response = await fetch(`${API_URL}/campaigns/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update campaign status: ${errorText}`);
            }

            // Update the local state
            setCampaigns(campaigns.map(campaign =>
                campaign._id === id ? { ...campaign, status: newStatus as 'ACTIVE' | 'INACTIVE' } : campaign
            ));
        } catch (err: any) {
            setError(`Failed to update campaign status: ${err.message}`);
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            // If using mock data, delete with mock service
            if (useMockData) {
                try {
                    await mockServices.deleteCampaign(id);
                    fetchCampaigns();
                } catch (err: any) {
                    setError(`Error deleting mock campaign: ${err.message}`);
                }
                return;
            }

            // Otherwise use real API
            try {
                const response = await fetch(`${API_URL}/campaigns/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to delete campaign: ${errorText}`);
                }

                // Remove from UI
                fetchCampaigns(); // Refresh the list
            } catch (err: any) {
                setError(`Failed to delete campaign: ${err.message}`);
                console.error(err);
            }
        }
    };

    const toggleMockData = () => {
        setUseMockData(!useMockData);
    };

    if (loading) {
        return <div className="loading">Loading campaigns...</div>;
    }

    return (
        <div className="campaign-list-page">
            {/* Campaign Creation Steps UI */}
            <div className="new-campaign">
                <div className="campaign-header">
                    <h1>Create New Campaign</h1>
                    <p>Start building your marketing campaign in a few simple steps</p>
                </div>
                <div className="campaign-steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Campaign Details</h3>
                        <p>Enter basic information about your campaign</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Target Audience</h3>
                        <p>Define who you want to reach</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Content & Design</h3>
                        <p>Create your campaign content</p>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>Review & Launch</h3>
                        <p>Final check and launch your campaign</p>
                    </div>
                </div>
                <div className="campaign-actions">
                    <button
                        className="start-button"
                        onClick={() => navigate('/create-campaign')}
                    >
                        Start Creating
                    </button>
                </div>
            </div>

            <div className="campaign-list-container">
                <h2>Campaigns</h2>

                {/* <div className="mock-data-toggle">
                    <label>
                        <input
                            type="checkbox"
                            checked={useMockData}
                            onChange={toggleMockData}
                        />
                        Use mock data (for development without backend)
                    </label>
                </div> */}

                {error && (
                    <div className="error">
                        <p>{error}</p>
                        <div className="error-actions">
                            <button
                                className="button retry-button"
                                onClick={() => {
                                    setError(null);
                                    fetchCampaigns();
                                }}
                            >
                                Retry
                            </button>

                            {!useMockData && error.includes('Cannot connect') && (
                                <button
                                    className="button mock-button"
                                    onClick={() => setUseMockData(true)}
                                >
                                    Use Mock Data
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {!error && campaigns.length === 0 ? (
                    <div className="no-campaigns">
                        <p>No campaigns found. Create your first campaign!</p>
                        <button className="button create-button" onClick={() => navigate('/create-campaign')}>Create Campaign</button>
                    </div>
                ) : (
                    !error && (
                        <>
                            {/* <button className="button create-button" onClick={() => navigate('/create-campaign')}>Create New Campaign</button> */}
                            <div className="campaign-list">
                                {campaigns.map((campaign) => (
                                    <div key={campaign._id} className={`campaign-card ${campaign.status.toLowerCase()}`}>
                                        <div className="campaign-header">
                                            <h3>{campaign.name}</h3>
                                            <span className={`status-badge ${campaign.status.toLowerCase()}`}>
                                                {campaign.status}
                                            </span>
                                        </div>
                                        <p className="campaign-description">{campaign.description}</p>
                                        <div className="campaign-details">
                                            <div>
                                                <strong>Leads:</strong> {campaign.leads.length}
                                            </div>
                                            <div>
                                                <strong>Accounts:</strong> {campaign.accountIDs.length}
                                            </div>
                                        </div>
                                        <div className="campaign-actions">

                                            <button
                                                className={`toggle-button ${campaign.status === 'ACTIVE' ? 'active' : 'inactive'}`}
                                                onClick={() => handleToggleStatus(campaign._id, campaign.status)}
                                            >
                                                {campaign.status === 'ACTIVE' ? 'Set Inactive' : 'Set Active'}
                                            </button>
                                            <Link to={`/edit-campaign/${campaign._id}`} className="button edit-button">
                                                Edit
                                            </Link>
                                            <button
                                                className="button delete-button"
                                                onClick={() => handleDelete(campaign._id)}
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    );
};

export default CampaignList; 