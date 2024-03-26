const secretKey=process.env.SECRET_KEY
const Jwt=require('jsonwebtoken')
const Admin = require('../Database/Admin')
const asyncHandler = require('express-async-handler')

const generateToken=async(id)=>{
    let token=await Jwt.sign({id},secretKey,{expiresIn:'12h'})
    return token
}

const protect = asyncHandler(async (req, resp, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = Jwt.verify(token, secretKey)
            req.user = await Admin.findById(decoded.id).select("-password")
            next();
        } catch (error) {
            resp.status(401)
            throw new Error("Not Authorized, Token Failed")
        }
    }

    if (!token) {
        resp.status(401)
        throw new Error("Not Authorized, No Token")

    }
})

module.exports={
    generateToken,
    protect
}