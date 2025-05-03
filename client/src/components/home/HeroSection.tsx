import React from 'react';
import '../../styles/home/HeroSection.css';

interface HeroSectionProps {
    navigate: (path: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ navigate }) => {
    return (
        <section id="home" className="hero-section">
            <div className="hero-content">
                <h1>Transform Your Marketing Campaigns</h1>
                <p>Create, manage, and optimize your campaigns with our powerful platform</p>
                <button
                    className="cta-button"
                    onClick={() => navigate('/campaign-list')}
                >
                    Create New Campaign
                </button>
            </div>
            <div className="hero-image">
                <img src="/Image/hero.png" alt="Campaign Management" />
            </div>
        </section>
    );
};

export default HeroSection; 