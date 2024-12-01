import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Rate My Hospital. All rights reserved.</p>
            <ul>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-of-service">Terms of Service</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
