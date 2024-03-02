const Blog=require('../Model/Blog');
const User=require('../Model/userModel');


const addBlog=async (req,res)=>{
    try {
        const {title , content , image ,user} =req.body;
        const  userId=await User.findById(user);
         if(!userId){
        return res.status(401).send({msg:"User Not Found"});

         } else{
            const  blog=new Blog({
                title : title,
                content:content,
                image:image,
                user:user
            })
            await blog.save();
            res.status(201).json(blog);

         }
         

        


        
    } catch (error) {
        if(error) throw error
        
    }
}

const getallPost=async(req,res)=>{
    try {
       const BlogData= await Blog.find().sort({title:1});
       res.status(200).json({msg:BlogData})

        res.send("jdk")
    } catch (error) {
        if(error) throw error
        res.status(200).send({msg: "Error Occurred"}) 
        
    }
}

const updateBlog=async (req,res)=>{
    try {
        //code for updating the data in database
        const {title, content}=req.body;
        const id=req.query.id;
        if(id){
        const data=await Blog.findByIdAndUpdate({_id:id},{$set:{title:title,content:content}},{new:true});
        res.status(200).send({msg:data})

        }

        
    } catch (error) {
        if(error) throw error
        res.status(400).send({msg: 'Update Failed'})  
        
    }
}

const DeleteBlog = async (req, res) => {
    try {
        const data = req.query.id;

        const result = await Blog.deleteOne({ _id: data });

        if (result.deletedCount > 0) {
            console.log(`Deleted the record with the id ${data}`);
            res.send('Record has been deleted!');
        } else {
            console.log(`Record with id ${data} not found.`);
            res.status(404).send(`Record with id ${data} not found.`);
        }
    } catch (error) {
        console.error(`Failed to delete the record: ${error}`);
        res.status(500).send(`Failed to delete the record: ${error.message || error}`);
    }
};

const AllBlogs = async (req, res) => {
    try {
        const id = req.query.id;
        const findBlog = await Blog.find({user:id});

        if (findBlog) {
            res.status(200).json({ msg: findBlog });
        } else {
            res.status(404).send("No blogs found");
        }
    } catch (error) {
        console.error(`Error in fetching blogs: ${error}`);
        res.status(500).json({ msg: 'Error in fetching blogs' });
    }
};




module.exports={
    addBlog,
    getallPost,
    updateBlog,
    DeleteBlog,
    AllBlogs
}