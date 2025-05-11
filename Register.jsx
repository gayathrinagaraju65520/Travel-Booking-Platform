"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenumber: "", // added
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const { username, email, password, confirmPassword, phonenumber } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required"
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    // Phone number validation
    if (!phonenumber.trim()) {
      newErrors.phonenumber = "Phone number is required"
    } else if (!/^\d{10}$/.test(phonenumber)) {
      newErrors.phonenumber = "Phone number must be 10 digits"
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // API call to register
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, phonenumber }), // updated
      })

      if (response.ok) {
        alert("Registration successful! Please login with your new account.")
        navigate("/login")
      } else {
        const errorData = await response.json()
        setErrors({ apiError: errorData.message || "Registration failed" })
      }
    } catch (error) {
      setErrors({ apiError: "An error occurred. Please try again later." })
    }
  }

  return (
    <div className="page-container">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Join us and get started today!</p>
        </div>

        {errors.apiError && <div className="alert alert-danger">{errors.apiError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Choose a username"
              value={username}
              onChange={handleChange}
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              className="form-control"
              placeholder="Enter your phone number"
              value={phonenumber}
              onChange={handleChange}
            />
            {errors.phonenumber && <div className="error-message">{errors.phonenumber}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={handleChange}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Register
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register