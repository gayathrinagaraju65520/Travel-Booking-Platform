import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GlobalGo</h3>
            <p>Making travel simple and affordable for everyone. Book your flights, hotels, and cabs with ease.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/flights">Flights</Link>
              </li>
              <li>
                <Link to="/hotels">Hotels</Link>
              </li>
              <li>
                <Link to="/cabs">Cabs</Link>
              </li>
              <li>
                <Link to="/restaurants">Restaurants</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li>
                <Link to="/help">FAQ</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="fa-5x">
                <FaFacebook size={25}/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={25}/>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={25}/>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GlobalGo. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer