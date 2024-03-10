import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    }
)
export const Profile = mongoose.model('Profile', profileSchema);