const express=require('express')
const router=express.Router()
const {addEntry,allEntry}=require('../Controllers/ProductPurchaseController')
router.route('/').post(addEntry).get(allEntry)

module.exports=router