// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3WT5HTNIirviRMzwAArIWnWGf3wEWdyuvBA&s"></img>
      <span class="gift">Joy</span><sapn class="dynamics">box</sapn></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/support">Support</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
