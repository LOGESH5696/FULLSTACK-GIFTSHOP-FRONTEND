import React from 'react';
import '../styles/EmbeddedMap.css'; // Import the CSS file

const EmbeddedMap = () => {
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.629182264537!2d77.96753766476473!3d10.371505272577558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00aa8c9b86980b%3A0x44f2c5ebb6d437dd!2sNatart!5e0!3m2!1sen!2sin!4v1723607902243!5m2!1sen!2sin";
  
  return (
    <div className="map-wrapper">
      <div className="description">
        <h2>Need Directions?</h2>
        <p>
          Just follow the glittery path on the map, and if you see a dancing reindeer, you’re probably headed in the right direction. We promise, no sleigh required!
        </p>
        <p>
          Happy gifting, and remember, we're just a click or a map pin away! 🎁✨
        </p>
      </div>
      <div className="map-container">
        <iframe
          src={mapSrc}
          className="map-frame"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Embedded Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default EmbeddedMap;




