import multer, { StorageEngine } from "multer";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(process.cwd(), "public/uploads"));
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

export const upload = multer({ storage: storage });
