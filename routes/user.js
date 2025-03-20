const {Router}=require("express");
const {signin,signup,handelsignup,handelsignin,handellogout}=require("../controller/user");
const router=Router();
const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/images`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename)
    }
  });
  const upload=multer({storage:storage});


router.get("/signup",signup);
router.get("/signin",signin);
router.post("/signup",upload.single("profileImage"),handelsignup);
router.post("/signin",handelsignin);
router.get("/logout",handellogout);

module.exports=router;