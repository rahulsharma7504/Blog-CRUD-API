const express=require('express');
const app=express();
app.use(express.json());


const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Blog').then(()=>{
    console.log('Database is connected');
},(err)=>{
    console.log(err);
})
const BlogRoute=require('./Routes/BlogRoute');

const userRoute=require('./Routes/RegistrationRoute')
app.use('/api/user',userRoute)


app.use("/api/blog",BlogRoute)

app.listen(3000,()=>{
    console.log('Server is running');
})


