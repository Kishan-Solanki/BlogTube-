const User = require('../models/user');
const nodemailer=require('nodemailer');
function signin(req, res) {
    return res.render('signin');
};
function signup(req, res) {
    return res.render('signup');
};


async function handelsignup(req, res) {

    try {
        const { fullName, email, password } = req.body;

        const newUser = await User.create({ fullName,
             email,
             password ,
            profileImageURL:`/images/${req.file.filename}`});

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
