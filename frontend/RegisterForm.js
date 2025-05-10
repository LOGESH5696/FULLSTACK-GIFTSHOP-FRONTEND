import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../styles/RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the user exists
    axios.get(`http://localhost:8080/users/exists`, { params: { email: formData.email } })
      .then(response => {
        if (response.data) {
          setError('User already exists');
          return;
        }
        // User does not exist, proceed with registration
        axios.post('http://localhost:8080/users/post', formData)
          .then(response => {
            // Send welcome email using EmailJS
            emailjs.send('service_v1fw0ob', 'template_lnolvop', { email: formData.email, name: formData.name }, '3MI9mOWo7yi_KGHII')
              .then(response => {
                console.log('Email sent successfully!', response.status, response.text);
              })
              .catch(error => {
                console.error('Error sending email:', error);
              });

            alert('Registration successful!'); // Show success alert
            navigate('/login'); // Navigate to login page upon successful registration
          })
          .catch(error => {
            console.error("Error during registration", error);
            alert('Registration failed'); // Show error alert
            setError('Registration failed');
          });
      })
      .catch(error => {
        console.error("Error checking user existence", error);
        setError('Error checking user existence');
      });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
