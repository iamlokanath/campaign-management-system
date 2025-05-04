import React, { useState } from 'react';
import { API_URL } from '../config';
import '../styles/MessageGenerator.css';
import mockServices from '../services/mockService';

interface ProfileData {
    name: string;
    job_title: string;
    company: string;
    location: string;
    summary: string;
}

const MessageGenerator: React.FC = () => {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: '',
        job_title: '',
        company: '',
        location: '',
        summary: ''
    });

    const [generatedMessage, setGeneratedMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [useMockData, setUseMockData] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const generateMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let result;

            if (useMockData) {
                // Use mock service if selected
                result = await mockServices.generateMessage(profileData);
                setGeneratedMessage(result.message);
            } else {
                // Use real API
                const response = await fetch(`${API_URL}/messages/generate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(profileData),
                    signal: AbortSignal.timeout(10000)
                }).catch(err => {
                    console.error("Network error:", err);
                    throw new Error("Cannot connect to the server. Please check if the backend is running or use mock data.");
                });

                if (!response.ok) {
                    throw new Error(`Failed to generate message: ${response.status}`);
                }

                const data = await response.json();
                setGeneratedMessage(data.message);
            }
        } catch (err: any) {
            setError(`Error generating message: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedMessage)
            .then(() => {
                alert('Message copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="message-generator-container">
            <h2>LinkedIn Message Generator</h2>

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

            {error && <div className="error-message">{error}</div>}

            <div className="message-generator-content">
                <div className="profile-form-container">
                    <h3>Profile Information</h3>
                    <form onSubmit={generateMessage} className="profile-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                                placeholder="Enter recipient's name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="job_title">Job Title</label>
                            <input
                                type="text"
                                id="job_title"
                                name="job_title"
                                value={profileData.job_title}
                                onChange={handleInputChange}
                                placeholder="Enter job title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={profileData.company}
                                onChange={handleInputChange}
                                placeholder="Enter company name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={profileData.location}
                                onChange={handleInputChange}
                                placeholder="Enter location"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="summary">Profile Summary</label>
                            <textarea
                                id="summary"
                                name="summary"
                                value={profileData.summary}
                                onChange={handleInputChange}
                                placeholder="Enter a brief summary of their profile"
                                rows={4}
                            />
                        </div>

                        <button
                            type="submit"
                            className="button generate-button"
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate Message'}
                        </button>
                    </form>
                </div>

                <div className="message-output-container">
                    <h3>Generated Message</h3>
                    {loading ? (
                        <div className="loading-message">Generating personalized message...</div>
                    ) : generatedMessage ? (
                        <>
                            <div className="generated-message">
                                {generatedMessage}
                            </div>
                            <button
                                className="button copy-button"
                                onClick={copyToClipboard}
                            >
                                Copy to Clipboard
                            </button>
                        </>
                    ) : (
                        <div className="empty-message">
                            Fill out the profile information and click "Generate Message" to create a personalized outreach message.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageGenerator; 