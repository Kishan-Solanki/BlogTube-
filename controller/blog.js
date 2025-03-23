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
async function handelcreatenewblog(req, res) {
    try {
        const { title, body } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: User not found." });
        }

        if (!req.files || !req.files.coverImage) {
            return res.status(400).json({ message: "Cover image is required." });
        }

        const file = req.files.coverImage;
        let url1 = '';

        try {
            const result = await cloudinary.uploader.upload(file.tempFilePath);
            url1 = result.url;
        } catch (err) {
            console.error("Cloudinary Upload Error:", err);
            return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
        }

        const blog = await Blog.create({
            title,
            body,
            createdBy: req.user._id,
            coverImageURL: url1,
        });

        return res.redirect(`/blog/${blog._id}`);

    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
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