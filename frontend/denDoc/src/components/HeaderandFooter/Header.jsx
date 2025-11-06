import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../utils/user.context.js";
import axios from "axios";

function Header() {

  const { user, loggedIn, setUser, setLoggedIn, authToken, setAuthToken, setRefeshToken } = useContext(userContext)
  async function logoutUser() {
    await axios.post("http://localhost:3000/api/v1/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
    setUser({})
    setAuthToken(null)
    setRefeshToken(null)
    setLoggedIn(false)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-purple-700/70 backdrop-blur-md border-b border-purple-500/30 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/denDocsNoBg.png"
            alt="DenDocs Logo"
            className="h-12 w-auto"
          />
          <span className="text-white font-semibold text-xl tracking-wide">
            DenDocs
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className="text-white/90 hover:text-white font-medium transition duration-300"
          >
            Blogs
          </Link>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {/* When Logged Out */}
            <div className={`${loggedIn ? "hidden" : "flex"} items-center gap-4`}>
              <Link
                to="/login"
                className="text-white/90 hover:text-white font-medium transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-purple-700 px-4 py-2 rounded-md font-medium hover:bg-purple-100 shadow-sm transition duration-300"
              >
                Signup
              </Link>
            </div>

            {/* When Logged In */}
            <div className={`${loggedIn ? "flex" : "hidden"} items-center gap-4`}>
              <Link
                to="/user"
                className="flex items-center gap-2 text-white/90 hover:text-white transition duration-300"
              >
                <img
                  src={`http://localhost:3000/uploads/${user?.avatarUrl}`}
                  alt="Profile"
                  className="h-8 w-8 rounded-full border border-purple-300/50"
                />
                <p className="font-medium">{user?.username}</p>
              </Link>

              <button
                onClick={() => logoutUser()}
                className="text-white/90 hover:text-red-400 font-medium transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;