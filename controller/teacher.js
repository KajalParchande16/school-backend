import Teacher from '../model/teacher.model.js';

export const createTeacher= async(req,res)=>{

try {

    const {name,subject,designation,bio,img}=req.body;

    if(!name || !subject || !designation || !bio || !img )
    {
       return res.status(400).json({
            message:"All fields required",
            success:false
        })
    }

    const newTeacher=new Teacher({name,subject,designation,bio,img});
    
    await newTeacher.save();
    res.status(201).json({
        message:"Teacher Created Successfully",
        success:true
    })
    
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
}

export const getTeacher=async (req,res)=>{
    // console.log("requested");
    try {
        const teacher= await Teacher.find();
         res.status(200).json({
                message: "Teacher fetched successfully",
                data: teacher,
                success: true
            })
    } catch (error) {
    // console.log("requested not called");

         res.status(500).json({
        message:error.message
    })
    }
}

export const updateTeacher=async (req,res)=>{
    try {
        
        const { name, subject, designation, bio,img } = req.body;
        // console.log(req.body);
         if (!name || !subject || !designation || !bio  || !img) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const updatedTeacher=await Teacher.findByIdAndUpdate(req.params.id,{ name, subject, designation, bio,img });
        if(!updatedTeacher)
        {
            return res.status(400).json({
                message: "data not found"
            })
        }
         res.status(201).json({
                message: "data updated successfully",
                data: updatedTeacher,
                success: true
            })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}
export const deleteTeacher=async (req,res)=>{
    let id=req.params.id
    console.log(id);
    try {
        const teacher=await Teacher.findByIdAndDelete(id);
        if(!teacher)
        {
            res.status(400).json({
                message: "No data found",
                success: true
            })
        }
         res.status(200).json({
                message: "data deleted successfully",
                success: true
            })
    } catch (error) {
        res.status(200).json({
                message: error.message,
                success: false
            })
    }

}
