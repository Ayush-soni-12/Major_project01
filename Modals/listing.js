const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
image: {
    filename: {
      type: String,
      default: 'default_filename'
    },
    url: {
      type: String,
      default: 'https://plus.unsplash.com/premium_photo-1678963247798-0944cf6ba34d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D'
    }
  },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
             ref:"Review",
        }
    ]
});
listingSchema.post("findOneAndDelete", async (listing)=>{
   if(listing){
     await Review.deleteMany({_id:{$in :listing.reviews}})
   }

})

const Listing = mongoose.model("Listing",listingSchema);
module.exports =Listing;