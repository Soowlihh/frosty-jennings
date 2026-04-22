import { useState, useEffect, useRef } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Transactions from './components/Transactions';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const REFRESH_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

function App() {
  const [page, setPage] = useState('landing');
  const [accessToken, setAccessToken] = useState(null);
  const refreshTimer = useRef(null);

  const handleLoginSuccess = (token) => {
    setAccessToken(token);
    setPage('transactions');
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' });
    } catch {
      // best-effort
    }
    clearInterval(refreshTimer.current);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    setPage('landing');
  };

  useEffect(() => {
    if (!accessToken) return;

    const refresh = async () => {
      try {
        const res = await fetch(`${API}/refresh`, { method: 'POST', credentials: 'include' });
        const data = await res.json();
        if (data.ok) {
          setAccessToken(data.accessToken);
          localStorage.setItem('accessToken', data.accessToken);
        } else {
          // Refresh token invalid — send user back to landing
          setAccessToken(null);
          setPage('landing');
        }
      } catch {
        // Network error — leave user logged in and retry next interval
      }
    };

    refreshTimer.current = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(refreshTimer.current);
  }, [accessToken]);
  
  if (page === 'transactions') {
    return <Transactions accessToken={accessToken} onLogout={handleLogout} />;
  }

  if (page === 'landing') {
    return <Landing onLogin={() => setPage('login')} onRegister={() => setPage('register')} />;
  }

  if (page === 'login') {
    return (
      <Login
        onSwitch={() => setPage('register')}
        onBack={() => setPage('landing')}
        onSuccess={handleLoginSuccess}
      />
    );
  }

  if (page === 'register') {
    return (
      <Register
        onSwitch={() => setPage('login')}
        onBack={() => setPage('landing')}
        onSuccess={() => setPage('login')}
      />
    );
  }

  return null;
}

export default App;