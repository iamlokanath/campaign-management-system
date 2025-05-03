import React from 'react';
import '../../styles/home/Footer.css';

interface FooterProps {
    scrollToSection: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Campaign Manager</h3>
                    <p>Your all-in-one solution for marketing campaign management</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li onClick={() => scrollToSection('home')}>Home</li>
                        <li onClick={() => scrollToSection('about')}>About</li>
                        <li onClick={() => scrollToSection('features')}>Features</li>
                        <li onClick={() => scrollToSection('testimonials')}>Testimonials</li>
                        <li onClick={() => scrollToSection('faq')}>FAQ</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: support@campaignmanager.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Campaign Management System. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer; 