import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shareItem, setShareItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios.get('http://localhost:5000/cart')
      .then(response => setCartItems(response.data))
      .catch(error => console.error(error));
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/cart/${id}`)
      .then(() => {
        fetchCartItems();
      })
      .catch(error => console.error("Error deleting item", error));
  };

  const updateQuantity = (id, quantity) => {
    axios.patch(`http://localhost:5000/cart/${id}`, { quantity })
      .then(() => {     
        fetchCartItems();
      })
      .catch(error => console.error("Error updating item", error));
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const delivery = 5.00;
    return {
      subtotal,
      tax,
      delivery,
      total: subtotal + tax + delivery
    };
  };

  const { subtotal, tax, delivery, total } = calculateTotal();

  const handleShare = (item) => {
    setShareItem(item);
  };

  const shareOptions = {
    copyLink: () => {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard'))
        .catch(error => console.error('Error copying to clipboard', error));
    },
    shareWhatsApp: () => {
      const url = `whatsapp://send?text=Check out this item: ${window.location.href}`;
      window.location.href = url;
    },
    shareInstagram: () => {
      const url = `instagram://camera`;
      if (navigator.userAgent.match(/(Android|iPhone|iPod|iPad)/)) {
        window.location.href = url;
      } else {
        window.location.href = `https://www.instagram.com/`;
      }
    },
    shareFacebook: () => {
      const url = `fb://feed?link=${encodeURIComponent(window.location.href)}`;
      if (navigator.userAgent.match(/(Android|iPhone|iPod|iPad)/)) {
        window.location.href = url;
      } else {
        window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      }
    },
    shareTwitter: () => {
      const url = `twitter://post?message=Check out this item: ${window.location.href}`;
      if (navigator.userAgent.match(/(Android|iPhone|iPod|iPad)/)) {
        window.location.href = url;
      } else {
        window.location.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this item: ' + window.location.href)}`;
      }
    }
  };

  const proceedToPay = () => {
    navigate('/delivery-address');
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  min="1"
                />
                <button onClick={() => updateQuantity(item.id, item.quantity)}>Update</button>
                <button className="delete" onClick={() => deleteItem(item.id)}>Delete</button>
                <button onClick={() => handleShare(item)}>Share</button>
              </div>
            </div>
          ))}

          <div className="order-summary">
            <h2>Order Summary</h2>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Delivery: ${delivery.toFixed(2)}</p>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="place-order" onClick={proceedToPay}>Proceed to Pay</button>
          </div>
        </>
      )}
      {orderPlaced && <p className="order-message">Thank you! Your order has been placed.</p>}
      {shareItem && (
        <div className="share-popup">
          <h3>Share {shareItem.name}</h3>
          <button onClick={shareOptions.copyLink}>Copy Link</button>
          <button onClick={shareOptions.shareWhatsApp}>Share on WhatsApp</button>
          <button onClick={shareOptions.shareInstagram}>Share on Instagram</button>
          <button onClick={shareOptions.shareFacebook}>Share on Facebook</button>
          <button onClick={shareOptions.shareTwitter}>Share on Twitter</button>
          <button onClick={() => setShareItem(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
