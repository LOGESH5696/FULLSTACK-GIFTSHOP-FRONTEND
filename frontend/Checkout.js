// src/components/Checkout.js
import React, { useState } from 'react';
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
        </label>
        <label>
          Payment Method:
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
