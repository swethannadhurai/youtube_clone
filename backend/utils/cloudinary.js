

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("Local file path is required");
        }

    
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            media_metadata: true,
            secure: true,
        });

        fs.unlinkSync(localFilePath);

        return { url: response.secure_url };
    } catch (error) {
        
        console.error("Error uploading file:", error.message);

    
        if (fs.existsSync(localFilePath)) {
        
            fs.unlinkSync(localFilePath);
        }

        
        return { error: error.message };
    }
};

export { uploadOnCloudinary };