import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionTimeout = () => {
  // const [timer, setTimer] = useState(null);
    const timerRef = useRef(null);
  const navigate = useNavigate();

  // Define the maximum idle time before logout (in milliseconds)
  // const MAX_IDLE_TIME = 15 * 60 * 1000; // 15 minutes
  const MAX_IDLE_TIME = 1 * 60 * 1000; // 1 minutes

  // Reset timer on user activity
  const resetTimer = () => {
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
    // sessionStorage.removeItem('authToken');

    // Redirect to login page
    navigate('login');
    window.location.reload();
    // alert('Session expired. Please log in again.');
  };

  // Track user activity (mouse move, click, keypress)
  useEffect(() => {
      const handleActivity = () => resetTimer();
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    // Initialize the timer on component mount
    resetTimer();

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearTimeout(timerRef.current);
    };
  }, []);

  return null;
};

export default SessionTimeout;
