const express = require('express');
const router=express.Router()
const {newMilkEntry,milkEntryTable,fetchEntries,getAllVendorsLastDaysData}=require('../Controllers/MilkEntryControllers')
const {protect}=require("../Middlewares/JWT")

router.route('/').post(protect,newMilkEntry)
router.post('/entries',protect,fetchEntries)
router.get('/vendersdata/:days',protect,getAllVendorsLastDaysData)

module.exports = router; 