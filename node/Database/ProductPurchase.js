const mongoose = require('mongoose')

const productPurchaseSchema = new mongoose.Schema({
    // Vender: { type: mongoose.Schema.Types.ObjectId, ref: 'VenderDetail' },
    DateDetail: String,
    ProductName: String,
    Quantity: Number,
    NetAmount:Number,
    Price:Number,
},
// {
//     timestamps: true
// }
)

const ProductPurchase = mongoose.model('Product-Purchase', productPurchaseSchema)
module.exports = ProductPurchase;