import {Request,Response} from "express";
import Blog from "../models/Blog.js";

export const createBlog = async(req:Request,res:Response)=>{
    const {title,slug,description,content,thumbnail,category,tags,status,author} = req.body;
    const blog = new Blog({
        title,
        slug,
        description,
        content,
        thumbnail,
        category,
        tags,
        status,
        author
    });
    await blog.save();
    res.status(201).json({
        success:true,
        message : "Blog created successfully",
        data: blog
    });
};

export const getBlogs = async(req:Request,res:Response)=>{
    const blog = await Blog.find();
    res.status(200).json({
        message: "Blogs fetched successfully",
        data: blog
    });
};

export const getBlogById = async(req:Request,res:Response)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        res.status(404).json({
            message: "Blog not found"
        });
    }
    res.status(200).json({
        message: "Blogs fetched successfully",
        data: blog
    });

};

export const updateBlog = async(req:Request,res:Response)=>{
    const {id} = req.params;
    const blog = await Blog.findByIdAndUpdate(id,
    req.body,
    {
        new: true,
        runValidators: true
    }
);
    if(!blog){
        res.status(404).json({
            message: "Blog not found"
        });
    }
    res.status(200).json({
        message: "Blog Updated successfully",
        data: blog
    });

};

export const deleteBlog = async(req:Request,res:Response)=>{
    const {id} = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if(!blog){
        res.status(404).json({
            message: "Blog not found",
        });
    }
    res.status(200).json({
        message: "Blog deleted successfully",
        data: blog
    });
};

export const getPublicBlogs = async(req:Request,res:Response)=>{
    const blog = await Blog.find({status:"published"});
     res.status(200).json({
      success: true,
      message: "Public blogs fetched successfully",
      data: blog,
    });
}