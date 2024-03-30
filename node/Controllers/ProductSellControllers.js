const ProductSell = require('../Database/ProductSell')
const asyncHandler = require('express-async-handler')

const addEntry = asyncHandler(async (req, resp) => {
    const { ProductName, Quantity, NetAmount, Price } = req.body;
    try {
        if (!ProductName || !Quantity || !NetAmount || !Price) throw new Error("Please Fill All Field First")
        else {
            let result = await new ProductSell(req.body)
            result = await result.save()
            if (result && result._id) resp.status(200).send({ msg: "Successfull" })
            else throw new Error("Entry Not saved")
        }
    } catch (error) {
        resp.status(404).send({ msg: error.message })
    }
})

const allEntry = asyncHandler(async (req, resp) => {
    try {
        let data = await ProductSell.find()
        if(data.length>0) resp.status(200).send(data)
        else throw new Error("Data Not Found")
    } catch (error) {
        resp.status(404).send({ msg: error.message })
    }
})

module.exports = {
    allEntry,
    addEntry
}