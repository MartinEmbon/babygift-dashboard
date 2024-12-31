import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import CreateAccountPage from "./components/CreateAccountPage";
import ProfilePage from "./components/ProfilePage";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/authSlice"; // Import Redux actions
import LandingPage from "./components/LandingPage";
import PasswordRetrievalPage from "./components/PasswordRetrievalPage";





function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [isContributorLoggedIn, setIsContributorLoggedIn] = useState(false); // For contributor login


    // Define the onSignup function
    const handleSignup = (userData) => {
      console.log('User signed up:', userData);
      // You can update state or do any logic after signup
    };
  // useEffect to check login status on component mount (page refresh)


 useEffect(() => {
  const loggedInStatus = localStorage.getItem("isLoggedIn");
  if (loggedInStatus === "true") {
    const userData = localStorage.getItem("userInfo");

    // Check if userInfo exists and is a valid JSON string before parsing
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        dispatch(login(parsedUserData)); // Dispatch user data to Redux store
        setIsLoggedIn(true);
        setUserInfo(parsedUserData);
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }
}, [dispatch]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
    dispatch(logout()); // Dispatch logout action to Redux store
    setIsLoggedIn(false);
    setUserInfo(null); // Clear the userInfo from state
  };

  return (
    <Router>
      <Routes>
      <Route
  path="/"
  element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />}
/>
      <Route
  path="/"
  element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />}
/>
     
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />}
        />
       <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <CreateAccountPage onSignup={handleSignup} />}
      />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard userInfo={userInfo} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn && userInfo ? <ProfilePage userInfo={userInfo} /> : <Navigate to="/login" />}
        />
         <Route
          path="/forgot-password"
          element={<PasswordRetrievalPage />}
        />

       
      </Routes>
    </Router>
  );
}

export default App;
