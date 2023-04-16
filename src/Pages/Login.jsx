import { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate} from "react-router-dom"

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/")
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  return (
    <>
      <div>
        <h2>Log In</h2>
        {error && alert(error)}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" ref={emailRef} required />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />
          <br />
          <button disabled={loading} type="submit">Log In</button>
        </form>
        <div><Link to="/forgot-password">Forgot Password?</Link></div>
      </div>
      <div>Need an account? <Link to="/signup">Sign Up</Link></div>
    </>
  );
};

export default Login;
