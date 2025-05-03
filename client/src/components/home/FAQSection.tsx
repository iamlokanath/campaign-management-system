import React, { useState } from 'react';
import faqData from '../../data/faq.json';
import '../../styles/home/FAQSection.css';

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section id="faq" className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-container">
                {faqData.map((faq, idx) => (
                    <div className={`faq-item${openIndex === idx ? ' open' : ''}`} key={idx}>
                        <div className="faq-question" onClick={() => toggleAccordion(idx)}>
                            <h3>{faq.question}</h3>
                            <span className={`arrow${openIndex === idx ? ' open' : ''}`}></span>
                        </div>
                        <div
                            className="faq-answer-wrapper"
                            style={{
                                maxHeight: openIndex === idx ? '200px' : '0',
                                transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                overflow: 'hidden',
                            }}
                        >
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection; 