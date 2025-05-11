import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { email, password } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      })

      const data = response.data

      if (data.status === "success") {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("username", data.username)
        localStorage.setItem("isAdmin", data.role === "ADMIN" ? "true" : "false")
        localStorage.setItem("email", email) // ✅ Set email for profile fetch

        if (data.role === "ADMIN") {
          navigate("/admin")
        } else {
          navigate("/dashboard")
        }

        window.location.reload()
      } else {
        setError("Invalid email or password")
      }
    } catch (error) {
      setError("Error logging in. Please try again.")
      console.error("Login error:", error)
    }
  }

  return (
    <div className="page-container">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Login to Your Account</h2>
          <p>Welcome back! Please login to access your account.</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Login
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login