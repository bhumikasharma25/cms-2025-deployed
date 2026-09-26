import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization; 
    console.log("AUTH HEADER:", authHeader);
    if (!authHeader) {
    return res.status(401).json({
    message: "Authorization token required",
  });
};
  const token = authHeader.split(" ")[1];

  try {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  );

  console.log("Authenticated admin:", decoded);

  next();
} 
catch (error) {
  return res.status(401).json({
    message: "Invalid or expired token",
  });
}
};
