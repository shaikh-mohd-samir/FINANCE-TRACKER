import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await API.post("/auth/signup", form);

      setMsg("Signup successful. Please login.");

      setTimeout(() => {
        navigate("/signin");
      }, 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <Header />

      {/* SIGNUP CARD */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={submit}
          className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full border px-4 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          {msg && (
            <p
              className={`text-sm mt-3 text-center ${
                msg.includes("successful")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {msg}
            </p>
          )}

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-sm text-blue-600 hover:underline"
            >
              Already have an account? Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}