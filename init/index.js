const mongoose =require("mongoose");
const initData = require("./data.js");
const Listing = require("../Modals/listing.js");
const Mongoose_Url ='mongodb://127.0.0.1:27017/wanderlust';
async function main(){
     await mongoose.connect(Mongoose_Url);   
}
main().then((res)=>{
console.log(`connected to db `);
}).catch((err)=>{
    console.log(`server error ${err}`);
});

const initDB =async()=>{
     await Listing.deleteMany({});
     await Listing.insertMany(initData.data)
     console.log("data was initialized");
}
initDB();
