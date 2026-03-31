export default function Landing({ onLogin, onRegister }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">ExpenseTracker</h1>
        <p className="text-gray-500 text-lg mb-10">
          Keep track of where your money goes, simply.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onLogin}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Sign in
          </button>
          <button
            onClick={onRegister}
            className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
