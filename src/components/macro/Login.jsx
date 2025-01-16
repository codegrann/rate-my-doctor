import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';


const Login = ({BASE_URL, setIsLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

// handle auth with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // console.log("Login attempted with", { email, password });

    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(response)
      console.log(data);

      if (response.ok) {
        const { token, email, userId } = data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', email); 
        localStorage.setItem('userId', userId); 
        console.log(localStorage.getItem('authToken'))
        console.log(localStorage.getItem('userEmail'))
        console.log(localStorage.getItem('userId'))
        setIsLoggedIn(true)
        alert('Sign-in successful!');
        toast.success('Sign-in successful!');
        navigate('/')
      } else {
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
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });
  
      const data = await response.json();
      console.log(response);
      console.log(data, data.token)
  
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
  

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-6">
          {/* Google login */}
          <button
            // onClick={() => handleSocialLogin("Google")}
            className="w-full flex items-center justify-even border py-2 mb-2 rounded-md hover:bg-gray-100"
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


          {/* Kakao login */}
          <button
            onClick={() => handleSocialLogin("Kakao")}
            className="w-full flex items-center justify-center border py-2 mb-2 bg-yellow-400 rounded-md hover:bg-yellow-500"
          >
            Login with Kakao
          </button>
          {/* Naver Login */}
          <button
            onClick={() => handleSocialLogin("Naver")}
            className="w-full flex items-center justify-center border py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Login with Naver
          </button>
        </div>
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
