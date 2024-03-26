const Admin = require('../Database/Admin')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../Middlewares/JWT')

const adminLogin = asyncHandler(async (req, resp) => {
    const { id, password } = req.body
    try {
        if (!id || !password) {
            throw new Error("Please Fill All The Fields")
        }
        else {
            const admin = await Admin.findOne({ id })
            if (admin && (await admin.matchPassword(password))) {
                resp.status(200).json({
                    id: admin.id,
                    token: await generateToken(admin._id)
                })
            }
            else {
                throw new Error("Invalid Id or Password")
            }
        }
    } catch (error) {
        resp.status(400).send({ msg: error.message })
    }
})

const registerAdmin = asyncHandler(async (req, resp) => {
    const { id, password } = req.body
    try {
        const admin = await Admin.create({ id, password })
    if (admin) {
        resp.status(201).json({
            _id: admin._id,
            id: admin.id,
            token: await generateToken(admin._id)
        })
    }
    else {
        resp.status(400)
        throw new Error("Failed To Register the user")
    }
    } catch (error) {
        resp.status(500).send({ msg: "Server Error" });
    }
})


module.exports = {
    adminLogin,
    registerAdmin
}