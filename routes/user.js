const express = require("express");
const router = express.Router({});
const User = require("../Modals/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})

router.post("/signup", wrapAsync(async (req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({
            email,username
        });
        const registerUser = await User.register(newUser,password);
        console.log(registerUser);
        req.flash("success", "User registered successfully");
        res.redirect("/show");
    }
    catch(e){
        console.log(e);
        req.flash("error",e.message);
        res.redirect("/signup");
    }

}));
router.get("/login",(req,res)=>{
    res.render("login.ejs")
})
router.post("/login",passport.authenticate("local", {failureRedirect :"/login", failureFlash:true}),async(req,res)=>{

    req.flash("success", " Welcome to wanderlust ! You are logged in ");
        res.redirect("/show");
})
module.exports = router;