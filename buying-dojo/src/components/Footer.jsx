import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const categories = ["IEMs", "Mobiles", "Laptops", "Audio", "Wearables"];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-title">Buying Dojo</h2>
          <p className="footer-text">
            Premium, unbiased tech recommendations without sponsorship noise.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Legal</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Refund Policy</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <p className="footer-text">hello@buyingdojo.com</p>
          <span className="stripe-badge">Powered by Stripe</span>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Buying Dojo. All rights reserved.
      </div>
    </footer>
  );
}
