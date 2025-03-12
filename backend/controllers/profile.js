import cloudinary from "../database/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import supabase from "../database/supabase.js";

const storage = multer.memoryStorage();
export const uploadMiddleware = multer({ storage }).single("profile_image");

export const updateProfile = async (req, res) => {
    try {
        const user_id = req.user?.id;
        if (!user_id) {
            return res.status(404).json({
                success: false,
                message: "User ID is missing",
            });
        }

        const { full_name, phone_number, shop_number, country, state, city, address, pincode } = req.body;

        let profileimage = "";

        // Upload image if provided
        if (req.file) {
            try {
                const uploadResponse = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "profile-images",
                            public_id: `profile-${uuidv4()}`,
                            resource_type: "image",
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(req.file.buffer); // Send buffer directly to Cloudinary
                });

                profileimage = uploadResponse.secure_url;
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Image upload failed",
                    error: error.message,
                });
            }
        }

        // Profile data for upsert
        const profileData = {
            id: user_id, // Ensure user ID is present for upsert
            full_name,
            phone_number,
            shop_number,
            country,
            state,
            city,
            address,
            pincode,
        };

        if (profileimage) {
            profileData.profile_image = profileimage;
        }

        // Upsert the profile in Supabase
        const { data, error } = await supabase
            .from("profiles")
            .upsert([profileData], { onConflict: ["id"] })
            .select();

        if (error) {
            console.error("Supabase upsert error:", error);
            return res.status(500).json({ message: "Error saving profile", error: error.message });
        }

        res.json({
            success: true,
            message: "Profile saved successfully",
            profile_image: profileimage || (data.length > 0 ? data[0].profile_image : ""),
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user_id = req.user?.id;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID is not found"
            });
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user_id)
            .single(); // Assuming each user has only one profile

        if (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch profile data",
                error: error.message
            });
        }

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
