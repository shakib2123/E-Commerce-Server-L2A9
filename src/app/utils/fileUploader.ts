import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ICloudinaryResponse, IFile } from "../interfaces/file";

cloudinary.config({
  cloud_name: "dzaxv8jz7",
  api_key: "594852967727754",
  api_secret: "pjnwSZ7mp1gni-K0ylOdX4blWBM",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

async function uploadToCloudinary(
  file: IFile
): Promise<ICloudinaryResponse | undefined> {
  // Upload an image
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}

export const fileUploader = { upload, uploadToCloudinary };
