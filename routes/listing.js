const express = require("express");
const router = express.Router();
const Listing = require("../Modals/listing.js");
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { reviewSchema } = require("../schema.js")


const validatelisting = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
// ...............................Index Route ....................................

router.get("/", wrapAsync(async (req, res) => {
    let datas = await Listing.find()
    res.render("show.ejs", { datas });
})
)

// ..................................new route ....................................

router.get("/new", (req, res) => {
    res.render("new.ejs");
})

router.post("/",  validatelisting, wrapAsync(async (req, res, next) => {

    let { title, description, image, price, country, location } = req.body;
    // let result = listingSchema.validate(req.body);
    // if (result.error) {
    //     throw new ExpressError(400, result.error);
    // }
    console.log("hello");
    let newListing = new Listing({
        title: title,
        description: description,
        image, url: image,
        price: price,
        location: location,
        country: country
    });
   
    await newListing.save();
    // console.log("Before setting flash:", req.session.flash); // Debugging
    req.flash("success", "New listing added"); // Setting flash message
    // console.log("After setting flash:", req.session.flash); 
    res.redirect("/show");
})
);


// ............................... Detail route ..........................

router.get("/:id/view", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let detail = await Listing.findById(id).populate("reviews");
   if(!detail){
    req.flash("error", "Listing does not exist");
    res.redirect("/show");
   }
    res.render("detail.ejs", { detail });
})
);
// ..................................Edit route ............................
// ...existing code...
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    if(!data){
        req.flash("error", "Listing does not exist");
        res.redirect("/show");
       }
    res.render("edit.ejs", { data });
})
);
// ...existing code...

router.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { title, description, image, price, country, location } = req.body;
    // console.log(req.body);
    let updateDetail = await Listing.findByIdAndUpdate(
        id,
        { title, description, image: { url: image }, price, country, location },
        { runValidators: true, new: true }
    );
    // console.log(req.body);
    req.flash("success", "listing updated"); 
    res.redirect(`/show/${id}/view`);
})
);

// ................. Delete route ...............................
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteDetail = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted"); 
    res.redirect("/show");
})
);
   
module.exports = router;