const { Schema, model } = require("mongoose");

const blogcommentSchema=new Schema({
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type: Schema.Types.ObjectId,
        ref: "blog",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
},{timestamps:true});

const BlogComment = model("blogcomments", blogcommentSchema);

module.exports = BlogComment;