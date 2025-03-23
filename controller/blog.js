const Blog=require("../models/blog");
const Comment=require("../models/blog_comments")
const cloudinary=require('cloudinary').v2;
function handeladdnew(req, res) {
    return res.render("addblog", { user: req.user });
};

cloudinary.config({ 
  cloud_name: 'divwkpavu', 
  api_key: '349733689364518', 
  api_secret: '-GJNMZrzpc2OLG5Au3Nyy1haAJA' 
});
async function handelcreatenewblog(req,res){
    const {title,body}=req.body;
    const file=req.files.coverImage;
    let url1='';
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        url1 = result.url;
    } catch (err) {
        console.error("Cloudinary Upload Error:", err);
    }
    
    const blog=await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImageURL:url1,
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