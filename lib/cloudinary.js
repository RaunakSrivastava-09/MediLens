import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads a base64 data URL (from the browser file input) to Cloudinary
 * and returns the hosted image URL.
 */
export async function uploadPrescriptionImage(base64DataUrl) {
  const result = await cloudinary.uploader.upload(base64DataUrl, {
    folder: "medilens/prescriptions"
  });
  return result.secure_url;
}

export default cloudinary;
