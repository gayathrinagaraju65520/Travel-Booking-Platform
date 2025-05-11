"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [activeTab, setActiveTab] = useState("flights")
  const [destination, setDestination] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [travelers, setTravelers] = useState(1)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Navigate to appropriate page with search parameters
    navigate(`/${activeTab}?destination=${destination}&fromDate=${fromDate}&toDate=${toDate}&travelers=${travelers}`)
  }

  return (
    <div className="search-form">
      <div className="search-tabs">
        <div
          className={`search-tab ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
        >
          Flights
        </div>
        <div className={`search-tab ${activeTab === "hotels" ? "active" : ""}`} onClick={() => setActiveTab("hotels")}>
          Hotels
        </div>
        <div className={`search-tab ${activeTab === "cabs" ? "active" : ""}`} onClick={() => setActiveTab("cabs")}>
          Cabs
        </div>
        <div
          className={`search-tab ${activeTab === "restaurants" ? "active" : ""}`}
          onClick={() => setActiveTab("restaurants")}
        >
          Restaurants
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="search-content">
          <div className="search-input">
            <label className="form-label">Destination</label>
            <input
              type="text"
              className="form-control"
              placeholder={`Enter ${activeTab === "flights" ? "destination city" : activeTab === "hotels" ? "hotel location" : activeTab === "cabs" ? "pickup location" : "restaurant location"}`}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="search-input">
            <label className="form-label">Check-in / Departure</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>

          <div className="search-input">
            <label className="form-label">Check-out / Return</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>

          <div className="search-input">
            <label className="form-label">Travelers / Guests</label>
            <input
              type="number"
              className="form-control"
              min="1"
              max="10"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              required
            />
          </div>

          <div className="search-btn">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar