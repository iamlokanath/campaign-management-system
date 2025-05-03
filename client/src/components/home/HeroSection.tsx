import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home/HeroSection.css';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section id="home" className="hero-section">
            <div className="hero-content">
                <h1>Transform Your Marketing Campaigns</h1>
                <p>Create, manage, and optimize your campaigns with our powerful platform</p>
                <button
                    className="cta-button"
                    onClick={() => navigate('/new-campaign')}
                >
                    Create New Campaign
                </button>
            </div>
            <div className="hero-image">
                <img src="/Image/hero2.png" alt="Campaign Management" />
            </div>
        </section>
    );
};

export default HeroSection; 