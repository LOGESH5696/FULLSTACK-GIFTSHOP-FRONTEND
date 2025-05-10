import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';
import { UserContext } from '../App'; // Import the UserContext

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext); // Get setUserId from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for the admin credentials
    if (formData.email === 'admin@gmail.com' && formData.password === 'admin001') {
      alert('Admin login successful!');
      // Optionally set a specific user ID for admin in context
      setUserId(1); // Assuming 1 is the admin's ID
      navigate('/admin'); // Redirect to the admin page
      return;
    }

    // Regular user login process
    axios.get('http://localhost:8080/users/get')
      .then(response => {
        const users = response.data;
        const user = users.find(user => user.email === formData.email && user.password === formData.password);
        
        if (user) {
          alert('Login successful!');
          setUserId(user.id); // Store the user ID in the context
          navigate('/'); // Navigate to the home page upon successful login
        } else {
          alert('Invalid email or password');
          setError('Invalid email or password');
        }
      })
      .catch(error => {
        console.error("Error during login", error);
        alert('Login failed'); 
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="submit">Login</button>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
