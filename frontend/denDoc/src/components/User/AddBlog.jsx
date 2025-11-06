import React, { useState } from "react";
import axios from "axios";
import { userContext } from "../../utils/user.context";
import { useContext } from "react";

function AddBlog() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [file, setFile] = useState(null);
    // Added state for the response message
    const [resMsg, setResMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const { authToken } = useContext(userContext)

    async function submitBlog(e) {
        e.preventDefault();
        setLoading(true);
        setResMsg(""); // Clear previous message

        try {
            // Create a FormData object for file + text data
            const formData = new FormData();
            formData.append("title", title);
            formData.append("body", body);
            if (file) formData.append("file", file);

            const res = await axios.post(
                "http://localhost:3000/api/v1/post/",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "multipart/form-data"
                    },
                }
            );

            // Added a success message and cleared the form
            setResMsg(res.data.message || "Blog created successfully!");
            setTitle("");
            setBody("");
            setFile(null);
            // Clear the file input visually (though programmatically it's tricky)
            e.target.reset(); 
        } catch (error) {
            setResMsg(error.response?.data?.message || "Failed to create blog.");
        } finally {
            setLoading(false);
        }
    }

    return (
        // Switched to a soft slate background
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            {/* Constrained width for a more professional form look */}
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <h3 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
                    Create Blog 
                </h3>

                <form onSubmit={submitBlog} className="flex flex-col gap-6">
                    {/* Added labels for accessibility and structure */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            placeholder="Your blog title"
                            name="title"
                            id="title"
                            required
                            // Refined input styling
                            className="w-full rounded-lg p-3 bg-slate-50 border border-slate-300 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>
                        <textarea
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            placeholder="Write your blog content here..."
                            name="body"
                            id="body"
                            rows="8" // Increased rows for better writing experience
                            required
                            // Matched styling with other inputs
                            className="w-full rounded-lg p-3 bg-slate-50 border border-slate-300 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y"
                        />
                    </div>

                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Image (Optional)
                        </label>
                        {/* Styled the file input for a cleaner look */}
                        <input
                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                            name="file"
                            id="file"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100 transition-colors duration-200 cursor-pointer"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading} // Disable button while loading
                        // Matched button style to the indigo theme
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {loading ? "Publishing..." : "Publish Blog"}
                    </button>

                    {/* Added a container to display the response message */}
                    {resMsg && (
                        <p className={`text-center text-sm font-medium ${resMsg.includes("success") ? "text-green-600" : "text-red-600"}`}>
                            {resMsg}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AddBlog;