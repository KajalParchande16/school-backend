import mongoose from "mongoose";

const teacherSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
},{timestamps:true}
)

 const Teacher= mongoose.model('Teacher',teacherSchema);
 export default Teacher;