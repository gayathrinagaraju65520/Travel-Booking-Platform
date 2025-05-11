"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { hotels } from "../data/hotels"

const Hotels = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [allHotels, setAllHotels] = useState([])
  const [filteredHotels, setFilteredHotels] = useState([])
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  })
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    rating: 0,
    amenities: [],
  })
  const [sortBy, setSortBy] = useState("recommended")
  const [loading, setLoading] = useState(true)

  // Extract query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const destination = params.get("destination") || ""
    const fromDate = params.get("fromDate") || ""
    const toDate = params.get("toDate") || ""
    const travelers = params.get("travelers") || 1

    setSearchParams({
      location: destination,
      checkInDate: fromDate,
      checkOutDate: toDate,
      guests: Number(travelers),
    })

    // Simulate API call delay
    setTimeout(() => {
      setAllHotels(hotels)
      setFilteredHotels(hotels)
      setLoading(false)
    }, 1000)
  }, [location.search])

  // Apply filters and sorting
  useEffect(() => {
    let results = [...allHotels]

    // Filter by location if provided
    if (searchParams.location) {
      results = results.filter((hotel) => hotel.location.toLowerCase().includes(searchParams.location.toLowerCase()))
    }

    // Filter by price range
    results = results.filter((hotel) => hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1])

    // Filter by rating
    if (filters.rating > 0) {
      results = results.filter((hotel) => hotel.rating >= filters.rating)
    }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      results = results.filter((hotel) => filters.amenities.every((amenity) => hotel.amenities.includes(amenity)))
    }

    // Apply sorting
    if (sortBy === "price-low") {
      results.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      results.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating)
    }

    setFilteredHotels(results)
  }, [allHotels, searchParams, filters, sortBy])

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFilters((prev) => {
        const amenities = [...prev.amenities]

        if (checked) {
          amenities.push(value)
        } else {
          const index = amenities.indexOf(value)
          if (index > -1) {
            amenities.splice(index, 1)
          }
        }

        return { ...prev, amenities }
      })
    } else if (name === "minPrice" || name === "maxPrice") {
      const index = name === "minPrice" ? 0 : 1
      const newRange = [...filters.priceRange]
      newRange[index] = Number(value)
      setFilters((prev) => ({ ...prev, priceRange: newRange }))
    } else {
      setFilters((prev) => ({ ...prev, [name]: Number(value) }))
    }
  }

  // Handle booking
  const handleBookHotel = (hotelId) => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate(`/payment?type=hotel&id=${hotelId}`)
    } else {
      navigate("/login")
    }
  }

  // Get all possible amenities for filter
  const allAmenities = [...new Set(allHotels.flatMap((hotel) => hotel.amenities))]

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Find the Perfect Hotel</h1>
          <p>Browse and book accommodations tailored to your needs</p>
        </div>

        <div className="search-form">
          <form>
            <div className="search-content">
              <div className="search-input">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Where are you going?"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                />
              </div>

              <div className="search-input">
                <label className="form-label">Check-in Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={searchParams.checkInDate}
                  onChange={(e) => setSearchParams({ ...searchParams, checkInDate: e.target.value })}
                />
              </div>

              <div className="search-input">
                <label className="form-label">Check-out Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={searchParams.checkOutDate}
                  onChange={(e) => setSearchParams({ ...searchParams, checkOutDate: e.target.value })}
                />
              </div>

              <div className="search-input">
                <label className="form-label">Guests</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="10"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({ ...searchParams, guests: Number(e.target.value) })}
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

        <div className="flex justify-between align-center mb-2">
          <div>{filteredHotels.length} hotels found</div>
          <div>
            <label>Sort By: </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-control"
              style={{ display: "inline-block", width: "auto", marginLeft: "10px" }}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="flex" style={{ gap: "20px", alignItems: "flex-start" }}>
          {/* Filters */}
          <div className="filter-sidebar" style={{ minWidth: "250px" }}>
            <h3>Filters</h3>

            <div className="filter-section">
              <h4>Price Range (per night)</h4>
              <div className="filter-options">
                <div className="flex gap-10">
                  <div>
                    <label>Min ₹</label>
                    <input
                      type="number"
                      className="form-control"
                      name="minPrice"
                      min="0"
                      value={filters.priceRange[0]}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label>Max ₹</label>
                    <input
                      type="number"
                      className="form-control"
                      name="maxPrice"
                      min="0"
                      value={filters.priceRange[1]}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
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

            <div className="filter-section">
              <h4>Amenities</h4>
              <div className="filter-options">
                {allAmenities.map((amenity) => (
                  <label key={amenity}>
                    <input
                      type="checkbox"
                      value={amenity}
                      checked={filters.amenities.includes(amenity)}
                      onChange={handleFilterChange}
                    />{" "}
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Hotel List */}
          <div className="hotel-results" style={{ flex: 1 }}>
            {loading ? (
              <div className="text-center">Loading hotels...</div>
            ) : filteredHotels.length === 0 ? (
              <div className="text-center">No hotels found matching your criteria.</div>
            ) : (
              <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
                {filteredHotels.map((hotel) => (
                  <div key={hotel.id} className="card">
                    <div className="flex" style={{ flexDirection: "row" }}>
                      <img
                        src={hotel.images[0] || "/placeholder.svg"}
                        alt={hotel.name}
                        style={{ width: "200px", height: "150px", objectFit: "cover" }}
                      />

                      <div className="card-content" style={{ flex: 1 }}>
                        <div className="flex justify-between">
                          <h3 className="card-title">{hotel.name}</h3>
                          <div className="stars">
                            {"★".repeat(Math.floor(hotel.rating))}
                            {hotel.rating % 1 >= 0.5 ? "½" : ""}
                          </div>
                        </div>

                        <p>{hotel.location}</p>
                        <p>{hotel.description}</p>

                        <div className="flex justify-between align-center" style={{ marginTop: "10px" }}>
                          <div>
                            <div>
                              <strong>Price:</strong> <span className="price">₹{hotel.price}</span> per night
                            </div>
                            <div>
                              <strong>Available Rooms:</strong> {hotel.availableRooms}
                            </div>
                          </div>

                          <button className="btn btn-primary" onClick={() => handleBookHotel(hotel.id)}>
                            Book Now
                          </button>
                        </div>

                        <div style={{ marginTop: "10px" }}>
                          <small>
                            <strong>Amenities:</strong> {hotel.amenities.join(", ")}
                          </small>
                        </div>
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
  )
}

export default Hotels