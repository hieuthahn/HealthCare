const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MarkdownSchema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "doctors",
    },
    clinicId: {
        type: Schema.Types.ObjectId,
        ref: "clinics",
    },
    contentHTML: {
        type: String,
    },
    contentMarkdown: {
        type: String,
    },
    description: {
        type: String,
    },
})

module.exports = mongoose.model("markdowns", MarkdownSchema)
