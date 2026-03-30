import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [page, setPage] = useState('login');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {page === 'login' ? (
        <Login onSwitch={() => setPage('register')} />
      ) : (
        <Register onSwitch={() => setPage('login')} />
      )}
    </div>
  );
}

export default App;
