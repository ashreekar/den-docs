import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../utils/user.context";

function BlogDetails() {
  const { id } = useParams();
  const { authToken } = useContext(userContext);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/post/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true,
          }
        );

        // The backend returns new APIResponse(200, "Success", post)
        setBlog(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load the blog.");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [id, authToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-700 font-semibold">
        Loading blog...
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

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="text-purple-600 hover:text-purple-500 transition font-medium"
        >
          ← Back to Blogs
        </Link>

        <h1 className="text-4xl font-bold text-purple-800 mt-6 mb-3">
          {blog.title}
        </h1>
        <img src={`http://localhost:3000/uploads/${blog.image}`} alt="" />
        <p className="text-gray-600 mb-8">
          By{" "}
          <span className="font-medium">
            {blog.author?.username || "Unknown Author"}
          </span>
        </p>

        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.body}
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;