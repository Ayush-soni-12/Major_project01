const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../Modals/review.js");
const Listing = require("../Modals/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js")



const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// ................. Reviews ..............................

router.post("/", validateReview, wrapAsync(async (req, res) => {
    let{ id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review added"); 
    res.redirect(`/show/${id}/view`);
}));

// ..............................delete review route ...............................

router.delete("/:reviewId", wrapAsync(async(req,res)=>{
     let {id ,reviewId} =req.params;
      await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
      await Review.findByIdAndDelete(reviewId);
      req.flash("success", "Review deleted"); 
      res.redirect(`/show/${id}/view`);
}));

module.exports = router;
