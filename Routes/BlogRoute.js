const express=require('express');
const BlogController=require('../controller/BlogController')
const BlogRoute=express();
BlogRoute.use(express.json())
const Auth=require('../Moddleware/Auth')


BlogRoute.get('/', Auth,BlogController.addBlog)
BlogRoute.get('/all-blog',Auth,BlogController.getallPost)
BlogRoute.post('/update-blog',Auth,BlogController.updateBlog)
BlogRoute.post('/delete-blog',Auth,BlogController.DeleteBlog)
BlogRoute.post('/All-blog',Auth,BlogController.AllBlogs)


module.exports=BlogRoute