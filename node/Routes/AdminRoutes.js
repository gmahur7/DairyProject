const express=require('express')
const router=express.Router()
const {adminLogin,registerAdmin}=require('../Controllers/AdminContollers')
router.route('/').post(adminLogin)
router.post('/register',registerAdmin)

module.exports=router