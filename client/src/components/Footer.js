import React from 'react';
import './Footer.css'; // Import your custom CSS file

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h2 className="footer-heading">Quick Links</h2>
                    <ul className="footer-list">
                        <li><a href="/" className="footer-link">Home</a></li>
                        <li><a href="/" className="footer-link">About us</a></li>
                        <li><a href="#" className="footer-link">Contact us</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h2 className="footer-heading">Follow us</h2>
                    <ul className="footer-list">
                        <li><a href="#" className="footer-link">Facebook</a></li>
                        <li><a href="#" className="footer-link">Twitter</a></li>
                        <li><a href="#" className="footer-link">Linkedin</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h2 className="footer-heading">Legal</h2>
                    <ul className="footer-list">
                        <li><a href="#" className="footer-link">Privacy Policy</a></li>
                        <li><a href="#" className="footer-link">Terms & Conditions</a></li>
                        <li><a href="#" className="footer-link">Refund Policy</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
