import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/verify-signup", { otp });
      alert("Signup verified");
      navigate("/signin");
    } catch (err) {
      alert("OTP verification failed");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h3>Verify OTP</h3>
      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button type="submit">Verify</button>
    </form>
  );
}