const mongoose=require('mongoose');

const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type: String,
        required: true 
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }

})

module.exports=mongoose.model('Blog',BlogSchema);