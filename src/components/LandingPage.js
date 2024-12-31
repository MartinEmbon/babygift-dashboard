import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="navbar-left">
          <h1>Baby Wishlist</h1>
        </div>
        <div className="navbar-right">
          <Link to="/login" className="cta-button">Sign In</Link>
          <Link to="/signup" className="cta-button">Sign Up</Link>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2>Your Baby's Perfect Wishlist</h2>
          <p>Introducing Baby Wishlist — the easiest way to manage and share your baby’s gift ideas with friends and family!</p>
          <p>Create and share a personalized wishlist, track contributions, and ensure your baby gets exactly what they need — without any hassle.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-button large-button">Create Your Wishlist</Link>
            <Link to="/login" className="cta-button large-button">Already Have an Account? Log In</Link>
          </div>
        </div>
      </section>

      <section className="product-info">
        <div className="info-left">
          <h2>Manage Your Baby’s Wishlist with Ease</h2>
          <p>
            Baby Wishlist simplifies the process of collecting gift ideas for your baby. It allows you to create a customized wishlist, share it with loved ones, and keep track of all contributions. Whether you’re expecting or have already welcomed your little one, managing a wishlist has never been easier.
          </p>
        </div>
        <div className="info-right">
          <h2>Why Baby Wishlist?</h2>
          <ul>
            <li>Effortlessly create and organize your wishlist.</li>
            <li>Share the wishlist with friends and family in one click.</li>
            <li>Receive gift contributions directly through the app.</li>
            <li>Customize your items, set price ranges, and more.</li>
            <li>Stay updated in real-time on all contributions.</li>
          </ul>
        </div>
      </section>
      <section className="mock-images">
          <div className="image-container">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Example wishlist"
              className="mock-image"
            />
            <p>Create a beautiful wishlist for your baby.</p>
          </div>
          <div className="image-container">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Sharing options"
              className="mock-image"
            />
            <p>Share your wishlist effortlessly.</p>
          </div>
          <div className="image-container">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Secure contributions"
              className="mock-image"
            />
            <p>Receive contributions securely and directly.</p>
          </div>
        </section>
      <main className="main-content">
        <section className="features">
          <h2>Why Choose Baby Wishlist?</h2>
          <div className="features-container">
            <div className="features-text">
              <ul>
                <li>Easily create and manage your wishlist.</li>
                <li>Share your wishlist with a simple link.</li>
                <li>Contributions are transferred directly to your account.</li>
                <li>Customizable items and prices to fit your needs.</li>
                <li>Real-time updates so you can track all gifts and contributions.</li>
              </ul>
            </div>
            <div className="features-image">
              <img
                src="https://via.placeholder.com/500x300"
                alt="Baby Wishlist Features"
                className="feature-image"
              />
            </div>
          </div>
        </section>

      
      </main>

      <footer className="footer">
        <p>&copy; 2024 Baby Wishlist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
