import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

export const Post = mongoose.model("Post", postSchema);