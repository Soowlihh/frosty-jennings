import { useState, useEffect, useCallback } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const TODAY = new Date().toISOString().split('T')[0];
const EMPTY_FORM = { statements: '', amount: '', type: 'Expense', date: TODAY };

export default function Transactions({ accessToken, onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null); // null | { mode: 'add' } | { mode: 'edit', tx }
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const fetchTransactions = useCallback(async () => {
    setError('');
    try {
      const res = await fetch(`${API}/transactions`, { headers: authHeaders, credentials: 'include' });
      const data = await res.json();
      if (Array.isArray(data)) setTransactions(data);
      else setError(data.message || 'Failed to load transactions');
    } catch {
      setError('Could not reach server');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setModal({ mode: 'add' });
  };

  const openEdit = (tx) => {
    setForm({
      statements: tx.statements,
      amount: String(tx.amount),
      type: tx.type,
      date: new Date(tx.date).toISOString().split('T')[0],
    });
    setModal({ mode: 'edit', tx });
  };

  const closeModal = () => { setModal(null); setForm(EMPTY_FORM); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const body = { ...form, amount: parseFloat(form.amount) };
    try {
      const url = modal.mode === 'add'
        ? `${API}/transactions`
        : `${API}/transactions/${modal.tx._id}/edit`;
      const res = await fetch(url, {
        method: modal.mode === 'add' ? 'POST' : 'PUT',
        headers: authHeaders,
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (res.ok) {
        await fetchTransactions();
        closeModal();
      } else {
        const data = await res.json();
        setError(data.message || 'Save failed');
      }
    } catch {
      setError('Could not reach server');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      const res = await fetch(`${API}/transactions/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
        credentials: 'include',
      });
      if (res.ok) {
        setTransactions((prev) => prev.filter((t) => t._id !== id));
      } else {
        const data = await res.json();
        setError(data.message || 'Delete failed');
      }
    } catch {
      setError('Could not reach server');
    } finally {
      setDeleteId(null);
    }
  };

  const totalIncome = transactions.filter((t) => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <span className="text-base font-bold text-gray-900 tracking-tight">ExpenseTracker</span>
        <button
          onClick={onLogout}
          className="text-sm text-gray-400 hover:text-gray-900 transition-colors font-medium"
        >
          Logout
        </button>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-5 bg-red-50 border border-red-100 text-red-500 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 mb-1.5 font-medium">Balance</p>
            <p className={`text-lg font-bold ${balance >= 0 ? 'text-gray-900' : 'text-red-500'}`}>
              {balance < 0 ? '-' : ''}${Math.abs(balance).toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 mb-1.5 font-medium">Income</p>
            <p className="text-lg font-bold text-green-600">+${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 mb-1.5 font-medium">Expenses</p>
            <p className="text-lg font-bold text-red-500">-${totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        {/* List header */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Transactions</p>
          <button
            onClick={openAdd}
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors"
          >
            + Add
          </button>
        </div>

        {/* List */}
        {transactions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <p className="text-gray-400 text-sm">No transactions yet.</p>
            <button
              onClick={openAdd}
              className="mt-3 text-sm text-gray-900 font-medium underline underline-offset-2"
            >
              Add your first one
            </button>
          </div>
        ) : (
          <ul className="space-y-2">
            {transactions.map((t) => (
              <li
                key={t._id}
                className="bg-white border border-gray-100 rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-sm"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-medium text-gray-800 truncate">{t.statements}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(t.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-semibold tabular-nums ${
                      t.type === 'Income' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {t.type === 'Income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => openEdit(t)}
                    title="Edit"
                    className="text-gray-300 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteId(t._id)}
                    title="Delete"
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-base font-semibold text-gray-900 mb-5">
              {modal.mode === 'add' ? 'New Transaction' : 'Edit Transaction'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <input
                  required
                  autoFocus
                  value={form.statements}
                  onChange={(e) => setForm((f) => ({ ...f, statements: e.target.value }))}
                  placeholder="e.g. Grocery shopping"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Amount ($)</label>
                  <input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.amount}
                    onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                    placeholder="0.00"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                  >
                    <option>Expense</option>
                    <option>Income</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <h2 className="text-base font-semibold text-gray-900 mb-1.5">Delete transaction?</h2>
            <p className="text-sm text-gray-400 mb-6">This can't be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
