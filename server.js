require('dotenv').config();
const express=require('express');
const path=require('path');
const userRoute=require("./routes/user");
const blogRoute=require("./routes/blog");
const tubeRoute=require("./routes/tube");
const mongoose=require("mongoose");
const Blog=require("./models/blog");
const Tube=require("./models/tube");
const cookieParser=require('cookie-parser');
const { checkForAuthenticatioCookie } = require('./middlewares/auth');
const fileupload=require('express-fileupload');

const app=express();
const port=process.env.PORT;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticatioCookie("token"));
app.use(express.static(path.resolve("./public")));

mongoose.connect(process.env.MONGO_URL)
.then((e)=>{console.log("mongo connected")});

app.use(fileupload({
    useTempFiles:true
}))

app.get("/",async (req,res)=>{
    const allBlogs=await Blog.find({});
    const allVideos=await Tube.find({});
    res.render("home",{user:req.user,blogs:allBlogs,videos:allVideos});
});
app.get("/blog",async (req,res)=>{
    const allBlogs=await Blog.find({});
    res.render("blog_home",{user:req.user,blogs:allBlogs});
});
app.get("/tube",async (req,res)=>{
    const allVideos=await Tube.find({});
    res.render("tube_home",{user:req.user,videos:allVideos});
});


app.use("/user",userRoute);
app.use("/blog",blogRoute);
app.use("/tube",tubeRoute);
app.listen(port,()=>{console.log(`Server st1arted at:${port}`)});