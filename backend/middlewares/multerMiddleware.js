import multer from "multer";

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

// Optional: Filter allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/webm'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos (mp4/webm) are allowed'), false);
  }
};

// Multer upload configuration
export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // ✅ 100MB limit
  fileFilter: fileFilter
});
