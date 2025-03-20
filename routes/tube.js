const { Router } = require("express");
const { handeladdnew, addnewvideo,getvideo,handelnewcomment } = require("../controller/tube");
const multer = require("multer");
const path = require("path");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = file.mimetype.startsWith("image/") 
            ? "./public/thumbnails" 
            : "./public/videos";
        cb(null, path.resolve(uploadPath));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type! Only images and videos are allowed."), false);
    }
};

const upload = multer({ storage, fileFilter });

router.get("/add-new", handeladdnew);
router.post("/", upload.fields([{ name: "video", maxCount: 1 }, { name: "thumbnailImage", maxCount: 1 }]), addnewvideo);
router.get("/:id",getvideo);
router.post("/comment/:videoId",handelnewcomment);

module.exports = router;
