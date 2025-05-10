// src/components/CustomizationForm.js
import React, { useState } from 'react';
import './CustomizationForm.css';

const CustomizationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: '',
    color: '',
    size: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <form className="customization-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Address:
        <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
      </label>
      <label>
        Message:
        <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
      </label>
      <label>
        Color:
        <input type="text" name="color" value={formData.color} onChange={handleChange} />
      </label>
      <label>
        Size:
        <input type="text" name="size" value={formData.size} onChange={handleChange} />
      </label>
      <label>
        Upload Image:
        <input type="file" name="image" onChange={handleImageChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomizationForm;
