import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    rating: '',
    count: '',
    imageUrl: ''
  });

  // New state for adding a product
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    rating: '',
    count: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:8080/users/get');
        setUsers(usersResponse.data);

        const productsResponse = await axios.get('http://localhost:8080/products/get');
        const productsData = productsResponse.data.map(product => ({
          ...product,
          price: parseFloat(product.price),
          rating: parseFloat(product.rating),
          count: parseInt(product.count, 10),
        }));
        setProducts(productsData);

        const ordersResponse = await axios.get('http://localhost:5000/orders');
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setUpdatedProduct({
      name: product.name,
      price: product.price,
      rating: product.rating,
      count: product.count,
      imageUrl: product.imageUrl
    });
  };

  const handleSaveClick = async (productId) => {
    try {
      const updatedProductData = {
        ...updatedProduct,
        price: parseFloat(updatedProduct.price),
        rating: parseFloat(updatedProduct.rating),
        count: parseInt(updatedProduct.count, 10),
      };
      const response = await axios.put(`http://localhost:8080/products/${productId}`, updatedProductData);
      setProducts(products.map(product => product.id === productId ? response.data : product));
      setEditingProductId(null);
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const handleCancelClick = () => {
    setEditingProductId(null);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        rating: parseFloat(newProduct.rating),
        count: parseInt(newProduct.count, 10),
      };

      // Ensure all fields are filled
      if (
        !productToAdd.name ||
        isNaN(productToAdd.price) ||
        isNaN(productToAdd.rating) ||
        isNaN(productToAdd.count) ||
        !productToAdd.imageUrl
      ) {
        alert("Please fill in all fields correctly.");
        return;
      }

      const response = await axios.post('http://localhost:8080/products/post', productToAdd);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', rating: '', count: '', imageUrl: '' });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product", error);
      alert("Failed to add product. Please check the console for more details.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Failed to delete product. Please check the console for more details.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Products</h2>
        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Count</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    {editingProductId === product.id ? (
                      <input
                        type="text"
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                      />
                    ) : (
                      `$${product.price.toFixed(2)}`
                    )}
                  </td>
                  <td>
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        value={updatedProduct.rating}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, rating: e.target.value })}
                      />
                    ) : (
                      product.rating
                    )}
                  </td>
                  <td>
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        value={updatedProduct.count}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, count: e.target.value })}
                      />
                    ) : (
                      product.count
                    )}
                  </td>
                  <td>
                    {editingProductId === product.id ? (
                      <input
                        type="text"
                        value={updatedProduct.imageUrl}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })}
                      />
                    ) : (
                      <img src={product.imageUrl} alt={product.name} style={{ width: '50px' }} />
                    )}
                  </td>
                  <td>
                    {editingProductId === product.id ? (
                      <>
                        <FaSave onClick={() => handleSaveClick(product.id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                        <button onClick={handleCancelClick}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <FaEdit onClick={() => handleEditClick(product)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                        <FaTrash onClick={() => handleDeleteProduct(product.id)} style={{ cursor: 'pointer' }} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct} className="add-product-form">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Rating"
            value={newProduct.rating}
            onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
            required
            min="0"
            max="5"
            step="0.1"
          />
          <input
            type="number"
            placeholder="Count"
            value={newProduct.count}
            onChange={(e) => setNewProduct({ ...newProduct, count: e.target.value })}
            required
            min="0"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </section>
      <section>
        <h2>Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order.id}>Order ID: {order.id}, Payment Method: {order.paymentMethod}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
