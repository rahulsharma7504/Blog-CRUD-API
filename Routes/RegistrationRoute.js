const express=require('express');
const Auth=require('../Moddleware/Auth')

const app=express();
app.use(express.json());
const userController=require('../controller/UserController')
app.get('/',userController.register);
app.post('/login',userController.Login);




module.exports = app