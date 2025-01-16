import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';


const Signup = ({BASE_URL, setIsLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // console.log("Sign-Up attempted with", { email, password });

    
    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

// handle signup with email and password
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      console.log(response)
      console.log(data)
      if (response.ok) {
        // alert('Sign-up successful!');
        // navigate('/login')
      } else {
        alert('Sign-up successful!');
        navigate('/login')
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

   // handle auth with google
   const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('Google login successful', credentialResponse);
      const { credential } = credentialResponse;
  
      if (!credential) {
        console.log('Google login failed: No credential found');
        return;
      }
  
      // Send the credential (ID token) to your backend for verification
      const response = await fetch(`${BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });
  
      const data = await response.json();
      console.log(response);
      console.log(data)
      console.log(data.token)
  
      if (response.ok && data.token) {
        // Handle successful login
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userId', data.userId);
        setIsLoggedIn(true);
        navigate('/');
        console.log('Sign-in successful!');
        toast.success('Sign-in successful!');
      } else {
        // Handle failure
        console.log('Google Sign-in failed');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('An error occurred');
    }
  };

  const handleSocialSignUp = (provider) => {
    // Placeholder for third-party sign-up integration
    console.log(`Sign-Up with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={()=>setError('')}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={()=>setError('')}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onClick={()=>setError('')}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <div className="my-6">
          <p className="text-center text-gray-500">Or continue with</p>
          {/* Google */}
          <button
            className="w-full flex items-center justify-center border py-2 mb-2 rounded-md hover:bg-gray-100"
          >
             <GoogleLogin
          // style={{width: "100%"}}
          onSuccess={credentialResponse => {
              handleGoogleSuccess(credentialResponse);
            }}
            onError={() => {
              console.error('Login Failed');
              toast.error('Google login failed');
            }}
          />
          </button>
          {/* Kakao */}
          <button
            onClick={() => handleSocialSignUp("Kakao")}
            className="w-full flex items-center justify-center border py-2 mb-2 bg-yellow-400 rounded-md hover:bg-yellow-500"
          >
            Sign Up with Kakao
          </button>
          {/* Naver */}
          <button
            onClick={() => handleSocialSignUp("Naver")}
            className="w-full flex items-center justify-center border py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Sign Up with Naver
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
