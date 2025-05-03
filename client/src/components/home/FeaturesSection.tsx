import React from 'react';
import '../../styles/home/FeaturesSection.css';

const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="features-section">
            <h2>Features</h2>
            <div className="features-grid">
                <div className="feature-card">
                    <i className="fas fa-chart-line"></i>
                    <h3>Analytics Dashboard</h3>
                    <p>Track campaign performance with real-time analytics</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-users"></i>
                    <h3>Audience Targeting</h3>
                    <p>Reach the right audience with precision targeting</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-clock"></i>
                    <h3>Automation</h3>
                    <p>Save time with automated campaign management</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-chart-pie"></i>
                    <h3>ROI Tracking</h3>
                    <p>Measure and optimize your return on investment</p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection; 