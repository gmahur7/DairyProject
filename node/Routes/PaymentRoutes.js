const express=require('express');
const router=express.Router();
const {paymentDone,getVenderAllPayments}=require('../Controllers/PaymentControllers')
const {protect}=require('../Middlewares/JWT')

router.route('/:id').post(paymentDone)
router.post('/vender/done',getVenderAllPayments)

module.exports=router;