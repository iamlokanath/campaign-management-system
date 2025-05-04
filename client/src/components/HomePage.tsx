import React from 'react';
import HeroSection from './home/HeroSection';
import AboutSection from './home/AboutSection';
import FeaturesSection from './home/FeaturesSection';
import TestimonialsSection from './home/TestimonialsSection';
import FAQSection from './home/FAQSection';
import Footer from './home/Footer';
import '../styles/home/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navigate = useNavigate();

    return (
        <div className="home-page">
            <HeroSection navigate={navigate} />
            <AboutSection />
            <FeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <Footer scrollToSection={scrollToSection} />
        </div>
    );
};

export default HomePage; 