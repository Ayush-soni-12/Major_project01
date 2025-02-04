const mongoose =require("mongoose");
const listingSchema = new mongoose.Schema({
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
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports =Listing;