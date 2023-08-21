import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
  });
  const [otp, setOtp] = useState("");
  const [otpFromServer, setOtpFromServer] = useState("");
  const { firstname, lastname, email, phonenumber } = inputValue;
  const [otpSent, setOtpsent] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "otp") {
      setOtp(value);
      if (value === otpFromServer) {
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }
    }
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/send-otp", {
        phonenumber,
      });
      const otpData = response.data.otp;
      setOtpFromServer(otpData);
      setOtpsent(true);
    } catch (error) {
      console.log("error sending otp");
    }
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
    });
  };

  return (
    <div className="container m-5">
      <div className="card">
        <div className="card-body">
          <h2 className="mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={handleOnChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number (please include country code. For eg:
                +91XXXXXYYYYYY)
              </label>
              <div className="input-group">
                <input
                  type="tel"
                  className="form-control"
                  id="phonenumber"
                  name="phonenumber"
                  value={phonenumber}
                  onChange={handleOnChange}
                  required
                />
                {!otpSent ? (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSendOTP}
                  >
                    Send OTP
                  </button>
                ) : (
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={handleOnChange}
                      placeholder="Enter OTP"
                      required
                    />
                    {isMatch && <p>Otp Correct</p>}
                  </div>
                )}
              </div>
            </div>
            {isMatch && (
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            )}

            <div className="mb-3">
              <span>
                Already have an account? <Link to={"/login"}>Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
