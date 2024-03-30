require('dotenv').config()
const express=require('express')
const cors=require('cors')
const app=express()
const port = process.env.PORT || 3001;

app.use(express.json())
app.use(cors())
//----------------------------Admin------------------------------------------------------------------
const AdminRoutes=require('./Routes/AdminRoutes')
app.use('/api/admin',AdminRoutes)

//----------------------------Vender------------------------------------------------------------------
const VenderRoutes=require('./Routes/VenderRoutes')
app.use('/api/vender',VenderRoutes)

//----------------------------Milk Entry------------------------------------------------------------------
const MilkEntryRoutes=require('./Routes/MilkEntryRoutes')
app.use('/api/milkentry',MilkEntryRoutes)

//----------------------------Payment Routes------------------------------------------------------------------
const PaymentDetail=require('./Routes/PaymentRoutes')
app.use('/api/payment',PaymentDetail)

//----------------------------One Day Detail Routes------------------------------------------------------------------
const PerDayDetail=require('./Routes/PerDayMilkEntryRoutes')
app.use('/api/perday',PerDayDetail)

//----------------------------Product Purchase Routes------------------------------------------------------------------
const ProductPurchase=require('./Routes/ProductPurchaseRoute')
app.use('/api/sellpurchase/purchase',ProductPurchase)

//----------------------------Product Purchase Routes------------------------------------------------------------------
const ProductSell=require('./Routes/ProductSellRoutes')
app.use('/api/sellpurchase/sell',ProductSell)

//---------------------Start Server ------------------------------------------------------------------
app.listen(port,'127.0.0.1',()=>
{
    console.log("Server Is Running @ ",port)
})
