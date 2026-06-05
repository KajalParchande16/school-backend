import jwt from 'jsonwebtoken';


export const  authenticateJWT=(req,res,next)=>
{
    const authHeader=req.header("Authorization");
    console.log(authHeader);
    const token=authHeader && authHeader.split(" ")[1];
    if(!token)
    {
      return  res.status(400).json({
            error:"Access Denied token missing"
        })
    }
    try {

        const decoder=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoder;
        next();
    } catch (error) {
        console.error("JWT Verification error",error);
         res.status(400).json({
            error:"Invalid token"
        })
    }
}

export const isAdmin = (req, res, next) => {
    // console.log(req.user);
  if (req.user.role !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only."
    });
  }
  next();
};
