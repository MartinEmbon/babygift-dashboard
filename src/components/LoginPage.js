import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Make sure to install axios
import "../styles/login.css";

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    try {
      // Call the Cloud Function (replace with your actual Cloud Function URL)
      const response = await axios.post("https://us-central1-baby-gift-project.cloudfunctions.net/login", {
        email,
        password,
      });

      // If login is successful, log the user in
      if (response.status === 200) {
        const userData = response.data.user; // Assuming the user data comes from the response

        localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userInfo", JSON.stringify(userData)); // Save user info

      setIsLoggedIn(true);
      navigate("/dashboard"); // Redirect to the dashboard after successful login
      }
    } catch (err) {
      // If there's an error (e.g., invalid credentials), show the error message
      setError(err.response?.data || "Error logging in. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
    <div className="logo-section" onClick={() => navigate("/")}>
        <h2>Baby Wishlist</h2>
        <p>Your one-stop shop for baby gifts</p>
      </div>
    <h1>Welcome Back</h1>
    <form onSubmit={handleLogin} className="login-form">
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
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="login-button">
        Login
      </button>
    </form>
    <div className="login-links">
      <Link to="/forgot-password" className="forgot-password-link">
        Forgot your password?
      </Link>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          Create one here
        </Link>
      </p>
    </div>
  </div>
  );
}

export default LoginPage;
