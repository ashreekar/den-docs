import { User } from "../models/User.model.js";
import { asyncHandler } from '../utils/asyncHandler.js'
import { APIError } from '../utils/APIError.js'
import { APIResponse } from '../utils/APIResponse.js'

const generateAcceasTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const acceasToken = await user.generateAcceasToken();
        const refreshTocken = await user.generateRefreshToken();

        user.refreshtocken = refreshTocken;
        await user.save({ validateBeforeSave: false });
        return { acceasToken, refreshTocken };
    } catch (error) {
        throw new APIError(500, "Somethingwent wrong while generating refresh and acces token")
    }
}

const createUser = asyncHandler(async (req, res) => {
    // console.log(req)
    const { name, username, email, password } = req.body;
    const filePath=req.file.filename;

    if ([name, username, email, password].some(item => item?.trim() === "")) {
        throw new APIError(400, "All fields are reuired");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new APIError(409, "User with email or username already exists");
    }

    const user = await User.create({
        name,
        username: username.toLowerCase(),
        email,
        password,
        avatarUrl:filePath
    })

    const createdUser = {
        name: user.name,
        username: user.username,
        email: user.email
    }
    return res.status(201).json(new APIResponse(201, "User created", createdUser));
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        throw new APIError(400, "username is required");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new APIError(404, "User not found");
    }

    const isValidPassword = await user.isPasswordCorrect(password);

    if (!isValidPassword) {
        throw new APIError(401, "Invalid password");
    }
    const options = {
        httpOnly: true,
        secure: true
    }
    const { acceasToken, refreshTocken } = await generateAcceasTokenAndRefreshToken(user._id);

    return res.status(200)
        .cookie("acceastoken", acceasToken, options)
        .cookie("refreshtoken", refreshTocken, options)
        .json(new APIResponse(200, {
            acceasToken,
            refreshTocken,
            user
        }, "Logged in sucessfully"));
})

const logoutUser = asyncHandler(async (req, res) => {
    console.log("Data coming")
    const user = req.user;

    if (!user) {
        throw new APIError(404, "User not found");
    }
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("acceastoken", options).clearCookie("refreshtoken", options).json(new APIResponse(200, {}, "User logged out"))
})

export { createUser, loginUser, logoutUser };