import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";  
import { flights } from "../data/flights";  

const Flights = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allFlights, setAllFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    passengers: 1,
  });
  const [filters, setFilters] = useState({
    airline: [],
    maxPrice: 10000,
    stops: "any",
  });
  const [loading, setLoading] = useState(true);

  // Extract query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const origin = params.get("from") || "";
    const destination = params.get("destination") || "";
    const fromDate = params.get("fromDate") || "";
    const toDate = params.get("toDate") || "";
    const travelers = params.get("travelers") || 1;

    setSearchParams({
      origin,
      destination,
      departureDate: fromDate,
      passengers: Number(travelers),
    });

    // Simulate API call delay
    setTimeout(() => {
      setAllFlights(flights);  // In a real case, this would come from the backend
      setFilteredFlights(flights);
      setLoading(false);
    }, 1000);
  }, [location.search]);

  // Apply filters
  useEffect(() => {
    let results = [...allFlights];

    // Filter by origin
    if (searchParams.origin) {
      results = results.filter((flight) =>
        flight.departure.city.toLowerCase().includes(searchParams.origin.toLowerCase())
      );
    }

    // Filter by destination
    if (searchParams.destination) {
      results = results.filter((flight) =>
        flight.arrival.city.toLowerCase().includes(searchParams.destination.toLowerCase())
      );
    }

    // Filter by airline
    if (filters.airline.length > 0) {
      results = results.filter((flight) => filters.airline.includes(flight.airline));
    }

    // Filter by price
    results = results.filter((flight) => flight.price <= filters.maxPrice);

    // Filter by stops
    if (filters.stops !== "any") {
      const stops = Number(filters.stops);
      results = results.filter((flight) => flight.stops === stops);
    }

    setFilteredFlights(results);
  }, [allFlights, searchParams, filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prev) => {
        const airlines = [...prev.airline];

        if (checked) {
          airlines.push(value);
        } else {
          const index = airlines.indexOf(value);
          if (index > -1) {
            airlines.splice(index, 1);
          }
        }

        return { ...prev, airline: airlines };
      });
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle booking flight and redirect to payment
  const handleBookFlight = (flightId) => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate(`/payment?type=flight&id=${flightId}`);
    } else {
      navigate("/login");
    }
  };
  

  // Get unique airlines for filter
  const airlines = [...new Set(allFlights.map((flight) => flight.airline))];

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Available Flights</h1>
          <p>Find and book your perfect flight</p>
        </div>

        <div className="search-form">
          <form>
            <div className="search-content">
              <div className="search-input">
                <label className="form-label">From</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter departure city"
                  value={searchParams.origin}
                  onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                />
              </div>

              <div className="search-input">
                <label className="form-label">Destination</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter destination city"
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                />
              </div>

              <div className="search-input">
                <label className="form-label">Departure Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={searchParams.departureDate}
                  onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
                />
              </div>

              <div className="search-input">
                <label className="form-label">Passengers</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="10"
                  value={searchParams.passengers}
                  onChange={(e) => setSearchParams({ ...searchParams, passengers: Number(e.target.value) })}
                />
              </div>

              <div className="search-btn">
                <button type="button" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex" style={{ gap: "20px", alignItems: "flex-start" }}>
          {/* Filters */}
          <div className="filter-sidebar" style={{ minWidth: "250px" }}>
            <h3>Filters</h3>

            <div className="filter-section">
              <h4>Airlines</h4>
              <div className="filter-options">
                {airlines.map((airline) => (
                  <label key={airline}>
                    <input
                      type="checkbox"
                      value={airline}
                      checked={filters.airline.includes(airline)}
                      onChange={handleFilterChange}
                    />{" "}
                    {airline}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="filter-options">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="50"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="range-slider"
                />
                <div>Max: ₹{filters.maxPrice}</div>
              </div>
            </div>

            <div className="filter-section">
              <h4>Stops</h4>
              <div className="filter-options">
                <select name="stops" value={filters.stops} onChange={handleFilterChange} className="form-control">
                  <option value="any">Any</option>
                  <option value="0">Non-stop</option>
                  <option value="1">1 Stop</option>
                  <option value="2">2+ Stops</option>
                </select>
              </div>
            </div>
          </div>

          {/* Flight List */}
          <div className="flight-results" style={{ flex: 1 }}>
            {loading ? (
              <div className="text-center">Loading flights...</div>
            ) : filteredFlights.length === 0 ? (
              <div className="text-center">No flights found matching your criteria.</div>
            ) : (
              <div>
                <div className="flight-count mb-2">{filteredFlights.length} flights found</div>

                {filteredFlights.map((flight) => (
                  <div key={flight.id} className="card">
                    <div className="card-content">
                      <div className="flex justify-between align-center">
                        <h3 className="card-title">
                          {flight.airline} - {flight.flightNumber}
                        </h3>
                        <span className="price">₹{flight.price}</span>
                      </div>

                      <div className="flex justify-between my-2">
                        <div>
                          <div>
                            <strong>From:</strong> {flight.departure.city} ({flight.departure.airport})
                          </div>
                          <div>
                            <strong>Time:</strong> {flight.departure.time}
                          </div>
                        </div>

                        <div>
                          <div>
                            <strong>To:</strong> {flight.arrival.city} ({flight.arrival.airport})
                          </div>
                          <div>
                            <strong>Time:</strong> {flight.arrival.time}
                          </div>
                        </div>

                        <div>
                          <div>
                            <strong>Duration:</strong> {flight.duration}
                          </div>
                          <div>
                            <strong>Stops:</strong>{" "}
                            {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between align-center">
                        <div>
                          <div>
                            <strong>Class:</strong> {flight.class}
                          </div>
                          <div>
                            <strong>Available Seats:</strong> {flight.availableSeats}
                          </div>
                        </div>
                        <button onClick={() => handleBookFlight(flight.id)}>Book Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
