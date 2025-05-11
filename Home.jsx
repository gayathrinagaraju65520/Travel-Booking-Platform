import { Link } from "react-router-dom"
import SearchBar from "../Componets/SearchBar"
import FeaturedDeals from "../Componets/FeaturedDeals"

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('src/Pages/Dash.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Discover Your Perfect Trip</h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            Book flights, hotels, cabs, and restaurants all in one place
          </p>

          {/* Search Bar */}
          <div className="search-container">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>Everything you need for your perfect trip</p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Flights</h3>
                <p className="card-text">Find the best deals on flights to hundreds of destinations worldwide.</p>
                <Link to="/flights" className="btn btn-outline">
                  Book Flights
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Hotels</h3>
                <p className="card-text">From luxury resorts to budget-friendly options, find your perfect stay.</p>
                <Link to="/hotels" className="btn btn-outline">
                  Find Hotels
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Cab Services</h3>
                <p className="card-text">Reliable transportation options to get you where you need to go.</p>
                <Link to="/cabs" className="btn btn-outline">
                  Book Cabs
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Restaurants</h3>
                <p className="card-text">Discover and reserve tables at the best restaurants in town.</p>
                <Link to="/restaurants" className="btn btn-outline">
                  Find Restaurants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <FeaturedDeals />
    </div>
  )
}

export default Home