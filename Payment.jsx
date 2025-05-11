import { useLocation } from "react-router-dom"
import { useState } from "react"

const Payment = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const flightId = params.get("id")

  const [paymentMethod, setPaymentMethod] = useState("")

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.")
      return
    }
    alert(`Payment successful using ${paymentMethod}!`);
  }

  const containerStyle = {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  }

  const headingStyle = {
    marginBottom: "1rem",
    color: "#333",
  }

  const labelStyle = {
    display: "block",
    marginBottom: "10px",
    fontSize: "16px",
  }

  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  }

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "15px",
  }

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Payment</h1>
      <p>Booking ID: <strong>{flightId}</strong></p>

      <h3 style={{ marginTop: "20px", color: "#555" }}>Select Payment Method</h3>

      <div style={{ marginTop: "15px" }}>
        <label style={labelStyle}>
          <input
            type="radio"
            name="payment"
            value="Google Pay"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Google Pay
        </label>

        <label style={labelStyle}>
          <input
            type="radio"
            name="payment"
            value="PhonePe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          PhonePe
        </label>

        <label style={labelStyle}>
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          UPI (Enter ID)
        </label>

        {paymentMethod === "UPI" && (
          <input
            type="text"
            placeholder="Enter UPI ID"
            style={inputStyle}
          />
        )}

        <label style={labelStyle}>
          <input
            type="radio"
            name="payment"
            value="Credit Card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Credit/Debit Card
        </label>

        {paymentMethod === "Credit Card" && (
          <>
            <input type="text" placeholder="Card Number" style={inputStyle} />
            <input type="text" placeholder="Expiry Date (MM/YY)" style={inputStyle} />
            <input type="text" placeholder="CVV" style={inputStyle} />
          </>
        )}
      </div>

      <button style={buttonStyle} onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  )
}

export default Payment