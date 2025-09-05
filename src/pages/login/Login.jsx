import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {username, password} = formData;
    if(username.trim() === "" || password.trim() === "") {
        setError("Please fill in both fields");
        return;
    }
    setError("")
    alert("Login Successful");
    navigate("/home");
  };
  return (
    <div className="login">
      <div className="right">
        <img
          src="https://i.pinimg.com/474x/01/5c/d1/015cd1a2012af33b64bdf68583165341.jpg"
          alt="Welcome to our productivity app"
        />
      </div>
      <div className="left">
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <h1>Sign In</h1>

            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              autoComplete="username"
              required
            />
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

            <button className="btn" type="submit">
              Log In
            </button>
            {error && (
              <div
                style={{
                  backgroundColor: "#ffe0e0",
                  color: "#d8000c",
                  padding: "12px 16px",
                  border: "1px solid #d8000c",
                  borderRadius: "8px",
                  marginTop: "10px",
                  fontWeight: "500",
                }}
              >
                {error}
              </div>
            )}
            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <span style={{ color: "#007bff", cursor: "pointer" }}>
                {" "}
                <Link to="/register" style={{textDecoration:"none"}}>
                Sign Up
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
