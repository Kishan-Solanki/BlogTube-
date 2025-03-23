const User = require('../models/user');
const nodemailer=require('nodemailer');
const cloudinary=require('cloudinary').v2;
function signin(req, res) {
    return res.render('signin');
};
function signup(req, res) {
    return res.render('signup');
};
cloudinary.config({ 
    cloud_name: 'divwkpavu', 
    api_key: '349733689364518', 
    api_secret: '-GJNMZrzpc2OLG5Au3Nyy1haAJA' 
  });

async function handelsignup(req, res) {

    try {
        const { fullName, email, password } = req.body;
        const file=req.files.profileImage;
    let url1='';
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        url1 = result.url;
    } catch (err) {
        console.error("Cloudinary Upload Error:", err);
    }

        const newUser = await User.create({ fullName,
             email,
             password ,
            profileImageURL:url1});

        res.redirect("/");  
    } catch (error) {
        console.error("Error during signup:", error);

        if (error.code === 11000) {
            return res.status(400).send("Email already exists!");
        }

        res.status(500).send("Internal Server Error");
    }
};
async function handelsignin(req, res) {
    try {
        const { email, password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
       return res.render("signin",{error :"Incorrect email or password"});
    }
};
function handellogout(req,res){
    res.clearCookie("token").redirect("/");
};
module.exports={
    signin,
    signup,
    handelsignup,
    handelsignin,
    handellogout,
};
