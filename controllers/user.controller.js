import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {

        const users = await User.find();

        if (!users) {
            const error = new Error("No users found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        })
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id).select("-hashedPassword"); // get all user info except pw info

        if (!user) {
            const error = new Error("No such user found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        next(error);
    }
}
