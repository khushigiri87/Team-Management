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
        handleLogin(email, password);
        setEmail("");
        setPassword("");
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

        setSuccess('Account created successfully! Please sign in.');
        setIsSignUp(false);
        setName('');
        setConfirmPassword('');
        setPassword('');
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setError('');
        setSuccess('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 sm:px-6 py-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md">
                <div className="text-center mb-5 sm:mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {isSignUp ? "Create Account" : "Sign In"}
                    </h2>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                        {isSignUp ? "Register as a new team member" : "Welcome back, please login"}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 bg-red-100 border border-red-300 text-red-700 text-xs sm:text-sm px-3 py-2 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 bg-green-100 border border-green-300 text-green-700 text-xs sm:text-sm px-3 py-2 rounded-lg">
                        {success}
                    </div>
                )}

                {isSignUp ? (
                    <form onSubmit={submitSignUpHandler} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 bg-purple-600 text-white py-2.5 rounded-lg 
                            hover:bg-purple-700 active:scale-95 transition duration-300 font-semibold text-sm sm:text-base shadow-md">
                            Sign Up
                        </button>
                    </form>
                ) : (
                    <form onSubmit={submitLoginHandler} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input type="checkbox" className="accent-purple-600" />
                                Remember me
                            </label>

                            <span className="text-purple-600 cursor-pointer hover:underline">
                                Forgot password?
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-3 sm:mt-4 bg-purple-600 text-white py-2 rounded-lg 
                            hover:bg-purple-700 active:scale-95 transition duration-300 font-semibold text-sm sm:text-base shadow-md">
                            Sign In
                        </button>
                    </form>
                )}

                <p className="text-xs sm:text-sm text-center text-gray-500 mt-5 sm:mt-6">
                    {isSignUp ? "Already have an account? " : "Don’t have an account? "}
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="text-purple-600 font-medium hover:underline focus:outline-none cursor-pointer">
                        {isSignUp ? "Sign In" : "Create one"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;