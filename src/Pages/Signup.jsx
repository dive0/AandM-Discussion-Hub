import { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <div className="formsPage">
      <div className="formsContainer">
        <h2>Sign Up</h2>
        {error && alert(error)}
        <form onSubmit={handleSubmit} className="formsContainerContent">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" ref={emailRef} required />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />
          <label htmlFor="passwordConfirm">Password Confirmation</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            ref={passwordConfirmRef}
            required
          />
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className="authLinkContent">
        Already have an account?{" "}
        <Link to="/login" className="authLink">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
