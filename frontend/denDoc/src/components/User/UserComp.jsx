import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { userContext } from '../../utils/user.context';
import { blogContext } from '../../utils/blog.context';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserComp() {
    const { authToken } = useContext(userContext);
    const { blogs, setBlogs } = useContext(blogContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/post/user", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    withCredentials: true,
                });
                setBlogs(res.data.data || []);
            } catch (err) {
                console.log(err)
                setError(err.response?.data?.message || "Failed to load blogs.");
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [authToken, setBlogs]);

    if (loading) {
        return (
            // Applied a cleaner loading state
            <div className="min-h-screen bg-slate-50 flex items-center justify-center text-lg font-medium text-indigo-600">
                Loading blogs...
            </div>
        );
    }

    if (error) {
        return (
            // Applied a cleaner error state
            <div className="min-h-screen bg-slate-50 flex items-center justify-center text-lg font-medium text-red-600">
                {error}
            </div>
        );
    }

    return (
        // Switched to a light slate background for a softer, classier feel
        <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
                My Blogs
            </h1>

            {blogs.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No blogs available yet.</p>
            ) : (
                // Kept the responsive grid, max-width is good
                <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            // Refined card styling: bg-white, subtle border, larger shadow on hover, smoother transition
                            className="bg-white border border-slate-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-4">
                                    By{" "}
                                    {/* Highlighted the author */}
                                    <span className="font-medium text-indigo-600">
                                        {blog.author?.username || "Unknown Author"}
                                    </span>{" "}
                                    ·{" "}
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600 mb-6">
                                    {blog.body?.slice(0, 100) + "..."}
                                </p>
                            </div>

                            <Link
                                to={`/${blog._id}`}
                                // Styled the "Read More" link to be more prominent and match the new accent color
                                className="mt-auto text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
                            >
                                Read More →
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {/* Restyled the "Add" button to be a dashed, inviting panel */}
            <div className="max-w-3xl mx-auto mt-12">
                <Link 
                    to={'/add'}
                    className="block p-10 bg-white border-dashed border-2 border-gray-300 rounded-2xl shadow-sm hover:shadow-lg hover:border-indigo-400 transition-all duration-300 ease-in-out text-center cursor-pointer group"
                >
                    <h1 className="text-4xl font-bold text-indigo-500 mb-2 group-hover:text-indigo-600 transition-colors">
                        +
                    </h1>
                    <h1 className="text-xl font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                        Add a New Blog
                    </h1>
                </Link>
            </div>
        </div>
    )
}

export default UserComp