const express = require("express");
const router = express.Router();

const {imageUpload, getAllImages} = require("../controllers/fileUpload");

//api route 
router.post("/imageUpload",imageUpload);
router.get("/images",getAllImages);

module.exports = router;