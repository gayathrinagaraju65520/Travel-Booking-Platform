import { Link } from "react-router-dom"
import { FaUsers, FaTags, FaClipboardList, FaChartBar, FaSignOutAlt } from "react-icons/fa"

const AdminDashboard = () => {
  const username = localStorage.getItem("username") || "Admin"

  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Welcome, {username}!</h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Manage and oversee the platform efficiently</p>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Platform Overview</h2>
            <p>Key statistics at a glance</p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-content">
                <FaUsers size={40} style={{ marginBottom: "10px", color: "#4CAF50" }} />
                <h3 className="card-title">Total Users</h3>
                <p className="card-text">500+</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <FaTags size={40} style={{ marginBottom: "10px", color: "#2196F3" }} />
                <h3 className="card-title">Active Deals</h3>
                <p className="card-text">20</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <FaClipboardList size={40} style={{ marginBottom: "10px", color: "#FF9800" }} />
                <h3 className="card-title">Pending Reviews</h3>
                <p className="card-text">15</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <FaChartBar size={40} style={{ marginBottom: "10px", color: "#E91E63" }} />
                <h3 className="card-title">Monthly Revenue</h3>
                <p className="card-text">$12,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Controls Section */}
      <section className="section" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="container">
          <div className="section-title">
            <h2>Admin Controls</h2>
            <p>Manage content and user activity</p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Manage Users</h3>
                <p className="card-text">Add, update, or delete users</p>
                <Link to="/admin/users" className="btn btn-outline">
                  View Users
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Manage Deals</h3>
                <p className="card-text">Add or modify featured deals</p>
                <Link to="/admin/deals" className="btn btn-outline">
                  View Deals
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Review Feedback</h3>
                <p className="card-text">Approve or reject user reviews</p>
                <Link to="/admin/reviews" className="btn btn-outline">
                  Review Feedback
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Platform Analytics</h3>
                <p className="card-text">View detailed performance data</p>
                <Link to="/admin/analytics" className="btn btn-outline">
                  View Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Recent Activity</h2>
            <p>Monitor user actions and platform changes</p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}>
            <div className="card">
              <div className="card-content">
                <p className="card-text">
                  <strong>New User Registered:</strong> John Doe
                </p>
                <p style={{ fontSize: "0.9rem", color: "#777" }}>5 mins ago</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <p className="card-text">
                  <strong>Deal Updated:</strong> 20% off on Hotels
                </p>
                <p style={{ fontSize: "0.9rem", color: "#777" }}>30 mins ago</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <p className="card-text">
                  <strong>Review Approved:</strong> "Great experience!"
                </p>
                <p style={{ fontSize: "0.9rem", color: "#777" }}>1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logout Section */}
      {/* <section className="section text-center" style={{ backgroundColor: "#ff4d4d", color: "#fff" }}>
        <div className="container">
          <h2>Ready to Logout?</h2>
          <p style={{ maxWidth: "600px", margin: "20px auto" }}>Ensure that you have reviewed all changes before logging out.</p>
          <button
            className="btn btn-outline"
            onClick={() => {
              localStorage.clear()
              window.location.href = "/login"
            }}
          >
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Logout
          </button>
        </div>
      </section> */}
    </div>
  )
}

export default AdminDashboard