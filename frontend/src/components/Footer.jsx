// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-gray-400 py-12 px-8 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        
        {/* Brand Info */}
        <div>
          <h3 className="text-pink-500 font-bold text-2xl">🎬 ZoneShow</h3>
          <p className="mt-3 text-sm leading-relaxed">
            Bringing movies closer to you. Discover, book, and experience the magic of cinema like never before.
          </p>

          {/* App Badges */}
          <div className="flex gap-3 mt-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10 cursor-pointer hover:scale-105 transition"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10 cursor-pointer hover:scale-105 transition"
            />
          </div>
        </div>

        {/* Company Links */}
        <div className="ml-10">
          <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-pink-500 transition">Home</a></li>
            <li><a href="/about" className="hover:text-pink-500 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-pink-500 transition">Contact Us</a></li>
            <li><a href="/privacy" className="hover:text-pink-500 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="ml-10">
          <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/profile" className="hover:text-pink-500 transition">My Bookings</a></li>
            <li><a href="/movies" className="hover:text-pink-500 transition">Movies</a></li>
            <li><a href="/trailers" className="hover:text-pink-500 transition">Trailers</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="ml-10">
          <h4 className="text-white text-lg font-semibold mb-4">Get in Touch</h4>
          <p className="text-sm mb-2"> 123 Movie St, Film City, USA</p>
          <p className="text-sm mb-2"> +1 (212) 456-7890</p>
          <p className="text-sm">contact@zoneshow.com</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-pink-500 transition">𝕏</a>
            <a href="#" className="hover:text-pink-500 transition">ⓕ</a>
            <a href="#" className="hover:text-pink-500 transition"></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        Copyright © 2025 ZoneShow. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;