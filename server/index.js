//app create
const express = require("express");
const app = express();
const cors = require("cors");  // Import cors package

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",  // Allow your frontend's URL
  methods: "GET, POST",  // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization",  // Allowed headers
};

// Use the CORS middleware with the options
app.use(cors(corsOptions));

//port find krna hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add krne 
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir :'/tmp/'
}));

//db connect
const db = require("./config/database");
db.connect();

//cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mounting
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

//activate server
app.listen(PORT,() => {
    console.log(`App is running at ${PORT}`);
})