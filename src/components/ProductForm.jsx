import React, { useState } from "react";
import "../styles/productForm.css"

function ProductForm({ product = {}, onSubmit, onClose }) {
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || "");
  const [image, setImage] = useState(product.image || "https://via.placeholder.com/300x200");
//   const [category, setCategory] = useState(product.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: product.id || Date.now().toString(), name, price, image });
  };

  // Conditional class for styling based on the form type (edit or add)
  const formType = product.id ? "edit" : "add";

  return (
    <form onSubmit={handleSubmit} className={`product-form ${formType}`}>
      <h3>{product.id ? "Edit Product" : "Add New Product"}</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
       {/* <input
        type="text"
        placeholder="Category"
        value={name}
        onChange={(e) => setCategory(e.target.value)}
        required
      /> */}
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">{product.id ? "Update" : "Add"}</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}

export default ProductForm;
