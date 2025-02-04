const express =require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./Modals/listing.js");
const methodOverride = require('method-override');
const path = require("path");
const wrapAsync =require("./utils/wrapAsync.js")
const ExpressError =require("./utils/ExpressError.js");
const { wrap } = require("module");
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");



const Mongoose_Url ='mongodb://127.0.0.1:27017/wanderlust';
async function main(){
     await mongoose.connect(Mongoose_Url);   
}
main().then((res)=>{
console.log(`connected to db `);
}).catch((err)=>{
    console.log(`server error ${err}`);
})
 // ...........................Server is listening..........................

app.listen(8080,(req,res)=>{
    console.log("server is started");
});

// ...............................Index Route ....................................

app.get("/show", wrapAsync(async (req,res)=>{
     let datas = await Listing.find()
     res.render("show.ejs",{datas});
})
)

// ..................................new route ....................................

app.get("/show/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/show", wrapAsync (async (req,res,next)=>{
    
    let{title,description,image,price,country,location} =req.body;
    console.log(req.body)
    if(!req.body){
     throw new ExpressError(400,"send valid data for listing")
    }
    let newListing =new Listing({
        title:title,
        description:description,
        image,url:image,
        price:price,
        location:location,
        country:country
    });
    
     await newListing.save()
    res.redirect("/show")

})
);


// ............................... Detail route ..........................

app.get("/show/:id/view", wrapAsync (async (req, res) => {
            let { id } = req.params;
        let detail = await Listing.findById(id);
        res.render("detail.ejs",{detail});
}) 
);
// ..................................Edit route ............................
// ...existing code...
app.get("/show/:id/edit", wrapAsync(async(req,res)=>{
           let { id } = req.params;
           let data = await Listing.findById(id);
            res.render("edit.ejs",{data});
})
);
// ...existing code...

app.put("/show/:id",wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { title, description, image, price, country, location } = req.body;
    // console.log(req.body);
    let updateDetail = await Listing.findByIdAndUpdate(
        id,
        { title, description, image: { url: image }, price, country, location },
        { runValidators: true, new: true }
    );
    // console.log(req.body);
    res.redirect(`/show/${id}/view`);
})
);

// ................. Delete route ...............................
app.delete("/show/:id", wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deleteDetail = await Listing.findByIdAndDelete(id);
    res.redirect("/show");
})
);
const HandleValidationErr =(err)=>{
    console.log("This was a validation error . please follow rules");
    err.message = "there is validation rule .please follow the rule";
    return err;
  }
  const HandleCastError =(err)=>{
    console.log("This was a cast error ")
    err.message = "There was a cast error.please follow the rule";
    return err;
  }
  app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name === "ValidationError") {
      err =HandleValidationErr(err);
    }
    if(err.name ==="CastError"){
        err=HandleCastError(err);
    }
    next(err);
  })
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})
app.use((err,req,res,next)=>{
    let {statusCode=500 ,message="something went wrong"} =err;
     res.render("error.ejs",{err});
})