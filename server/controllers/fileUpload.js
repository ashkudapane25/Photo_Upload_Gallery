const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder){
    const options ={folder};
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}


//imageUpload handler
exports.imageUpload = async (req,res) => {
    try{
        //data fetch
        const{name ,tags} = req.body;
        console.log(name,tags);

        //file fetch
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg" ,"jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                meassage:'File Format not supported',
            })

        }
        
        //if file format supported
        console.log("uploading to cloudinary")
        const response = await uploadFileToCloudinary(file,"PrabhaDesigns");
        console.log(response);

        //save entry in db
        const fileData =await File.create({
            name,
            tags,
            imageUrl:response.secure_url,
        });


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image succesfuly uploaded",
        })
    }
    catch(error){
         console.error(error);
         res.status(400).json({
            success:false,
            message:"Something went wrong",
         })
    }
}


// Controller to fetch all images
exports.getAllImages = async (req, res) => {
    try {
        // Fetch all image records from the database
        const images = await File.find(); // Assuming File is your Mongoose model

        if (images.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No images found",
            });
        }

        // Send the image data as a response
        res.json({
            success: true,
            images: images,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
