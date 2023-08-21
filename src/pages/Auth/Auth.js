import React, { useState } from "react";
import "./Auth.css";
import AuthForm from "./AuthForm";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-color">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 ">
            <h1 className="text-center mb-4">Welcome to Your App</h1>
            {isSignUp ? (
              <AuthForm isSignUp={true} />
            ) : (
              <AuthForm isSignUp={false} />
            )}
            <div className="mt-3">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <span className="link-text" onClick={handleToggleForm}>
                    Log In
                  </span>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <span className="link-text" onClick={handleToggleForm}>
                    Sign Up
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
