const { Schema, model } = require("mongoose");

const tubecommentSchema=new Schema({
    content:{
        type:String,
        required:true,
    },
    videoId:{
        type: Schema.Types.ObjectId,
        ref: "tube",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
},{timestamps:true});

const TubeComment = model("tubecomments", tubecommentSchema);

module.exports = TubeComment;