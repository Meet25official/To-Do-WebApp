import React from "react";
import { Link } from "react-router-dom";
import './welcome.scss';

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="right">
        <img
          src="https://i.pinimg.com/474x/01/5c/d1/015cd1a2012af33b64bdf68583165341.jpg"
          alt="Welcome to the productivity App"
        />
      </div>
      <div className="left">
        <div className="wrapper">
          <h1>Productive Mind</h1>
          <p className="body">
            Organize your tasks, manage your time, and boost your productivity with our intuitive interface
          </p>
          <button className="btn">
            <Link to="/register" style={{textDecoration: "none", color: "black" }}>
            get Started
            </Link>
          </button>
          <p>
            Already have an account?
            <span
              style={{
                color: "#007bff",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Link to="/login" style={{textDecoration: "none" }}>
              Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
