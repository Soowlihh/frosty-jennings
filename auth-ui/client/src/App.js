import { useState } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Transactions from './components/Transactions'; 

function App() {
  const [page, setPage] = useState('landing');
  const [accessToken, setAccessToken] = useState(null); 

  
  const handleLoginSuccess = (token) => {
    setAccessToken(token);
    setPage('transactions');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {page === 'landing' && (
        <Landing onLogin={() => setPage('login')} onRegister={() => setPage('register')} />
      )}
      {page === 'login' && (
        <Login 
          onSwitch={() => setPage('register')} 
          onBack={() => setPage('landing')}
          onSuccess={handleLoginSuccess}
        />
      )}
      {page === 'register' && (
        <Register 
          onSwitch={() => setPage('login')} 
          onBack={() => setPage('landing')}
          onSuccess={() => setPage('login')} 
        />
      )}
  
      {page === 'transactions' && (
        <Transactions accessToken={accessToken} />
      )}
    </div>
  );
}

export default App;