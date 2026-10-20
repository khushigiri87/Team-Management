import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = ({ handleLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [, setuserData] = useContext(AuthContext);

  const fillDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setSuccess('');
    setIsSignUp(false);
  };

  const submitLoginHandler = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please provide both email and password');
      return;
    }
    handleLogin(email.trim(), password);
  };

  const submitSignUpHandler = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 3) {
      setError('Password must be at least 3 characters');
      return;
    }

    const existingEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const emailExists = existingEmployees.some(
      (emp) => emp.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      setError('An account with this email address already exists');
      return;
    }

    const newEmployee = {
      id: Date.now(),
      firstName: name.trim(),
      email: email.trim(),
      password: password,
      taskStats: {
        active: 0,
        newTask: 0,
        completed: 0,
        failed: 0
      },
      tasks: []
    };

    const updatedEmployees = [...existingEmployees, newEmployee];
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    if (setuserData) {
      setuserData(updatedEmployees);
    }

    setSuccess('Account created successfully! You can now sign in.');
    setIsSignUp(false);
    setName('');
    setConfirmPassword('');
    // keep email filled in for instant convenience
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0B0F19] flex items-center justify-center px-4 sm:px-6 py-12">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md">
        {/* App Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            TeamSync Workspace
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome to <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">TeamSync</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Enterprise Employee & Task Management Dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/40">
          {/* Mode Switcher Pills */}
          <div className="grid grid-cols-2 p-1 bg-gray-950/80 rounded-xl mb-6 border border-gray-800">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setError(''); }}
              className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                !isSignUp
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setError(''); }}
              className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                isSignUp
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Quick Demo Pill Helper */}
          {!isSignUp && (
            <div className="mb-6 p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/30">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-indigo-300 mb-2">
                ⚡ 1-Click Demo Login
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo("khushi@gmail.com", "123")}
                  className="flex-1 py-1.5 px-2 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 rounded-lg text-xs font-medium text-indigo-200 transition text-center"
                >
                  👑 Admin (Khushi)
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo("Rahul@gmail.com", "123")}
                  className="flex-1 py-1.5 px-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 rounded-lg text-xs font-medium text-purple-200 transition text-center"
                >
                  👤 Employee (Rahul)
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {error && (
            <div className="mb-4 flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs px-3.5 py-2.5 rounded-xl">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-3.5 py-2.5 rounded-xl">
              <span>✅</span>
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          {isSignUp ? (
            <form onSubmit={submitSignUpHandler} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition cursor-pointer"
              >
                Create Account
              </button>
            </form>
          ) : (
            <form onSubmit={submitLoginHandler} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-gray-300">
                    Password
                  </label>
                  <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-gray-400">
                <input
                  id="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded bg-gray-950 border-gray-700 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="remember-me" className="cursor-pointer select-none">
                  Keep me signed in
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition cursor-pointer"
              >
                Sign In to Dashboard
              </button>
            </form>
          )}

          {/* Bottom Switch Note */}
          <div className="mt-6 text-center text-xs text-gray-400 border-t border-gray-800/80 pt-4">
            {isSignUp ? (
              <p>
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setError(''); }}
                  className="text-indigo-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign In instead
                </button>
              </p>
            ) : (
              <p>
                New team member?{" "}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setError(''); }}
                  className="text-indigo-400 font-semibold hover:underline cursor-pointer"
                >
                  Register here
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Protected by Enterprise Session & LocalStorage Sync
        </p>
      </div>
    </div>
  );
};

export default Login;