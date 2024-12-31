import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Wishlist from "./Wishlist";
import MoneyRaised from "../MoneyRaised";
import "../styles/dashboard.css";
import ProfilePage from "./ProfilePage"; // Import Profile component
import { mockWishlist } from "../data/mockWishlist";
import { defaultProducts } from "../data/defaultProducts";
import axios from "axios";
import { useSelector } from "react-redux";

function Dashboard({ userInfo,onLogout }) {

    const userEmail = useSelector((state) => state.auth.userInfo?.email); // Access email from Redux
    const [wishlist, setWishlist] = useState(mockWishlist);
    const [view, setView] = useState("wishlist");
    const [defaultProducts, setDefaultProducts] = useState([]);
  
    useEffect(() => {
      const fetchDefaultProducts = async () => {
        try {
          const response = await axios.get("https://us-central1-baby-gift-project.cloudfunctions.net/get-default-products");
          setDefaultProducts(response.data);
        } catch (error) {
          console.error("Error fetching default products:", error);
        }
      };
  
      fetchDefaultProducts();
    }, []);
  
    return (
      <div className="dashboard">
        <Navbar onLogout={onLogout} onNavigate={setView} />
        <div className="dashboard-content">
          {view === "wishlist" && (
            <Wishlist
              wishlist={wishlist}
              userEmail={userEmail} // Use dynamic email from Redux
              defaultProducts={defaultProducts}
              onUpdateWishlist={setWishlist}
            />
          )}
          {view === "moneyRaised" && <MoneyRaised />}
          {view === "profile" && <ProfilePage email={userEmail}/>}
        </div>
      </div>
    );
  }
  
  export default Dashboard;
