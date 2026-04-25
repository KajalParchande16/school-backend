import Notice from '../model/notice.model.js';

export const createNotice= async(req,res)=>{

try {

    const {title,description,date,category}=req.body;

    if(!title || !description || !date || !category )
    {
       return res.status(400).json({
            message:"All fields required",
            success:false
        })
    }

    const newNotice=new Notice({title,description,date,category});
    
    await newNotice.save();
    res.status(201).json({
        message:"Notice Created Successfully",
        success:true
    })
    
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
}

export const getNotice=async (req,res)=>{
    // console.log("requested");
    try {
        const notice= await Notice.find();
         setTimeout(() => {
            res.status(200).json({
                message: "Notice fetched successfully",
                notice: notice,
                success: true
            })
         }, 5000);
    } catch (error) {
    // console.log("requested not called");

         res.status(500).json({
        message:error.message
    })
    }
}

export const updateNotice=async (req,res)=>{
    try {
        
        const { title, description, date, category } = req.body;
        // console.log(req.body);
         if (!title || !description || !date || !category) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const updatedNotice=await Notice.findByIdAndUpdate(req.params.id,{ title, description, date, category });
        if(!updatedNotice)
        {
            return res.status(400).json({
                message: "data not found"
            })
        }
         res.status(201).json({
                message: "data updated successfully",
                notice: updatedNotice,
                success: true
            })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}
export const deleteNotice=async (req,res)=>{
    let id=req.params.id
    try {
        const notice=await Notice.findByIdAndDelete(id);
        if(!notice)
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
