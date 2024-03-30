const mongoose = require('mongoose')

const productSellSchema = new mongoose.Schema({
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

const ProductSell = mongoose.model('Product-Sell', productSellSchema)
module.exports = ProductSell;