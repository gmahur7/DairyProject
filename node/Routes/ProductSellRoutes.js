const express=require('express')
const router=express.Router()
const {addEntry,allEntry}=require('../Controllers/ProductSellControllers')
router.route('/').post(addEntry).get(allEntry)

module.exports=router