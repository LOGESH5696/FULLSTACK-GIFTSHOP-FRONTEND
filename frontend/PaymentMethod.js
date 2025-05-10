import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PaymentMethod.css';

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAddress } = location.state;

  const placeOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    navigate('/order-confirmation', { state: { selectedAddress, paymentMethod } });
  };

  const handleCardClick = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="payment-method-page">
      <h1>Select Payment Method</h1>
      <div className="payment-methods">
        <div
          className={`payment-card ${paymentMethod === 'Credit Card' ? 'selected' : ''}`}
          onClick={() => handleCardClick('Credit Card')}
        >
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="Credit Card"
            checked={paymentMethod === 'Credit Card'}
            onChange={() => {}}
          />
          <label htmlFor="creditCard">Credit Card</label>
        </div>
        <div
          className={`payment-card ${paymentMethod === 'PayPal' ? 'selected' : ''}`}
          onClick={() => handleCardClick('PayPal')}
        >
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="PayPal"
            checked={paymentMethod === 'PayPal'}
            onChange={() => {}}
          />
          <label htmlFor="paypal">PayPal</label>
        </div>
        <div
          className={`payment-card ${paymentMethod === 'Cash on Delivery' ? 'selected' : ''}`}
          onClick={() => handleCardClick('Cash on Delivery')}
        >
          <input
            type="radio"
            id="cashOnDelivery"
            name="paymentMethod"
            value="Cash on Delivery"
            checked={paymentMethod === 'Cash on Delivery'}
            onChange={() => {}}
          />
          <label htmlFor="cashOnDelivery">Cash on Delivery</label>
        </div>
      </div>
      <button onClick={placeOrder} className="place-order-button">Place Order</button>
    </div>
  );
};

export default PaymentMethod;
