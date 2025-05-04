import React, { useEffect, useRef } from 'react';
import testimonials from '../../data/testimonials.json';
import '../../styles/home/TestimonialsSection.css';

const TestimonialsSection: React.FC = () => {
    const sliderRef = useRef<HTMLDivElement>(null);

    // Duplicate testimonials for seamless infinite scroll
    const testimonialsList = [...testimonials, ...testimonials];

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;
        let animationFrame: number;

        const scroll = () => {
            if (slider.scrollLeft >= slider.scrollWidth / 2) {
                slider.scrollLeft = 0;
            } else {
                slider.scrollLeft += 1;
            }
            animationFrame = requestAnimationFrame(scroll);
        };
        animationFrame = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <section id="testimonials" className="testimonials-section">
            <h2>What Our Clients Say</h2>
            <div className="testimonials-slider" ref={sliderRef}>
                <div className="testimonials-track">
                    {testimonialsList.map((testimonial, idx) => (
                        <div className="testimonial-card" key={idx}>
                            <p>"{testimonial.text}"</p>
                            <div className="testimonial-author">
                                <img src={testimonial.image} alt={testimonial.author} />
                                <div>
                                    <h4>{testimonial.author}</h4>
                                    <p>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection; 