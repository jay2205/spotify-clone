import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;
        //check if user exists
        const user = await User.findOne({ clerkId: id });
        if (!user) {
            // signup
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
        }
        res.status(200).json({ success: true })
    } catch (e) {
        console.log("Error in auth callback ", e)
        next(e);
    }
}