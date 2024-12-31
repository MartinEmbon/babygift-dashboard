import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signup.css";
import axios from "axios"; // Add axios to make API calls

function CreateAccountPage({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [babyName, setBabyName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { name, babyName, email, password, dueDate, additionalInfo, accessToken };

    try {
      // Send data to the Google Cloud Function
      const response = await axios.post('https://us-central1-baby-gift-project.cloudfunctions.net/create-user', userData);

      // If successful, pass the data to App.js and navigate to the dashboard
      onSignup(userData); // Call the onSignup function passed as a prop from App.js
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Error creating account. Please try again.");
    }
  };

  return (
    <div className="signup-page">
       
      <div className="form-container">
      <div className="logo-section" onClick={() => navigate("/")}>
        <h2>Baby Wishlist</h2>
        <p>Your one-stop shop for baby gifts</p>
      </div>
        <h1>Create Your Account</h1>
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Mum's Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Baby's Name:</label>
            <input
              type="text"
              id="name"
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Access Token:</label>
            <input
              type="text"
              id="name"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="due-date">Baby's Due Date (optional):</label>
            <input
              type="date"
              id="due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="additional-info">Additional Info (optional):</label>
            <textarea
              id="additional-info"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Share anything you'd like others to know..."
            ></textarea>
          </div>
          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CreateAccountPage;
