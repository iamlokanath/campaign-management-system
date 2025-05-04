import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import '../styles/CampaignForm.css';
import axios from 'axios';

interface CampaignFormData {
    name: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE';
    leads: string[];
    accountIDs: string[];
}

const CampaignForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState<CampaignFormData>({
        name: '',
        description: '',
        status: 'ACTIVE',
        leads: [''],
        accountIDs: [''],
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

    const fetchCampaign = useCallback(async () => {
        if (!id) return;
        try {
            const response = await axios.get(`${API_URL}/campaigns/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching campaign:', error);
        }
    }, [id]);

    useEffect(() => {
        if (isEditMode) {
            fetchCampaign();
        }
    }, [fetchCampaign, isEditMode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleArrayInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        field: 'leads' | 'accountIDs'
    ) => {
        const newArray = [...formData[field]];
        newArray[index] = e.target.value;
        setFormData({
            ...formData,
            [field]: newArray,
        });
    };

    const addArrayItem = (field: 'leads' | 'accountIDs') => {
        setFormData({
            ...formData,
            [field]: [...formData[field], ''],
        });
    };

    const removeArrayItem = (index: number, field: 'leads' | 'accountIDs') => {
        if (formData[field].length <= 1) return; // Always keep at least one input

        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData({
            ...formData,
            [field]: newArray,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Filter out empty leads and accountIDs
        const dataToSubmit = {
            ...formData,
            leads: formData.leads.filter(lead => lead.trim() !== ''),
            accountIDs: formData.accountIDs.filter(id => id.trim() !== ''),
        };

        try {
            setLoading(true);
            setError(null);

            const url = isEditMode
                ? `${API_URL}/campaigns/${id}`
                : `${API_URL}/campaigns`;

            const method = isEditMode ? 'PUT' : 'POST';

            console.log('Submitting campaign data:', dataToSubmit);

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });

            const responseData = await response.json();

            if (!response.ok) {
                const errorMessage = responseData.error || `Failed to ${isEditMode ? 'update' : 'create'} campaign`;
                throw new Error(errorMessage);
            }

            console.log('Campaign saved successfully:', responseData);
            setSubmitSuccess(true);

            // Redirect after successful submission
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err: any) {
            console.error('Error saving campaign:', err);
            setError(`Failed to ${isEditMode ? 'update' : 'create'} campaign: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) {
        return <div className="loading">Loading campaign data...</div>;
    }

    return (
        <div className="campaign-form-container">
            <h2>{isEditMode ? 'Edit Campaign' : 'Create New Campaign'}</h2>

            {submitSuccess && (
                <div className="success-message">
                    Campaign successfully {isEditMode ? 'updated' : 'created'}! Redirecting...
                </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="campaign-form">
                <div className="form-group">
                    <label htmlFor="name">Campaign Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter campaign name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Describe your campaign"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>LinkedIn Profile URLs:</label>

                    {formData.leads.map((lead, index) => (
                        <div key={`lead-${index}`} className="array-input-container">
                            <input
                                type="url"
                                value={lead}
                                onChange={(e) => handleArrayInputChange(e, index, 'leads')}
                                placeholder="https://linkedin.com/in/profile"
                            />
                            <button
                                type="button"
                                className="button remove-button"
                                onClick={() => removeArrayItem(index, 'leads')}
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="button add-button"
                        onClick={() => addArrayItem('leads')}
                    >
                        + Add LinkedIn URL
                    </button>
                </div>

                <div className="form-group">
                    <label>Account IDs:</label>

                    {formData.accountIDs.map((accountID, index) => (
                        <div key={`account-${index}`} className="array-input-container">
                            <input
                                type="text"
                                value={accountID}
                                onChange={(e) => handleArrayInputChange(e, index, 'accountIDs')}
                                placeholder="Account ID"
                            />
                            <button
                                type="button"
                                className="button remove-button"
                                onClick={() => removeArrayItem(index, 'accountIDs')}
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="button add-button"
                        onClick={() => addArrayItem('accountIDs')}
                    >
                        + Add Account ID
                    </button>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="button cancel-button"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="button submit-button"
                        disabled={loading}
                    >
                        {loading
                            ? 'Saving...'
                            : isEditMode
                                ? 'Update Campaign'
                                : 'Create Campaign'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CampaignForm; 