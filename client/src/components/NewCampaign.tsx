import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NewCampaign.css';

const NewCampaign: React.FC = () => {
    const navigate = useNavigate();

    return (
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
                <button
                    className="back-button"
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default NewCampaign; 