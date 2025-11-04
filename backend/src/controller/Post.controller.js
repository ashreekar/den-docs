import { Post } from "../models/Post.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const postApost = asyncHandler(async (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        throw new APIError(400, "All fields must be filled");
    }

    const user = req.user;

    const post = await Post.create({
        title,
        body,
        author: user._id
    })

    res.status(201).json(new APIResponse(201, "Post created", post))
})

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({});

    res.status(200).json(new APIResponse(200,"Sucess",posts));

})

const getSinglePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req?.params?.id).populate("author");

    res.status(200).json(new APIResponse(200,"Sucess",post));

})

export { postApost,getAllPosts,getSinglePost };