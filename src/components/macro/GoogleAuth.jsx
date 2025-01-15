import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleAuth = ({ setIsLoggedIn }) => {
  const handleSuccess = async (response) => {
    const token = response.tokenId;
    try {
      const res = await fetch('/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('User data:', data.user);
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleFailure = (response) => {
    console.error("Google Login Failed:", response);
  };

  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Sign in with Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleAuth;
