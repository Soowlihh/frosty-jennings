import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export default function Transactions({ accessToken }) {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    fetch(`${API}/transactions`, { headers: authHeaders, credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTransactions(data);
        else setError(data.message || 'Failed to load transactions');
      })
      .catch(() => setError('Could not reach server'))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p className="text-gray-500 text-sm">Loading...</p>;

  return (
    <div className="w-full max-w-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Transactions</h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {transactions.length === 0 ? (
        <p className="text-gray-400 text-sm">No transactions yet.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((t) => (
            <li
              key={t._id}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{t.statements}</p>
                <p className="text-xs text-gray-400">{new Date(t.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${
                    t.type === 'Income' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {t.type === 'Income' ? '+' : '-'}${t.amount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">{t.type}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
