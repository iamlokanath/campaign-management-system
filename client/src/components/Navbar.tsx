import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="navbar-header">
            <nav className="navbar">
                <div className="logo">
                    <NavLink to="/">
                        Campaign<span>Manager</span>
                    </NavLink>
                </div>

                {/* Hamburger button for mobile */}
                <button
                    className={`hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                {/* Overlay that appears behind the menu on mobile */}
                <div
                    className={`menu-overlay ${menuOpen ? 'active' : ''}`}
                    onClick={closeMenu}
                ></div>

                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <NavLink
                        to="/campaign-list"
                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        onClick={closeMenu}
                    >
                        Campaigns
                    </NavLink>
                    <NavLink
                        to="/create-campaign"
                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        onClick={closeMenu}
                    >
                        New Campaign
                    </NavLink>
                    <NavLink
                        to="/message-generator"
                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        onClick={closeMenu}
                    >
                        Message Generator
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Navbar; 