import mongoose from "mongoose"

const GroupSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// module.exports = mongoose.model("Groups", GroupSchema)
export default mongoose.model("Groups", GroupSchema)