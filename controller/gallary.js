import Gallery from '../model/gallary.model.js';

export const createGallary= async(req,res)=>{
console.log(req.body);
try {

    const {title,imgUrl,date}=req.body;

    if(!title || !imgUrl || !date)
    {
       return res.status(400).json({
            message:"All fields required",
            success:false
        })
    }

    const newGallary=new Gallery({title,imgUrl,date});
    
    await newGallary.save();
    res.status(201).json({
        message:"Gallary Created Successfully",
        success:true
    })
    
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
}

// export const getGallary=async (req,res)=>{
//     try {
//         const gallary= await Gallery.find();
//          res.status(200).json({
//                 message: "data fetched successfully",
//                 gallary: gallary,
//                 success: true
//             })
//     } catch (error) {
//          res.status(500).json({
//         message:error.message
//     })
//     }
// }

export const getGallary = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const data = await Gallery.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Gallery.countDocuments();

    res.status(200).json({
      success: true,
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateGallary=async (req,res)=>{
    try {
        
        const { title, imgUrl, date } = req.body;
        console.log(req.body);
         if (!title || !imgUrl || !date) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const updatedGallary=await Gallery.findByIdAndUpdate(req.params.id,{ title,imgUrl,date });
        if(!updatedGallary)
        {
            return res.status(400).json({
                message: "Data not found"
            })
        }
         res.status(201).json({
                message: "Data updated successfully",
                data: updatedGallary,
                success: true
            })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}
export const deleteGallary=async (req,res)=>{
    let id=req.params.id
    try {
        const gallery=await Gallery.findByIdAndDelete(id);
        if(!gallery)
        {
            res.status(400).json({
                message: "No Data found",
                success: true
            })
        }
         res.status(200).json({
                message: "Data deleted successfully",
                success: true
            })
    } catch (error) {
        
    }

}

export const createBulkGallary = async (req,res)=>{
 try{
   const count = req.body.count || 100;

   const data = [];

   for(let i=1;i<=count;i++){
     data.push({
       title:`Gallery ${i}`,
       imgUrl:'https://picsum.photos/id/1042/600/400, https://picsum.photos/id/1062/600/400,https://picsum.photos/id/1070/600/400, https://picsum.photos/id/1084/600/400, https://picsum.photos/id/1080/600/400',
       date:new Date()
     });
   }

   await Gallery.insertMany(data);

   res.status(201).json({
     success:true,
     message:`${count} gallery created`
   });

 }catch(error){
   res.status(500).json({
     success:false,
     message:error.message
   });
 }
}