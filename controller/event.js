import Event from '../model/event.model.js';

export const createEvent=async (req,res)=>{
   try {
    const {title,description,shortDescription,date,location}=req.body;
    console.log(req.body);
    if(!title || !description || !shortDescription || !date || !location)
    {
        return res.status(400).json({
            message:"All Fields are required",
            success:false
        })
    }

    const newEvent=new Event({title,description,shortDescription,date,location})
    await newEvent.save();
    res.status(201).json({
        message:"New Event created successfully",
        success:true
    })

   } catch (error) {
    res.status(500).json({
        message:error.message,
        success:false
    })
    
   } 
}

export const getEvent=async (req,res)=>{
    try {
        const event=await Event.find();
        res.status(200).json({
            message:"Event Fetched",
            data:event,
            success:true
        })

        
    } catch (error) {
        res.status(200).json({
            message:error.message,
            success:false
        })
    }

}

export const updateEvent=async (req,res)=>{
    try {
    const {title,description,shortDescription,date,location}=req.body;

        const updateEvent=await Event.findByIdAndUpdate(req.params.id,{title,description,shortDescription,date,location});
        if(!updateEvent)
        {
            res.status(400).json({
                message:'Data Not Found',
                success:false
            })
        }
        res.status(200).json({
                message:'Event Update Successfully',
                data:updateEvent,
                success:true
            })

        
        
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
        
    }
}

export const deleteEvent=async (req,res)=>{
    try {
        const id=req.params.id;
        const deleteEvent=await Event.findByIdAndDelete(id);
        if(!deleteEvent)
        {
            res.status(400).json({
                message:"No data found",
                success:false
            })
        }
         res.status(200).json({
                message:"Event deleted successfully",
                success:true
            })
    } catch (error) {
         res.status(500).json({
                message:error.message,
                success:false
            })
    }

}