const express = require('express');
const router=express.Router()
const {newVender,allDateToDateEntries,venderTable,dateToDateEntries,venderName,venderById,venderDetail,alllastDaysEntries,lastDaysEntries,venderAllEntries}=require('../Controllers/VenderControllers')
const {protect}=require("../Middlewares/JWT")

router.route('/').post(protect,newVender).get(protect,venderTable)
router.get('/names',protect,venderName)
router.get('/id/:id',protect,venderById)
router.get('/venderdetail/:id',protect,venderDetail)
router.post('/venderdetail/lastdaysentries/',protect,lastDaysEntries)
router.get('/venderdetail/all/:id',protect,venderAllEntries)
router.post('/venderdetail/all/lastdaysentries/',protect,alllastDaysEntries)
router.post('/venderdetail/all/datetodateentries/',allDateToDateEntries)
router.post('/venderdetail/notpayment/datetodateentries/',dateToDateEntries)

module.exports = router; 