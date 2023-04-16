import { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check inbox for next steps");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div className="formsPage">
      <div className="formsContainer">
        <h2>Reset Password</h2>
        {error && alert(error)}
        {message && alert(message)}
        <form onSubmit={handleSubmit} className="formsContainerContent">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" ref={emailRef} required />
          <button disabled={loading} type="submit">
            Reset Password
          </button>
        </form>
        <div className="loginResetLink">
          <Link to="/login">Log In</Link>
        </div>
      </div>
      <div className="authLinkContent">
        Need an account?{" "}
        <Link to="/signup" className="authLink">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
