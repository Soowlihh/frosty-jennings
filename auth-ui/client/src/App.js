import { useState } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [page, setPage] = useState('landing');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {page === 'landing' && (
        <Landing onLogin={() => setPage('login')} onRegister={() => setPage('register')} />
      )}
      {page === 'login' && (
        <Login onSwitch={() => setPage('register')} onBack={() => setPage('landing')} />
      )}
      {page === 'register' && (
        <Register onSwitch={() => setPage('login')} onBack={() => setPage('landing')} />
      )}
    </div>
  );
}

export default App;
