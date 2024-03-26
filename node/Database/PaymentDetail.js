const mongoose = require('mongoose')

const paymentDetailSchema = new mongoose.Schema({
    Vender: { type: mongoose.Schema.Types.ObjectId, ref: 'VenderDetail' },
    Payments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'MilkEntry' }],
    PaymentDate: Date,
    TotalAmount:{type : Number , default : 0},
    PaidAmount:{type : Number ,default : 0},
    UnpaidAmount:{type : Number ,default : 0},
    TotalQuantity:{type : Number ,default : 0},
    from:String,
    to:String,
},{
    timestamps: true
})

const PaymentDetail = mongoose.model('PaymentDetail', paymentDetailSchema);
module.exports = PaymentDetail;