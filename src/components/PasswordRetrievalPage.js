import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Make sure to install axios
import "../styles/login.css";

function PasswordRetrievalPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    setMessage(""); // Clear previous success messages

    try {
      // Send request to Cloud Function (replace with actual URL)
      const response = await axios.post("https://us-central1-baby-gift-project.cloudfunctions.net/reset-password", { email });

      // If the request is successful, show a success message
      if (response.status === 200) {
        setMessage("Password reset email sent. Please check your inbox.");

     
      }
    } catch (err) {
      // Handle error (e.g., invalid email, server error)
      setError(err.response?.data || "Error requesting password reset. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="logo-section" onClick={() => navigate("/")}>
        <h2>Baby Wishlist</h2>
        <p>Your one-stop shop for baby gifts</p>
      </div>
      <h1>Password Retrieval</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        <p className="info-message">
        An email with reset instructions will arrive shortly.{" "}
        <Link to="/login" className="back-to-login-link">Click here to go back to login page</Link>
      </p>
        <button type="submit" className="login-button">
          Submit
        </button>
      </form>

      {/* Add paragraph after the form */}
     
    </div>
  );
}

export default PasswordRetrievalPage;
