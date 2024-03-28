require('../Database/config')
const mongoose = require('mongoose')
const moment = require('moment')
const Vender = require('../Database/VenderDetail')
const MilkEntry = require('../Database/MilkEntry')
const DayMilkEntry = require('../Database/PerDayMilkEntry')
const asyncHandler = require('express-async-handler')
const PaymentDetail = require('../Database/PaymentDetail')

// const deleted = async () => {
// //     // await Vender.deleteMany({})
//     await MilkEntry.deleteMany({})
//     await DayMilkEntry.deleteMany({})
//     await PaymentDetail.deleteMany({})
// }

// deleted()

const newMilkEntry = asyncHandler(async (req, resp) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.Vender)) {
        return resp.status(400).send({ msg: 'Invalid Vendor ID' });
    }
    const vender = await Vender.findById(req.body.Vender);
    // console.log(vender)
    if (vender) {
        try {
            let milkEntry = await MilkEntry.findOne({ Vender: vender._id, DateDetail: req.body.DateDetail, Shift: req.body.Shift });
            if (milkEntry) {
                milkEntry.Quantity = Number.parseFloat(milkEntry.Quantity) + Number.parseFloat(req.body.Quantity);
                milkEntry.NetAmount = Number.parseFloat(milkEntry.NetAmount) + Number.parseFloat(req.body.NetAmount);
                await milkEntry.save();
                let date = await DayMilkEntry.findOne({ Date: milkEntry.DateDetail, Shift: milkEntry.Shift })
                if (date) {
                    date.TotalAmount += Number.parseFloat(req.body.NetAmount)
                    date.TotalQuantity += Number.parseFloat(req.body.Quantity)
                    await date.save()
                    await date.populate('MilkDetails')
                }
                else {
                    let data = await new DayMilkEntry({ Date: milkEntry.DateDetail, TotalAmount: req.body.NetAmount, TotalQuantity: milkEntry.Quantity, Shift: milkEntry.Shift })
                    await data.save()
                    // await date.populate('MilkDetails')
                }
            }
            else {
                milkEntry = await MilkEntry({ ...req.body, Rate: vender.Rate, FatPass: vender.FatPass });
                milkEntry = await milkEntry.save();
                if (milkEntry) {
                    let date = await DayMilkEntry.findOne({ Date: milkEntry.DateDetail, Shift: milkEntry.Shift })
                    if (date) {
                        date.TotalAmount += Number.parseFloat(req.body.NetAmount)
                        date.TotalQuantity += Number.parseFloat(req.body.Quantity)
                        await date.MilkDetails.push(milkEntry._id)
                        await date.save()
                        await date.populate('MilkDetails')
                    }
                    else {
                        let data = await new DayMilkEntry({ Date: milkEntry.DateDetail, TotalAmount: req.body.NetAmount, TotalQuantity: milkEntry.Quantity, Shift: milkEntry.Shift })
                        await data.MilkDetails.push(milkEntry._id)
                        await data.save()
                        // await date.populate('MilkDetails')
                    }
                }
            }
            vender.MilkDetail.push(milkEntry._id);
            await vender.save();
            await vender.populate('MilkDetail');
            resp.send({ msg: 'Successful' });
        } catch (error) {
            resp.status(400).send({ msg: error.message });
        }
    } else {
        resp.status(400).send({ msg: 'Vender Not Found' });
    }
})

const milkEntryTable = asyncHandler(async (req, resp) => {
    try {
        let data = await Vender.find()
        if (data.length > 0) resp.send(data)
        else throw new Error({ msg: "Failed To fetch" })
    } catch (error) {
        resp.status(400).send(error.message)
    }
})

const fetchEntries = asyncHandler(async (req, resp) => {
    const { ids } = req.body
    if (!ids.length > 0) {
        resp.status(401).send({ msg: "Empty Milk Entries" })
    }
    try {
        let data = await ids.map(async (item) => {
            let result = await MilkEntry.findById(item).populate('Vender');
            if (result) return result;
        })
        data = await Promise.all(data)
        if (data.length > 0) resp.status(200).send(data)
        else throw new Error("Milk Entries Not Found")
    } catch (error) {
        resp.status(200).send({ msg: error.message })
    }
})

const getAllVendorsLastDaysData = async (req, res) => {
    const { days } = req.params
    try {
        const daysAgo = moment().subtract(days, 'days').format('YYYY-MM-DD');
        const vendorData = await MilkEntry.aggregate([
            {
                $match: {
                    DateDetail: { $gte: daysAgo },
                },
            },
            {
                $group: {
                    _id: '$Vender',
                    totalQuantity: { $sum: '$Quantity' },
                    totalNetAmount: { $sum: '$NetAmount' },
                },
            },
        ]);

        const vendorDetailsPromises = vendorData.map(async (item) => {
            const venderDetails = await Vender.findById(item._id);
            return {
                ...item,
                Name: venderDetails?.Name || 'Unknown', // Provide a default value if Name is undefined
            };
        });

        const vendorDetailsWithNames = await Promise.all(vendorDetailsPromises);

        if (vendorData.length === 0) {
            return res.status(404).json({ msg: `No data found for any vendor in the last ${days} days` });
        }

        res.status(200).json(vendorDetailsWithNames);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

const getAllVendorsDateToDateData = async (req, res) => {
    const { startDate, endDate } = req.body
    if (!startDate || !endDate) res.status(401).send({ msg: "Start Date or End Date Is Missing" })
    else {
        try {
            const vendorData = await MilkEntry.aggregate([
                {
                    $match: {
                        DateDetail: {
                            $gte: startDate,
                            $lte: endDate
                        },
                    },
                },
                {
                    $group: {
                        _id: '$Vender',
                        totalQuantity: { $sum: '$Quantity' },
                        totalNetAmount: { $sum: '$NetAmount' },
                    },
                },
            ]);

            const vendorDetailsPromises = vendorData.map(async (item) => {
                const venderDetails = await Vender.findById(item._id);
                return {
                    ...item,
                    Name: venderDetails?.Name || 'Unknown', // Provide a default value if Name is undefined
                };
            });

            const vendorDetailsWithNames = await Promise.all(vendorDetailsPromises);

            if (vendorData.length === 0) {
                return res.status(404).json({ msg: `No data found for any vendor in the last ${days} days` });
            }

            res.status(200).json(vendorDetailsWithNames);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Server Error' });
        }
    }
};

module.exports = {
    newMilkEntry,
    milkEntryTable,
    fetchEntries,
    getAllVendorsLastDaysData,
    getAllVendorsDateToDateData
}