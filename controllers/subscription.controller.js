import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json({ success: true, body: subscription});

    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.userId) {
            const error = new Error("You are not authorized to view this user's subscriptions");
            error.statusCode = 403;
            throw error;
        }
        const subscriptions = await Subscription.find({user: req.params.userId});
        if (!subscriptions) {
            const error = new Error("No subscriptions found for this user");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, body: subscriptions});
    } catch (error) {
        next(error);
    }
}