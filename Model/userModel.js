const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    Blogs:[{
        type:mongoose.Types.ObjectId,  
        ref:'Blog',  //referencing to the model named 'Blog',
        required:true
    }]
   
})

module.exports=mongoose.model('User',userSchema);