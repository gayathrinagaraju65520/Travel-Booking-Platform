import { Link } from "react-router-dom"
import SearchBar from "../Componets/SearchBar"
import FeaturedDeals from "../Componets/FeaturedDeals"

const Dashboard = () => {
  const username = localStorage.getItem("username") || "User"

  return (
    
    <div className="dashboard-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('src/Pages/Dash.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "89vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          “Seamless journeys start here – Book, manage, and go!”
          </h1>
          {/* Search Bar */}
          <div className="search-container">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <FeaturedDeals />

      {/* Manage Bookings Section */}
      <section className="section" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="container">
          <div className="section-title">
            <h2>Manage Your Bookings</h2>
            <p>Track and manage your trips and services</p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-content">
                <h3 className="card-title">View Bookings</h3>
                <p className="card-text">Check your past and upcoming trips</p>
                <Link to="/my-bookings" className="btn btn-outline">
                  View Bookings
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Explore More Services</h3>
                <p className="card-text">Book flights, hotels, and more</p>
                <Link to="/" className="btn btn-outline">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard