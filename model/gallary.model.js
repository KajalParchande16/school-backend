import mongoose from "mongoose";

const gallerySchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
},{timestamps:true}
)

 const Gallery= mongoose.model('Gallery',gallerySchema);
 export default Gallery;