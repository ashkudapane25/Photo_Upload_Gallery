const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
    
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    }
});

module.exports = mongoose.model("File", fileSchema);