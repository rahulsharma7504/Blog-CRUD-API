const JWt=require('jsonwebtoken');
const config=require('../config/config');

const Auth=(req,res,next)=>{
    try {
        const token=req.body.token || req.body.token || req.headers.token;
        if(!token){
            return res.status(401).json({mes:'error',data:'No token provided'});
        }else{
            JWt.verify(token,config.secratKey,(err,decoded)=>{
                if(err){
                    return res.status(401).json({mes:'error',data:'Invalid token'});
                }else{
                    req.decoded=decoded;
                    // res.status(200).send('Auth is done')
                    next();
                }
            })
        }
        
    } catch (error) {
        if(error) throw error;
        res.status(500).send('Internal Server Error');
        
    }

}

module.exports=Auth;