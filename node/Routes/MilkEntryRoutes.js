const express = require('express');
const router=express.Router()
const {newMilkEntry,milkEntryTable,getTodaysData,getAllVendorsDateToDateData,fetchEntries,getAllVendorsLastDaysData}=require('../Controllers/MilkEntryControllers')
const {protect}=require("../Middlewares/JWT")

router.route('/').post(protect,newMilkEntry)
router.post('/entries',protect,fetchEntries)
router.get('/vendersdata/:days',protect,getAllVendorsLastDaysData)
router.post('/vendersdata/',protect,getAllVendorsDateToDateData)
router.post('/entries/today',protect,getTodaysData)

module.exports = router; 