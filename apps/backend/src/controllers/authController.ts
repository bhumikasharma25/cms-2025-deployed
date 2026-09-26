import type { Request, Response } from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    return res.status(200).json({
        message: "Login Successfully", token,
    });
};
