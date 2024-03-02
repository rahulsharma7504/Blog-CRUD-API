const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
const JWT=require('jsonwebtoken');

const Config=require('../config/config')
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

      

        // Check if the email already exists
        const find = await User.findOne({ email: email });

        if (find) {
            return res.status(400).json({ mes: 'error', data: 'Email already exists' });
        } else {
            // Hash the password
            const hashPass =  bcrypt.hashSync(password, 11);

            // Create a new user instance
            const newUser = new User({
                name,
                email,
                password:hashPass,
                Blogs:[]
            });

            // Save the user to the database
            await newUser.save();

            console.log(newUser);

            res.status(200).json({ mes: 'success', data: newUser });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ mes: 'error', data: 'Internal server error' });
    }
};

//User Login

const Login=async(req,res)=>{
    try {


        const {email ,password}=req.body;
        const find=await User.findOne({email:email});
        if(!find){
            return res.status(400).json({mes:'error',data:'User not found'});
        }else{
           const validPassword=bcrypt.compare(password,find.password);
           if(!validPassword){
               return res.status(400).json({mes:'error',data:'Invalid password'});
           }else{
            const token=JWT.sign({_id:find._id},Config.secratKey)
            const data={
                token,
                user:find
            }
            res.status(200).json({mes:'success',data:data})

           }
        }
        
    } catch (error) {
        if(error) throw error
        
    }
}



module.exports = {
    register,
    Login
};
