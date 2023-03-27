const cloudinary=require('../Cloud/cloudinary');
const express=require('express');
const route=express();
const fileUpload=require('express-fileupload');
const postSchema=require('../Schema/schema');
route.use(express.json());
route.use(fileUpload({useTempFiles:true}));
const bodyParser=require("body-parser");
route.use(express.urlencoded());
route.use(bodyParser.urlencoded({extended:true}));
route.use(bodyParser.json());
route.get("/getdata",async(req,res)=>{
    const data=await postSchema.find();
    res.status(200).json(data);
});
route.post("/Postdata",async(req,res)=>{
    try{        
        const img=req.files.PostImage.tempFilePath;
        const image=await cloudinary.uploader.upload(img,{
            public_id:`${Date.now()}`,
            resource_type:"auto",
            folder:"images",
        });
        const data=await postSchema.create({
            PostImage:image.secure_url
        });
        data.save();
        res.status(200).json({
            message:"Post Saved"
        });
    }catch(e){
        return res.json({
            status:e.message,
        })
    }
})
module.exports=route;
