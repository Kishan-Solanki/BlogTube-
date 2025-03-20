const Blog=require("../models/blog");
const Comment=require("../models/blog_comments")

function handeladdnew(req, res) {
    return res.render("addblog", { user: req.user });
};
async function handelcreatenewblog(req,res){
    const {title,body}=req.body;
    const blog=await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
};
async function getblog(req,res){
    const blog= await Blog.findById(req.params.id).populate("createdBy");
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy");
    return res.render("blog",{
        user:req.user,
        blog,
        comments,
    });
};
async function handelnewcomment(req,res){
    const comment=await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`)
};

module.exports = {
    handeladdnew,
    handelcreatenewblog,
    getblog,
    handelnewcomment,
};