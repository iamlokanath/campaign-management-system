import React, { useEffect, useState } from 'react';
import '../../styles/home/AboutSection.css';

function useCountUp(target: number, duration = 1200) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        let startTime: number | null = null;
        let frame: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * (target - start) + start));
            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [target, duration]);
    return count;
}

const AboutSection: React.FC = () => {
    const campaigns = useCountUp(1000);
    const clients = useCountUp(500);
    const satisfaction = useCountUp(99);
    return (
        <section id="about" className="about-section">
            <h2>About Us</h2>
            <div className="about-content">
                <div className="about-text">
                    <p>We are dedicated to helping businesses create and manage successful marketing campaigns. Our platform combines powerful tools with an intuitive interface to make campaign management a breeze.</p>
                </div>
                <div className="about-stats">
                    <div className="stat-item">
                        <h3>{campaigns}+</h3>
                        <p>Campaigns Created</p>
                    </div>
                    <div className="stat-item">
                        <h3>{clients}+</h3>
                        <p>Happy Clients</p>
                    </div>
                    <div className="stat-item">
                        <h3>{satisfaction}%</h3>
                        <p>Satisfaction Rate</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection; 