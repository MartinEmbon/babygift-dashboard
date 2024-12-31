import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profilepage.css";

function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Retrieve the user info from localStorage
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      const email = parsedUserInfo.email;

      console.log("Email from localStorage:", email); // Check if email is correct

      if (email) {
        console.log("Fetching profile data..."); // Add log before making the request
        axios
          .get(`https://us-central1-baby-gift-project.cloudfunctions.net/get-user-profile?email=${email}`)
          .then((response) => {
            console.log("User profile data:", response.data); // Log the response data
            setUserProfile(response.data);
          })
          .catch((error) => {
            console.error("Error fetching profile:", error);
          });
      }
    } else {
      console.log("No user info found in localStorage");
    }
  }, []); // Run once on mount

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Baby Name: {userProfile.babyName}</p>
      <p>Email: {userProfile.email}</p>
      <p>Due Date: {userProfile.dueDate}</p>
      <p>Additional Info: {userProfile.additionalInfo}</p>
    </div>
  );
}

export default ProfilePage;
