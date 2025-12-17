import { useState } from "react"
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLeaf,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa"
import { Link } from "react-router"

const footerLinks = {
  quickLinks: [
    { name: "Home", path: "/" },
    { name: "Challenges", path: "/challenges" },
    { name: "Tips", path: "/tips" },
    { name: "Events", path: "/events" },
    { name: "Leaderboard", path: "/leaderboard" },
  ],
  categories: [
    { name: "Waste Reduction", path: "/challenges?category=Waste Reduction" },
    {
      name: "Water Conservation",
      path: "/challenges?category=Water Conservation",
    },
    { name: "Energy Saving", path: "/challenges?category=Energy Saving" },
    {
      name: "Sustainable Transport",
      path: "/challenges?category=Sustainable Transport",
    },
    {
      name: "Eco-Friendly Food",
      path: "/challenges?category=Eco-Friendly Food",
    },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ],
}

export default function EnhancedFooter() {
  const [email, setEmail] = useState("")

  const handleNewsletter = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    alert("Thanks for subscribing!")
    setEmail("")
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-screen-2xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-3xl text-eco-primary-light" />
              <span className="text-2xl font-bold text-white">EcoTrack</span>
            </div>
            <p className="text-gray-400 mb-6">
              Join thousands of eco-warriors making a real impact. Track your
              sustainable actions, participate in challenges, and help create a
              greener future.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-eco-primary flex items-center justify-center transition-colors"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-eco-primary flex items-center justify-center transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-eco-primary flex items-center justify-center transition-colors"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-eco-primary flex items-center justify-center transition-colors"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-eco-primary-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-eco-primary-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Get Eco Tips Weekly
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to our newsletter for the latest eco-friendly tips and
              challenges.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-primary text-white placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-eco-primary hover:bg-eco-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} EcoTrack. All rights reserved. Made
              with 💚 for the planet.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              {footerLinks.company.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-500 hover:text-eco-primary-light transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
