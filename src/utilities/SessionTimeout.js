import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionTimeout = () => {
  // const [timer, setTimer] = useState(null);
    const timerRef = useRef(null);
  const navigate = useNavigate();

  // Define the maximum idle time before logout (in milliseconds)
  // const MAX_IDLE_TIME = 15 * 60 * 1000; // 15 minutes
  const MAX_IDLE_TIME = 1 * 60 * 1000; // 1 minutes

    // Function to check if the session has expired
    const checkSessionExpiry = () => {
      const lastActiveTime = localStorage.getItem("lastActiveTime");
      if (lastActiveTime) {
        const elapsedTime = Date.now() - parseInt(lastActiveTime, 10);
        if (elapsedTime >= MAX_IDLE_TIME) {
          handleSessionExpiry();
        }
      }
    };


  // Reset timer on user activity
  const resetTimer = () => {
    localStorage.setItem("lastActiveTime", Date.now().toString()); // Store last active time

   if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

   timerRef.current = setTimeout(() => {
      handleSessionExpiry();
    }, MAX_IDLE_TIME);
  };

  // Handle session expiry (logout user)
  const handleSessionExpiry = () => {
    // Clear the session data (e.g., token)
    localStorage.removeItem('authToken');
    localStorage.removeItem("lastActiveTime");
    // sessionStorage.removeItem('authToken');

    // Redirect to login page
    navigate('login');
    window.location.reload();
    // alert('Session expired. Please log in again.');
  };

  // Track user activity (mouse move, click, keypress)
  useEffect(() => {
    // Check session expiry when the user comes back to the tab
    checkSessionExpiry();

    const handleActivity = () => resetTimer();
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener("focus", checkSessionExpiry); // Check expiry when tab is focused again


    // Initialize the timer on component mount
    resetTimer();

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener("focus", checkSessionExpiry);
      clearTimeout(timerRef.current);
    };
  }, []);

  return null;
};

export default SessionTimeout;
