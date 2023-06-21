const mongoose = require("mongoose")

const PlayerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: false,
    },
    score: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        default: 'email@email.com'
    },
    group_id: {
        type: String,
        required: false,
    },
})

module.exports = mongoose.model("Players", PlayerSchema)
