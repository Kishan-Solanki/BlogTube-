const Tube = require("../models/tube");
const Comment = require("../models/tube_comments");

function handeladdnew(req, res) {
    return res.render("addvideo", { user: req.user });
};

async function addnewvideo(req, res) {
    try {
        const { title, description } = req.body;

        if (!req.files || !req.files.video || !req.files.thumbnailImage) {
            return res.status(400).send("Video and thumbnail image are required!");
        }

        const videoFile = req.files.video[0];  
        const thumbnailFile = req.files.thumbnailImage[0];  

        const tube = await Tube.create({
            title,
            description,
            videoURL: `/videos/${videoFile.filename}`,
            thumbnailURL: `/thumbnails/${thumbnailFile.filename}`,
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
