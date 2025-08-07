import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if (!req.auth.userId) {
        return res.status(401).json({ message: "Unatuherized. Please login to continue" });
    }
    next();
}

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if (!isAdmin) {
            return res.status(403).json({ message: "Forbiden error. You must be admin." })
        }
        next();
    } catch (error) {
        console.error("Error while processing require admin check")
        next(`Internal server error. Error: ${error}`)
    }
}