import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Directly navigate without validation
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-indigo-600">SaaS Base</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-900">
            Welcome back
          </h2>
          <p className="text-gray-600 mb-6">Login to your Dashboard</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="mt-1 block w-full px-3 py-2 border rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms & Conditions
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign in
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Login with OTP
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Create Account
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Gradient */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-purple-600 to-pink-500 items-center justify-center text-white p-8">
        <div className="space-y-6 max-w-md">
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">WALLET & ACCESS CONTROL</h3>
            <p className="text-sm text-gray-100">
              Prepaid wallet with Razorpay integration and automated access
              control. Submissions are allowed only if balance or subscription
              is valid.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">NOTIFICATIONS & BILLING</h3>
            <p className="text-sm text-gray-100">
              Automated SMS/Email/WhatsApp alerts via MSG91 for low balance,
              expiry, and payments. Includes detailed reports and invoice
              generation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
