const mongoose = require("mongoose")

const PlayerSchema = mongoose.Schema({
    username: {
        type: Number,
        required: true,
    },
    level: {
        type: Number,
        required: false,
    },
    all_time_score: {
        type: Number,
        required: false,
    },
    email: {
        type: Number,
        required: true,
    },
    group_id: {
        type: Number,
        required: false,
    },
})

module.exports = mongoose.model("Players", PlayerSchema)
