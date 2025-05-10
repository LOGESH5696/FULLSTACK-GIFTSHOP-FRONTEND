import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/OrderConfirmation.css';
import orderConfirmedImage from '../images/order-confirmed.png'; // adjust the path as necessary

const OrderConfirmation = () => {
  const location = useLocation();
  const { selectedAddress, paymentMethod } = location.state;

  return (
    <div className="order-confirmation-page">
      <h1>Order Confirmed</h1>
      <img src={orderConfirmedImage} alt="Order Confirmed" className="order-confirmation-image" />
      <p>Thank you for your order!</p>
      <p>Delivery Address: {selectedAddress.address}</p>
      <p>Payment Method: {paymentMethod}</p>
    </div>
  );
};

export default OrderConfirmation;
