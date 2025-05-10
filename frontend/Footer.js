// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Customized Gifts. All rights reserved.</p>
        <p>Follow us on:
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a>,
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a>,
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
