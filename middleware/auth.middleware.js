import jwt from 'jsonwebtoken';


export const  authenticateJWT=(req,res,next)=>
{
    const authHeader=req.header("Authorization");
    console.log(authHeader);
    const token=authHeader && authHeader.split(" ")[1];
    if(!token)
    {
        res.status(400).json({
            error:"Access Denied token missing"
        })
    }
    try {

        const decoder=jwt.verify(token,process.env.JWT_SECRET);
        res.user=decoder;
        next();
    } catch (error) {
        console.error("JWT Verification error",error);
         res.status(400).json({
            error:"Invalid token"
        })
    }
}
