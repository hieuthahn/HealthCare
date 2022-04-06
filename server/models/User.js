const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
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
        enum: {
            M: "Nam",
            F: "Nữ",
            O: "Khác",
        },
    },
    roleId: {
        type: String,
        enum: ["R1", "R2", "R3"],
    },
    phoneNumber: {
        type: Number,
    },
    positionId: {
        type: String,
        enum: {
            P0: "Bác sĩ",
            P1: "Thạc sĩ",
            P2: "Tiến sĩ",
            P3: "Phó giáo sư",
            P4: "Giáo sư",
        },
    },
    image: {
        type: Buffer,
        contentType: String,
    },
})

module.exports = mongoose.model("users", UserSchema)
