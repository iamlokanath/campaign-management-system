import React, { useState } from 'react';
import HeroSection from './home/HeroSection';
import AboutSection from './home/AboutSection';
import FeaturesSection from './home/FeaturesSection';
import TestimonialsSection from './home/TestimonialsSection';
import FAQSection from './home/FAQSection';
import Footer from './home/Footer';
import '../styles/home/HomePage.css';

const HomePage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    return (
        <div className="home-page">
            <HeroSection />
            <AboutSection />
            <FeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <Footer scrollToSection={scrollToSection} />
        </div>
    );
};

export default HomePage; 