import { FaXTwitter, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6"
import logo from "../assets/logo.png"
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center mb-4 hover:text-primary">
            <img src={logo} alt="EcoTrack Logo" className="w-10 h-10" />
            <span className="font-Playfair text-3xl font-bold text-primary">
              EcoTrack
            </span>
          </Link>
          <p className="font-semibold text-black">
            Track your eco-friendly habits and challenges. Make sustainability
            part of your lifestyle.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="footer-title font-semibold text-xl">Explore</h3>
          <ul className="space-y-2 mt-2">
            <li>
              <Link to="/" className="text-black font-semibold hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/challenges"
                className="text-black font-semibold hover:text-primary"
              >
                Challenges
              </Link>
            </li>
            <li>
              <Link
                to="/my-activities"
                className="text-black font-semibold hover:text-primary"
              >
                My Activities
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-black font-semibold hover:text-primary">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-title font-semibold text-xl">Contact</h3>
          <ul className="space-y-2 mt-2">
            <li>
              <Link to="/contact" className="text-black font-semibold hover:text-primary">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-black font-semibold hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/support" className="text-black font-semibold hover:text-primary">
                Support
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-black font-semibold hover:text-primary">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="footer-title font-semibold text-xl">Connect</h3>
          <div className="flex gap-4 mt-4 text-xl text-black font-semibold">
            <Link to="/social/twitter" className="hover:text-primary">
              <FaXTwitter />
            </Link>
            <Link to="/social/github" className="hover:text-primary">
              <FaGithub />
            </Link>
            <Link to="/social/linkedin" className="hover:text-primary">
              <FaLinkedin />
            </Link>
            <Link to="/social/email" className="hover:text-primary">
              <FaEnvelope />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-base-300 text-center py-4 text-sm">
        © {new Date().getFullYear()} EcoTrack. All rights reserved.
      </div>
    </footer>
  )
}
