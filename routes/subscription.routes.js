import Router from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send({title: "GET all subscriptions"});
});

subscriptionRouter.get("/:id", (req, res) => {
    res.send({title: "GET subscription details"});
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
    res.send({title: "Update subscription details"});
})

subscriptionRouter.delete("/:id", (req, res) => {
    res.send({title: "Delete subscription"});
})

subscriptionRouter.get("/user/:userId", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send({title: "Cancel subscription"});
})

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({title: "Get upcoming renewals"});
})


export default subscriptionRouter;