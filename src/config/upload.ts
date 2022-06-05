import { diskStorage } from "multer";
import { resolve } from "path";
import { randomBytes } from "crypto";

export default {
  upload(folder: string) {
    return {
      storage: diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = randomBytes(16).toString("hex");
          const filename = `${fileHash}-${file.originalname}`;

          return callback(null, filename);
        },
      }),
    };
  },
};
