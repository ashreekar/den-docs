import React, { useEffect, useState } from "react";
import Header from "./components/HeaderandFooter/Header";
import Footer from "./components/HeaderandFooter/Footer";
import { Outlet } from "react-router-dom";
import { userContext } from "./utils/user.context.js";
import { blogContext } from "./utils/blog.context.js";

function App() {
  // 🧠 Initialize from localStorage if present
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem("authToken") || "";
  });

  const [refreshToken, setRefeshToken] = useState(() => {
    return localStorage.getItem("refreshToken") || "";
  });

  const [blogs, setBlogs] = useState([]);

  // 🔄 Sync user and auth state to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    if (authToken) localStorage.setItem("authToken", authToken);
    else localStorage.removeItem("authToken");
  }, [authToken]);

  useEffect(() => {
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    else localStorage.removeItem("refreshToken");
  }, [refreshToken]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        authToken,
        setAuthToken,
        refreshToken,
        setRefeshToken,
      }}
    >
      <blogContext.Provider value={{ blogs, setBlogs }}>
        <Header />
        <div className="pt-16 min-h-[calc(100vh-64px)]">
          <Outlet />
        </div>
        <Footer />
      </blogContext.Provider>
    </userContext.Provider>
  );
}

export default App;