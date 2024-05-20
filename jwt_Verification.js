const jwt = require('jsonwebtoken')
exports.jwtVerification = async (req,res,next)=>{
    if(process.env.JWT_EXCEPTIONAL_URL.includes(req.path)){
        next()
    }
    else{
        jwt.verify(req.headers.authorization, process.env.AUTH_KEY, (err,result)=>{
            if(err){
                return res.status(500).send({
                    message: "Provide Authorization Details"
                })
            }
            else{
                req.authBody = result

                next()
            }
        })
    }
}