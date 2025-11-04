import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { User } from "../models/User.model.js";
import jwt from 'jsonwebtoken';

export const verifyUser = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.acceastoken || req.headers["authorization"]?.replace("Bearer ", "");

        if (!token) {
            throw new APIError(401, "Unauthorised Request");
        }

        const userInfo = await jwt.verify(token, process.env.ACCESS_TOCKEN_SECRET);

          if (!userInfo) {
            throw new APIError(401, "Unauthorised request");
        }

        const user = await User.findById(userInfo?._id).select("-password -refreshtocken");

        if (!user) {
            throw new APIError(401, "Unauthorised request");
        }

        req.user = user;

        next();
    } catch (error) {
           throw new APIError(401, error?.message || "Invalid acces token")
    }
})