import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // save token + user
      login(res.data.token, res.data.user);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Sign In
          </h2>

          {error && (
            <p className="mb-4 text-center text-red-500 text-sm">{error}</p>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
  />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
  />

        <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
  >
        {loading ? "Signing in..." : "Login"}
      </button>
  </form>

          {/* FORGOT PASSWORD (OUTSIDE FORM) */}
          <div className="mt-4 text-center">
            <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

          <div className="mt-2 text-center text-sm">
          Don’t have an account?{" "}
          <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-blue-600 hover:underline font-medium"
        >
          Create account
          </button>
      </div>
        </div>
      </div>
    </>
  );
}