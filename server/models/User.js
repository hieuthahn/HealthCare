const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["M", "F", "O"],
    },
    roleId: {
        type: String,
        enum: ["R1", "R2", "R3"],
    },
    phoneNumber: {
        type: String,
    },
    positionId: {
        type: String,
        enum: ["P0", "P1", "P2", "P3", "P4"],
    },
    image: {
        type: Buffer,
        contentType: String,
    },
    createAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model("users", UserSchema)
