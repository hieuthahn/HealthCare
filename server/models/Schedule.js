const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
    currentNumber: {
        type: Number,
        required: true,
    },
    maxNumber: {
        type: Number,
    },
    date: {
        type: Date,
    },
    timeType: {
        type: String,
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "doctors",
    },
})

module.exports = mongoose.model("schedules", ScheduleSchema)
