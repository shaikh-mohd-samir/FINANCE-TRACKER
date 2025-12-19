import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500">Username</label>
            <p className="font-medium">{user.username}</p>
          </div>

          <div>
            <label className="block text-sm text-gray-500">Email</label>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm text-gray-500">Password</label>
            <p className="font-medium">********</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/forgot")}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Change Password
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}