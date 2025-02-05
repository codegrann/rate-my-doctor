import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { GoogleLogin } from '@react-oauth/google';
import KakaoLogin from 'react-kakao-login';

import { useAuth } from "../../hooks/AuthContext";



const Signup = ({BASE_URL}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

    const { login } = useAuth();


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
        navigate('/login')
        toast.success('Registeration successful!');
      } else if(data.message=='User already exists'){
          setError(data.message);
          toast.error('Failed to sign in')            
        
      } else{
        // alert('Sign-up successful!');
        // window.location.reload();
        navigate('/login')
        toast.success('Registeration successful!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error)
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
        login();
        // setIsLoggedIn(true);
        navigate('/');
        // console.log('Sign-in successful!');
        // toast.success('Sign-in successful!');
      } else {
        // Handle failure
        console.log('Google Sign-in failed');
        toast.error('Google Sign-in failed')
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('An error occurred');
      toast.error(error);
    }
  };

  // handle auth with kakao
const handleKakaoSuccess = async (response) => {
  try {
    console.log('Kakao login successful', response);
    
    // Extract the access token from the response
    const { response: kakaoResponse } = response;
    const accessToken = kakaoResponse?.access_token;

    if (!accessToken) {
      console.log('Failed to retrieve access token.');
      return;
    }
    
    console.log('Access Token:', accessToken);
    
    // Send the access token to your backend for verification
    const res = await fetch(`${BASE_URL}/auth/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    });

    const data = await res.json();
    console.log("res", res)
    console.log("data", data)
    if (res.ok && data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userId', data.userId);
      login();
      // setIsLoggedIn(true);
      navigate('/');
      // toast.success('Sign-in successful!');
    } else {
      toast.error(data.message || 'Kakao Sign-in failed.');
    }
  } catch (error) {
    console.error('Kakao login error:', error);
    toast.error('Kakao login error.');
  }
};

  
  const handleKakaoFailure = (error) => {
    console.log('Kakao login failed:', error);
    toast.error('Kakao login failed');
  };

  // const handleSocialSignUp = (provider) => {
  //   // Placeholder for third-party sign-up integration
  //   console.log(`Sign-Up with ${provider}`);
  // };

  return (
    <div className="min-h-screen flex p-4 justify-center bg-gray-100 font-montserrat">
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
          <div className="w-full mb-4 flex justify-center">
             <GoogleLogin
              className="w-full px-4 py-2 border rounded-md hover:bg-gray-100 focus:outline-none"
              onSuccess={credentialResponse => {
              handleGoogleSuccess(credentialResponse);
            }}
            onError={() => {
              console.error('Login Failed');
              toast.error('Google login failed');
            }}
          />
          </div>

          {/* Kakao */}
          <div className="w-full flex justify-center">
          <KakaoLogin
            token="6ec9fb4811670e4bd219a26028bb3e5e"
            onSuccess={handleKakaoSuccess}
            onFail={handleKakaoFailure}
            onLogout={() => console.log('Logged out')}
            className="w-full px-4 py-2 border bg-yellow-400 text-center rounded-md hover:bg-yellow-500 focus:outline-none"
            buttonText="Login with Kakao"
          />
          </div>

          {/* Naver */}
          {/* <button
            onClick={() => handleSocialSignUp("Naver")}
            className="w-full flex items-center justify-center border py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Sign Up with Naver
          </button> */}
        </div>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a onClick={()=>navigate('/login')} className="text-blue-500 underline cursor-pointer">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

Signup.propTypes={
  BASE_URL: PropTypes.string.isRequired,
}

export default Signup;
