import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const SessionTimeout = () => {
  const [timer, setTimer] = useState(null);
  const history = useHistory();

  // Define the maximum idle time before logout (in milliseconds)
  const MAX_IDLE_TIME = 15 * 60 * 1000; // 15 minutes

  // Reset timer on user activity
  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }

    // Set the new timer
    const newTimer = setTimeout(() => {
      handleSessionExpiry();
    }, MAX_IDLE_TIME);

    setTimer(newTimer);
  };

  // Handle session expiry (logout user)
  const handleSessionExpiry = () => {
    // Clear the session data (e.g., token)
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    // Redirect to login page
    history.push('/login');
    alert('Session expired. Please log in again.');
  };

  // Track user activity (mouse move, click, keypress)
  useEffect(() => {
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    // Initialize the timer on component mount
    resetTimer();

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      clearTimeout(timer);
    };
  }, [timer]);

  return null;
};

export default SessionTimeout;
