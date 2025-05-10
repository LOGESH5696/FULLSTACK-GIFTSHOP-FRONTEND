import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/DeliveryAddress.css';
import { UserContext } from '../App'; // Import UserContext

const DeliveryAddress = () => {
  const { userId } = useContext(UserContext); // Get userId from context
  // const userId=1;
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    address: '',
    city: '',
    country: '',
    state: '',
    postalCode: ''
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
     if(userId)
     {
      fetchAddresses();
     }
    console.log(userId);
  }, [userId]);

  
  const fetchAddresses = () => {
    axios.get(`http://localhost:8080/addresses/get/${userId}`)
      .then(response => setAddresses(response.data))
      .catch(error => console.error(error));
  };

  const addAddress = () => {
    const { address, city, country, state, postalCode } = newAddress;
    if (!address || !city || !country || !state || !postalCode) {
      alert('Please fill in all fields.');
      return;
    }
  
    axios.post(`http://localhost:8080/addresses/post/${userId}`, { ...newAddress })
      .then(response => {
        setAddresses([...addresses, response.data]);
        setNewAddress({ address: '', city: '', country: '', state: '', postalCode: '' });
        setSelectedAddressId(response.data.id); // Auto-select the newly added address
      })
      .catch(error => console.error(error));
  };
  
  const removeAddress = (id) => {
    axios.delete(`http://localhost:8080/addresses/delete/${id}`)
      .then(() => {
        setAddresses(addresses.filter(address => address.id !== id));
        if (selectedAddressId === id) {
          setSelectedAddressId(null);
        }
      })
      .catch(error => console.error(error));
  };

  const proceedToPayment = () => {
    if (!selectedAddressId) {
      alert('Please select an address.');
      return;
    }

    const selectedAddress = addresses.find(address => address.id === selectedAddressId);
    navigate('/payment-method', { state: { selectedAddress } });
  };

  return (
    <div className="delivery-address-page">
      <h1>Enter Delivery Address</h1>
      <div className="new-address-section">
        <input
          type="text"
          placeholder="Address"
          value={newAddress.address}
          onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={newAddress.country}
          onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
        />
        <input
          type="text"
          placeholder="State"
          value={newAddress.state}
          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={newAddress.postalCode}
          onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
        />
        <button onClick={addAddress} className="add-address-button">Add Address</button>
      </div>
      <div className="address-list">
        {addresses.map(address => (
          <div key={address.id} className="address-container">
            <input
              type="radio"
              name="selectedAddress"
              value={address.id}
              checked={selectedAddressId === address.id}
              onChange={() => setSelectedAddressId(address.id)}
            />
            <label>
              {address.address}, {address.city}, {address.state}, {address.country} - {address.postalCode}
            </label>
            <button onClick={() => removeAddress(address.id)} className="remove-button">Remove</button>
          </div>  
        ))}
      </div>
      <button onClick={proceedToPayment} className="proceed-button">Proceed to Payment</button>
    </div>
  );
};

export default DeliveryAddress;
