import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resMsg, setResMsg] = useState("");
  const [file, setFile] = useState(null);

  const navigator=useNavigate()

  async function SignupUser(e) {
    e.preventDefault();

    try {
      // Create a FormData object for file + text data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (file) formData.append("file", file);

      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResMsg(res.data.message || "Account created successfully!");
      navigator('/')
    } catch (error) {
      setResMsg(error.response?.data?.message || "Failed to create account.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
      <div className="w-[90%] sm:w-[400px] bg-white border border-purple-200 rounded-2xl shadow-2xl p-8">
        <h3 className="text-3xl font-semibold text-center mb-6 text-purple-700">
          Create Account ✨
        </h3>

        <form onSubmit={SignupUser} className="flex flex-col gap-6">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            name="name"
            className="rounded-lg p-3 bg-purple-50 border border-purple-300 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
          />

          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
            name="username"
            className="rounded-lg p-3 bg-purple-50 border border-purple-300 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            name="email"
            className="rounded-lg p-3 bg-purple-50 border border-purple-300 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            className="rounded-lg p-3 bg-purple-50 border border-purple-300 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
          />

          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name="file"
            className="rounded-lg p-3 bg-purple-50 border border-purple-300 text-gray-800 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
          />

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            Sign Up 🚀
          </button>
        </form>

        {resMsg && (
          <p className="text-center mt-6 text-sm text-purple-700">{resMsg}</p>
        )}

        <div className="text-center mt-8 text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-700 font-medium hover:text-purple-500 transition-colors"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;