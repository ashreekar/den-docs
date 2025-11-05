import React, { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../../utils/user.context.js";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [resMsg, setResMsg] = useState("");

    const { setUser, setLoggedIn, setAuthToken, setRefeshToken } = useContext(userContext)
const navigate = useNavigate();
    async function LoginUser(e) {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/user/login",
                { username, password },
                { withCredentials: true }
            );
            console.log(res.data)
            setResMsg(res.data.message || "Login successful!");
            setUser(res.data.message.user)
            setLoggedIn(true)
            setRefeshToken(res.data.message.refreshTocken)
            setAuthToken(res.data.message.acceasToken)
            navigate('/')
        } catch (error) {
            setResMsg(error.response?.data?.message || "Login failed.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
            <div className="w-[90%] sm:w-[380px] bg-purple-50 border border-purple-200 rounded-2xl shadow-lg p-8">
                <h3 className="text-3xl font-semibold text-center mb-6 text-purple-700">
                    Welcome Back 👋
                </h3>

                <form onSubmit={LoginUser} className="flex flex-col gap-6">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        placeholder="Username"
                        name="username"
                        className="rounded-lg p-3 bg-white border border-purple-300 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="rounded-lg p-3 bg-white border border-purple-300 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
                    />

                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                    >
                        Get In 🚀
                    </button>
                </form>

                {resMsg && (
                    <p className="text-center mt-6 text-sm text-purple-700">{""}</p>
                )}

                <div className="text-center mt-8 text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <a
                        href="/signup"
                        className="text-purple-700 font-medium hover:text-purple-500 transition-colors"
                    >
                        Create one
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;