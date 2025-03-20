const { Schema, model } = require("mongoose");
const tubeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    videoURL: {
        type: String,
        required: true,
    },
    thumbnailURL: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });

const Tube = model("tube", tubeSchema);

module.exports = Tube;