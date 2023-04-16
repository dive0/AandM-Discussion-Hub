import { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const displayNameRef = useRef();
  const { currentUser, setEmail, setPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    const promises = []
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(setEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(setPassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      navigate("/")
    }).catch(() => {
      setError("Failed to update account")
    }).finally(() => {
      setLoading(false)
    })
  };

  return (
    <>
      <div>
        <h2>Update Profile</h2>
        {error && alert(error)}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            defaultValue={currentUser.email}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            placeholder="Leave blank to keep same"
          />
          <br />
          <label htmlFor="passwordConfirm">Password Confirmation</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            ref={passwordConfirmRef}
            placeholder="Leave blank to keep same"
          />
          <br />
          <button disabled={loading} type="submit">
            Update
          </button>
        </form>
      </div>
      <div>
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
