const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const { wrap } = require("module");
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")
const user = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./Modals/user.js");

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



const Mongoose_Url = 'mongodb://127.0.0.1:27017/wanderlust';
async function main() {
    await mongoose.connect(Mongoose_Url);
}
main().then((res) => {
    console.log(`connected to db `);
}).catch((err) => {
    console.log(`server error ${err}`);
})
// ...........................Server is listening..........................

app.listen(8080, (req, res) => {
    console.log("server is started");
});




const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success") || [];
    res.locals.error = req.flash("error") || [];
    // console.log("Middleware - Flash message:", res.locals.success); // ✅ Debugging
    next();
});



app.use("/show",listings);
app.use("/show/:id/reviews",reviews);
app.use("/",user);




const HandleValidationErr = (err) => {
    console.log("This was a validation error . please follow rules");
    err.message = "there is validation rule .please follow the rule";
    return err;
}
const HandleCastError = (err) => {
    console.log("This was a cast error ")
    err.message = "There was a cast error.please follow the rule";
    return err;
}
const HandletypeError = (err) => {
    console.log("This was a type error");
    err.message = "Please enter valid data";
    return err;
}
app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") {
        err = HandleValidationErr(err);
    }
    else if (err.name === "CastError") {
        err = HandleCastError(err);
    }
    else if (err.name === "TypeError") {
        err = HandletypeError(err);
    }
    next(err);
})
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.render("error.ejs", { err });
})