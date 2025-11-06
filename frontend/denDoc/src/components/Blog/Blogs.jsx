import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { userContext } from "../../utils/user.context.js"; // ✅ import your user context
import { blogContext } from "../../utils/blog.context.js"; // ✅ your blog context (if you have one)

function Blogs() {
  const { authToken } = useContext(userContext);
  const { blogs, setBlogs } = useContext(blogContext);

  // Local loading & error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/post", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });

        setBlogs(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [authToken, setBlogs]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-700 font-semibold">
        Loading blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <h1 className="text-4xl font-bold text-purple-700 text-center mb-10">
        Latest Blogs 📝
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No blogs available yet.</p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-purple-50 border border-purple-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-purple-800 mb-2">
                  {blog.title}
                </h2>
                <img src={`http://localhost:3000/uploads/${blog.image}`} alt="" />
                <p className="text-gray-600 text-sm mb-3">
                  By{" "}
                  <span className="font-medium">
                    {blog.author?.username || "Unknown Author"}
                  </span>{" "}
                  ·{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  {blog.body?.slice(0, 100) + "..."}
                </p>
              </div>

              <Link
                to={`/${blog._id}`}
                className="mt-auto text-purple-700 font-medium hover:text-purple-500 transition"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;