import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [otpSent, setOtpsent] = useState(false);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    phonenumber: "",
  });
  const [otp, setOtp] = useState("");
  const [otpFromServer, setOtpFromServer] = useState("");
  const { phonenumber } = inputValue;
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

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { status, message } = data;
      if (status) {
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
      phonenumber: "",
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

  return (
    <div className="container m-5">
      <div className="card">
        <div className="card-body">
          <h2 className="mb-4">Sign in</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number
              </label>
              <div className="input-group">
                <input
                  type="tel"
                  className="form-control"
                  id="phonenumber"
                  name="phonenumber"
                  value={inputValue.phonenumber}
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
                  Sign in
                </button>
              </div>
            )}

            <div className="mb-3">
              <span>
                Don't have an account? <Link to={"/signup"}>Sign Up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
