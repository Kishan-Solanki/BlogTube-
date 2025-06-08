const Tube = require("../models/tube");
const Comment = require("../models/tube_comments");
const cloudinary=require('cloudinary').v2;
function handeladdnew(req, res) {
    return res.render("addvideo", { user: req.user });
};
async function addnewvideo(req, res) {
    try {
        const { title, description } = req.body;


        if (!req.files || !req.files.video || !req.files.thumbnailImage) {
            return res.status(400).send("Video and thumbnail image are required!");
        }
        const file1=req.files.thumbnailImage;
    let url1='';
    try {
        const result = await cloudinary.uploader.upload(file1.tempFilePath);
        url1 = result.url;
    } catch (err) {
        console.error("Cloudinary Upload Error:", err);
    }
    const file2=req.files.video;
    let url2='';
    try {
        const result = await cloudinary.uploader.upload(file2.tempFilePath, {
            resource_type: 'video'
          });;
        url2 = result.url;
    } catch (err) {
        console.error("Cloudinary Upload Error:", err);
    }

        if(url2===''){res.send("upload video under 10mb")}
        const tube = await Tube.create({
            title,
            description,
            videoURL: url2,
            thumbnailURL: url1,
            createdBy: req.user._id
        });

        return res.redirect(`/tube/${tube._id}`);
    } catch (error) {
        console.error("Error adding video:", error);
        res.status(500).send("Internal Server Error");
    }
};
async function getvideo(req,res){
    const video= await Tube.findById(req.params.id).populate("createdBy");
    const comments=await Comment.find({videoId:req.params.id}).populate("createdBy");
    return res.render("video",{
        user:req.user,
        video,
        comments,
    });
};
async function handelnewcomment(req,res){
    const comment=await Comment.create({
        content:req.body.content,
        videoId:req.params.videoId,
        createdBy:req.user._id,
    });
    return res.redirect(`/tube/${req.params.videoId}`)
};
module.exports = {
    handeladdnew,
    addnewvideo,
    getvideo,
    handelnewcomment,
};
