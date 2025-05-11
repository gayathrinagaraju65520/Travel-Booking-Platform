"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { restaurants } from "../data/restaurants"

const Restaurant = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [allRestaurants, setAllRestaurants] = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [searchParams, setSearchParams] = useState({
    location: "",
    date: "",
    time: "",
    people: 2,
  })
  const [filters, setFilters] = useState({
    cuisine: [],
    priceRange: [],
    rating: 0,
  })
  const [loading, setLoading] = useState(true)
  const [reservationModal, setReservationModal] = useState({
    isOpen: false,
    restaurant: null,
  })

  // Extract query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const destination = params.get("destination") || ""
    const fromDate = params.get("fromDate") || ""
    const travelersParam = params.get("travelers") || 2

    setSearchParams({
      location: destination,
      date: fromDate,
      time: "19:00",
      people: Number(travelersParam),
    })

    // Simulate API call delay
    setTimeout(() => {
      setAllRestaurants(restaurants)
      setFilteredRestaurants(restaurants)
      setLoading(false)
    }, 1000)
  }, [location.search])

  // Apply filters
  useEffect(() => {
    let results = [...allRestaurants]

    // Filter by location if provided
    if (searchParams.location) {
      results = results.filter((restaurant) =>
        restaurant.location.toLowerCase().includes(searchParams.location.toLowerCase()),
      )
    }

    // Filter by cuisine
    if (filters.cuisine.length > 0) {
      results = results.filter((restaurant) => filters.cuisine.includes(restaurant.cuisine))
    }

    // Filter by price range
    if (filters.priceRange.length > 0) {
      results = results.filter((restaurant) => filters.priceRange.includes(restaurant.priceRange))
    }

    // Filter by rating
    if (filters.rating > 0) {
      results = results.filter((restaurant) => restaurant.rating >= filters.rating)
    }

    setFilteredRestaurants(results)
  }, [allRestaurants, searchParams, filters])

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFilters((prev) => {
        const values = [...prev[name]]

        if (checked) {
          values.push(value)
        } else {
          const index = values.indexOf(value)
          if (index > -1) {
            values.splice(index, 1)
          }
        }

        return { ...prev, [name]: values }
      })
    } else {
      setFilters((prev) => ({ ...prev, [name]: Number(value) }))
    }
  }

  // Handle reservation
  const handleReservation = (restaurant) => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setReservationModal({
        isOpen: true,
        restaurant,
      })
    } else {
      navigate("/login")
    }
  }

  // Handle reservation submit
  const handleReservationSubmit = (e) => {
    e.preventDefault()
    alert(
      `Reservation confirmed at ${reservationModal.restaurant.name} for ${searchParams.people} people on ${searchParams.date} at ${searchParams.time}`,
    )
    setReservationModal({ isOpen: false, restaurant: null })
  }

  // Get unique cuisines for filter
  const cuisines = [...new Set(allRestaurants.map((restaurant) => restaurant.cuisine))]
  // Get unique price ranges for filter
  const priceRanges = [...new Set(allRestaurants.map((restaurant) => restaurant.priceRange))]

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Find Restaurants</h1>
          <p>Discover and reserve tables at top restaurants</p>
        </div>

        <div className="search-form">
          <form>
            <div className="search-content">
              <div className="search-input">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city or area"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                />
              </div>

              <div className="search-input">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                />
              </div>

              <div className="search-input">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={searchParams.time}
                  onChange={(e) => setSearchParams({ ...searchParams, time: e.target.value })}
                />
              </div>

              <div className="search-input">
                <label className="form-label">People</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="10"
                  value={searchParams.people}
                  onChange={(e) => setSearchParams({ ...searchParams, people: Number(e.target.value) })}
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
              <h4>Cuisine</h4>
              <div className="filter-options">
                {cuisines.map((cuisine) => (
                  <label key={cuisine}>
                    <input
                      type="checkbox"
                      name="cuisine"
                      value={cuisine}
                      checked={filters.cuisine.includes(cuisine)}
                      onChange={handleFilterChange}
                    />{" "}
                    {cuisine}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="filter-options">
                {priceRanges.map((price) => (
                  <label key={price}>
                    <input
                      type="checkbox"
                      name="priceRange"
                      value={price}
                      checked={filters.priceRange.includes(price)}
                      onChange={handleFilterChange}
                    />{" "}
                    {price}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Rating</h4>
              <div className="filter-options">
                <select name="rating" value={filters.rating} onChange={handleFilterChange} className="form-control">
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>

          {/* Restaurant List */}
          <div className="restaurant-results" style={{ flex: 1 }}>
            {loading ? (
              <div className="text-center">Loading restaurants...</div>
            ) : filteredRestaurants.length === 0 ? (
              <div className="text-center">No restaurants found matching your criteria.</div>
            ) : (
              <div className="grid">
                {filteredRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="card">
                    <img src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} className="card-img" />
                    <div className="card-content">
                      <div className="flex justify-between">
                        <h3 className="card-title">{restaurant.name}</h3>
                        <div>
                          <span className="stars">
                            {"★".repeat(Math.floor(restaurant.rating))}
                            {restaurant.rating % 1 >= 0.5 ? "½" : ""}
                          </span>
                          <span> {restaurant.priceRange}</span>
                        </div>
                      </div>

                      <div>
                        <strong>Cuisine:</strong> {restaurant.cuisine}
                      </div>
                      <div>
                        <strong>Location:</strong> {restaurant.location}
                      </div>
                      <p className="card-text">{restaurant.description}</p>

                      <div className="my-1">
                        <div>
                          <strong>Hours:</strong> {restaurant.openingHours}
                        </div>
                        <div>
                          <strong>Popular Dishes:</strong> {restaurant.popularDishes.join(", ")}
                        </div>
                      </div>

                      {restaurant.reservationAvailable && (
                        <button className="btn btn-primary" onClick={() => handleReservation(restaurant)}>
                          Make Reservation
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      {reservationModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Reserve a Table at {reservationModal.restaurant.name}</h3>
              <button className="modal-close" onClick={() => setReservationModal({ isOpen: false, restaurant: null })}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleReservationSubmit}>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={searchParams.time}
                    onChange={(e) => setSearchParams({ ...searchParams, time: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Number of People</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="10"
                    value={searchParams.people}
                    onChange={(e) => setSearchParams({ ...searchParams, people: Number(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Special Requests (Optional)</label>
                  <textarea className="form-control" rows="3"></textarea>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setReservationModal({ isOpen: false, restaurant: null })}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Restaurant