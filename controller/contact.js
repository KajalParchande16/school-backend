import Contact from '../model/contact.model.js';

export const createContact= async(req,res)=>{

try {

    const {name,email,phone,subject,message}=req.body;

    if(!name || !email || !phone || !subject || !message)
    {
       return res.status(400).json({
            message:"All fields required",
            success:false
        })
    }

    const newContact=new Contact({name,email,phone,subject,message});
    
    await newContact.save();
    res.status(201).json({
        message:"Thank You ! We will reach you ASAP",
        success:true
    })
    
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
}

export const getContacts=async (req,res)=>{
    try {
        const contacts= await Contact.find();
         res.status(200).json({
                message: "Contact fetched successfully",
                contact: contacts,
                success: true
            })
    } catch (error) {
         res.status(500).json({
        message:error.message
    })
    }
}

export const deleteContact=async (req,res)=>{
    let id=req.params.id
    try {
        const contact=await Contact.findByIdAndDelete(id);
        if(!contact)
        {
            res.status(400).json({
                message: "No Contact found",
                success: true
            })
        }
         res.status(200).json({
                message: "Contact deleted successfully",
                success: true
            })
    } catch (error) {
        
    }

}
