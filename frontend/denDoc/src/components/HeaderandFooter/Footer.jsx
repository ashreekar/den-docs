import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-purple-50 text-gray-700 border-t border-purple-100 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        
        {/* Left - Logo & Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/denDocsNoBg.png"
            alt="DenDocs Logo"
            className="h-10 w-auto"
          />
          <span className="text-lg font-semibold text-purple-700">
            DenDocs
          </span>
        </div>

        {/* Middle - Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link
            to="/"
            className="hover:text-purple-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className="hover:text-purple-600 transition-colors font-medium"
          >
            Blogs
          </Link>
          <Link
            to="/about"
            className="hover:text-purple-600 transition-colors font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-purple-600 transition-colors font-medium"
          >
            Contact
          </Link>
        </nav>

        {/* Right - Social Media */}
        <div className="flex gap-5">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition-transform transform hover:-translate-y-1"
          >
            <i className="fa-brands fa-github text-xl"></i>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition-transform transform hover:-translate-y-1"
          >
            <i className="fa-brands fa-twitter text-xl"></i>
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition-transform transform hover:-translate-y-1"
          >
            <i className="fa-brands fa-linkedin text-xl"></i>
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-purple-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-purple-700 font-medium">DenDocs</span>. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
