import React from 'react';
import '../../styles/home/AboutSection.css';

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="about-section">
            <h2>About Us</h2>
            <div className="about-content">
                <div className="about-text">
                    <p>We are dedicated to helping businesses create and manage successful marketing campaigns. Our platform combines powerful tools with an intuitive interface to make campaign management a breeze.</p>
                </div>
                <div className="about-stats">
                    <div className="stat-item">
                        <h3>1000+</h3>
                        <p>Campaigns Created</p>
                    </div>
                    <div className="stat-item">
                        <h3>500+</h3>
                        <p>Happy Clients</p>
                    </div>
                    <div className="stat-item">
                        <h3>99%</h3>
                        <p>Satisfaction Rate</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection; 