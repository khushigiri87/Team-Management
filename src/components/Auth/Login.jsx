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

  const submitLoginHandler = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please enter both email and password');
      return;
    }
    handleLogin(email.trim(), password);
  };

  const submitSignUpHandler = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields');
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
      setError('An account with this email already exists');
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

    setSuccess('Account created successfully! Please log in.');
    setIsSignUp(false);
    setName('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {isSignUp ? "Create an Account" : "Log In"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {isSignUp ? "Fill in the details to register" : "Enter your email and password to continue"}
          </p>
        </div>

        {/* Error / Success message */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-lg">
            {success}
          </div>
        )}

        {isSignUp ? (
          <form onSubmit={submitSignUpHandler} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm transition"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={submitLoginHandler} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm transition"
            >
              Log In
            </button>
          </form>
        )}

        {/* Toggle sign in / sign up */}
        <div className="mt-5 text-center text-xs text-gray-400">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setError(''); }}
                className="text-emerald-400 font-medium hover:underline ml-1"
              >
                Log In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setError(''); }}
                className="text-emerald-400 font-medium hover:underline ml-1"
              >
                Create one
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;