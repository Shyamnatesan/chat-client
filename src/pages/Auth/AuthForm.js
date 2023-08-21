import React, { useState } from "react";

export default function AuthForm({ isSignUp }) {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "male",
    phoneNumber: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your authentication logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 bg-light rounded">
            <h3 className="mb-4">{isSignUp ? "Sign Up" : "Log In"}</h3>
            {isSignUp && (
              <>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={userDetails.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <div className="d-flex">
                    <div className="form-check me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="gender"
                        id="male"
                        value="male"
                        checked={userDetails.gender === "male"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="form-check me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="gender"
                        id="female"
                        value="female"
                        checked={userDetails.gender === "female"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="gender"
                        id="others"
                        value="others"
                        checked={userDetails.gender === "others"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="others">
                        Others
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={userDetails.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userDetails.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
