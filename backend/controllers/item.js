import cloudinary from "../database/cloudinary.js";
import supabase from "../database/supabase.js";
import {v4 as uuidv4} from 'uuid';
import multer from "multer";

// Multer storage setup (Temporary file storage before upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

//fetch all item
export const getAllitems= async(req,res)=>{
    const {data,error }= await supabase.from('items').select('*');
    if(error){
        return res.status(500).json({
            success:false,
            message:"all data is not fetch"
        });
    }
    else{
        res.json(data);
    }
};
// add new item 
export const addItem = async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        let imageUrl = "";

        // Check if an image is uploaded
        if (req.file) {
            const imageBuffer = req.file.buffer.toString("base64");

            const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${imageBuffer}`, {
                folder: "item-images",
                public_id: `item-${uuidv4()}`,
                resource_type: "image",
            });

            imageUrl = uploadResponse.secure_url;
        }

        // Insert into Supabase
        const { error } = await supabase.from("items").insert([{ name, price, stock, image_url: imageUrl }]);

        if (error) {
            return res.status(500).json({ success: false, error: error.message });
        }

        res.json({ message: "Item added successfully", image_url: imageUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Apply `multer` to handle file uploads
export const uploadImage = upload.single("image");
//update an item 
export const updateItem= async(req,res)=>{
    const {id}=req.params;
    const {name,price,stock}=req.body;
    let imageUrl = req.body.image_url || ""
    if(req.file){
        try {
            const imageBuffer = req.file.buffer.toString("base64");

            const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${imageBuffer}`, {
                folder: "item-images",
                public_id: `item-${uuidv4()}`,
                resource_type: "image",
            });

            imageUrl = uploadResponse.secure_url;
            
        } catch (error) {
            return res.status(404).json({
                success:false,
                message:"image upload failed",
                error:error.message
            })
        }
    }
    const {error} = await supabase.from('items').update({name,price,stock,image_url:imageUrl}).eq('id',id);
    if(error){
        return res.status(404).json({
            success:false,
            error:error.message
        })
    }
    res.json({message:"item updated successfully"});
};
//delete an item
export const deleteItem = async(req,res)=>{
    try {
        const {id}=req.params;
    const {data:item, error:fetchError}=await supabase.from("items").select("image_url").eq("id",id).single();
    if(fetchError || !item){
        return res.status(404).json({
            success:false,
            message:"item not found"
        })
    }
    if(item.image_url){
        try {
            const public_id = item.image_url.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`item-images/${public_id}`)
        } catch (error) {
            return res.status(404).json({
                success:false,
                message:"failed to delete",
                error:error.message
            });
        }
    }
    const {error}=await supabase.from('items').delete().eq('id',id);
    if(error){
        return res.status(404).json({
            success:false,
            error:error.message
        })
    }
    res.json({message:"item deleted successfully"});
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
};