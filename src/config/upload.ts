import path from "path";
import multer from "multer";
import crypto from "crypto";

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (_request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
};
