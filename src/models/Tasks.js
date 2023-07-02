import mongoose from "mongoose"
// const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            require: false,
        },
        description: {
            type: String,
            required: false,
        },
        points: {
            type: String,
            required: false,
        },
    },
    {
        // options that apply to all records
        timestamps: true,
        versionKey: false,
    }
)

export default mongoose.model("Tasks", TaskSchema)