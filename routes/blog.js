const {Router}=require("express");
const {handeladdnew,handelcreatenewblog,getblog,handelnewcomment,}=require("../controller/blog");
const router=Router();

const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename)
    }
  });
  const upload=multer({storage:storage});

router.get("/add-new",handeladdnew);
router.post("/",upload.single("coverImage"),handelcreatenewblog);
router.get("/:id",getblog);
router.post("/comment/:blogId",handelnewcomment);

module.exports=router;