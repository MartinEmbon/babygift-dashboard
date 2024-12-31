import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import "../styles/wishlist.css";

function Wishlist({ userEmail, defaultProducts }) {
  const [wishlist, setWishlist] = useState(null); // State for the wishlist
  const [editingProduct, setEditingProduct] = useState(null); // State for editing products
  const [babyName, setBabyName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State for category selection
  const [email, setEmail] = useState(null);
 const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const API_URL = "https://us-central1-baby-gift-project.cloudfunctions.net/manage-wishlist"; // Replace with your endpoint

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      setEmail(parsedUserInfo.email); // Extract email
    } else {
      console.log("No userInfo found");
    }
  }, []);

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        setLoading(true);
        try {
          // Fetch both the wishlist and user profile
          const wishlistResponse = await axios.get(API_URL, { params: { userEmail: email } });
          const profileResponse = await axios.get(
            `https://us-central1-baby-gift-project.cloudfunctions.net/get-user-profile?email=${email}`
          );

          setWishlist(wishlistResponse.data);
          setBabyName(profileResponse.data.babyName);
        } catch (error) {
          console.error("Error fetching data:", error);
          setWishlist({ name: "My Wishlist", items: [] });
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [email]);
  


/*

  useEffect(() => {
    // Fetch the user profile based on the email provided
    if (email) {
      axios
        .get(`https://us-central1-baby-gift-project.cloudfunctions.net/get-user-profile?email=${email}`)
        .then((response) => {
          // Assuming response.data.babyName contains the baby name
          console.log(response.data)
          setBabyName(response.data.babyName);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [email]); // Only re-fetch if the email changes


  useEffect(() => {
    // Fetch data as soon as the email is available
    if (email) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`your-api-endpoint?email=${email}`);
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [email]); // Run when email is set


  useEffect(() => {
    // Fetch the user profile based on the email provided
    if (email) {
      axios
        .get(`https://us-central1-baby-gift-project.cloudfunctions.net/get-user-profile?email=${email}`)
        .then((response) => {
          // Assuming response.data.babyName contains the baby name
          console.log(response.data)
          setBabyName(response.data.babyName);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [email]); // Only re-fetch if the email changes


  // Fetch the wishlist when the component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: { userEmail },  // Pass userEmail as a query parameter
        });
        setWishlist(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setWishlist({ name: "My Wishlist", items: [] }); // Default wishlist if none exists
      }
    };
  
    fetchWishlist();
  }, [userEmail]);

*/



  // Update the wishlist in Firestore
  const updateWishlist = async (updatedWishlist) => {
    try {
      await axios.post(API_URL, {
        userEmail: userEmail, // Ensure userEmail is included in the payload
      wishlist: updatedWishlist, // Send the entire updated wishlist
      });
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  // Add a default product
  const handleAddDefaultProduct = (product) => {
    const newProduct = {
      ...product,
      contributed: 0,
      image: product.image || "https://via.placeholder.com/300x200",
    };
    const updatedWishlist = { ...wishlist, items: [...wishlist.items, newProduct] };
    updateWishlist(updatedWishlist);
  };

  // Edit an existing product
  const handleEditProduct = (updatedProduct) => {
    const updatedItems = wishlist.items.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item
    );
    const updatedWishlist = { ...wishlist, items: updatedItems };
    updateWishlist(updatedWishlist);
    setEditingProduct(null); // Close the modal
  };

  // Add a new product
  const handleAddNewProduct = (newProduct) => {
    const newProductWithImage = {
      ...newProduct,
      contributed: 0,
      image: newProduct.image || "https://via.placeholder.com/300x200",
    };
    const updatedWishlist = { ...wishlist, items: [...wishlist.items, newProductWithImage] };
    updateWishlist(updatedWishlist);
    setEditingProduct(null); // Close the modal
  };

  // Remove a product
//   const handleRemoveProduct = (productId) => {
//     const updatedItems = wishlist.items.filter((item) => item.id !== productId);
//     const updatedWishlist = { ...wishlist, items: updatedItems };
//     updateWishlist(updatedWishlist);
//   };

const handleRemoveProduct = async (productId) => {
    // Remove product locally
    const updatedItems = wishlist.items.filter((item) => item.id !== productId);
    const updatedWishlist = { ...wishlist, items: updatedItems };
  
    // Update wishlist locally first
    updateWishlist(updatedWishlist);
  
    try {
      // Send the update to the backend (Firestore) using axios
      const response = await axios.delete('https://us-central1-baby-gift-project.cloudfunctions.net/manage-wishlist', {
        params: {
          userEmail: userEmail,  // Assuming userEmail is available
          productId: productId,
        }
      });
  
      if (response.status === 200) {
        console.log('Product removed successfully:', response.data);
      } else {
        // If the response status is not 200, handle it as an error
        updateWishlist(wishlist); // Revert to original wishlist
        console.error('Error removing product:', response.data);
      }
    } catch (error) {
      // Handle errors, including network issues
      updateWishlist(wishlist); // Revert to original wishlist
      console.error('Error communicating with the server:', error);
    }
  };


 // Filter the default products based on the selected category
 const filteredProducts = selectedCategory
 ? defaultProducts.filter((product) => product.category === selectedCategory || !product.category)
 : defaultProducts;

// Get unique categories from the products (for the dropdown options)
const categories = [...new Set(defaultProducts.map((product) => product.category).filter(Boolean))];








  if (!wishlist) return <div>Loading...</div>; // Loading state

  return (
    <div className="wishlist-container">
      <h2>Baby Wishlist for {wishlist.name}</h2>

      <div className="wishlist-columns">
        {/* Column for Wishlist Items */}
        <div className="wishlist-column">
          <h3>Your Wishlist</h3>
       {/* Wishlist Items */}
<ul>
  {wishlist.items.map((item) => (
    <li key={item.id}>
      <img src={item.image} alt={item.name} />
      <div>
        <p>{item.name} - ${item.price}</p>
        <p>Contributed: ${item.contributed}</p>
        <button onClick={() => setEditingProduct(item)}>Edit</button>
        <button onClick={() => handleRemoveProduct(item.id)}>Remove</button>
      </div>
    </li>
  ))}
</ul>

        </div>

        {/* Column for Default Products */}
        <div className="wishlist-column">
          <h3>Add Default Products</h3>

  {/* Dropdown to select category */}
  <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>


          <ul>
            {filteredProducts.map((product) => {
              // Check if the product is already in the wishlist by matching the product id
              const isInWishlist = wishlist.items.some(item => item.id === product.id);

              return (
                <li key={product.id}>
                  <img src={product.image || "https://via.placeholder.com/300x200"} alt={product.name} />
                  <div>
                    <p>{product.name} - ${product.price}</p>
                    <button 
                      onClick={() => handleAddDefaultProduct(product)} 
                      disabled={isInWishlist} // Disable button if the product is already in the wishlist
                    >
                      {isInWishlist ? 'Added' : 'Add'}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Button to add a new product */}
      <button className="add-product-btn" onClick={() => setEditingProduct({})}>
        Add New Product
      </button>

      {/* Modal for editing or adding a product */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setEditingProduct(null)}>X</button>
            <ProductForm
              product={editingProduct}
              onSubmit={editingProduct.id ? handleEditProduct : handleAddNewProduct}
              onClose={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
