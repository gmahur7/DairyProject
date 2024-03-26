const express=require('express')
const router=express.Router()
const {oneDayDetail,lastdaysTotalData,fromdatetodate}=require('../Controllers/PerdayMilkEntryControllers')

router.route('/').post(oneDayDetail)
router.post('/lastdaysdata',lastdaysTotalData)
router.post('/fromdatetodate',fromdatetodate)

module.exports=router;