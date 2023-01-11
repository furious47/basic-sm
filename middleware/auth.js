const {noAuth} = require('../error')
const user = require('../models/auth')
const jwt = require('jsonwebtoken');

const auth = async (req,res,next)=>{
    const header = req.headers.authorization 
    if(!header || !header.startsWith('Bearer ')){
        throw new noAuth('No token provided')
    }
    const token = header.split(' ')[1]

    
    
    try {
        const encoded = jwt.verify(token,process.env.JWT_SECRET)
        const {name,userId} = encoded
        
        req.user = {name:name,userId:userId}
        next()
    } catch (error) {
        throw new noAuth('user not authenticated')
    }
}

module.exports = auth;