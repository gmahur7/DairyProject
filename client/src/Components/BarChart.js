
    label: 'Evening',
    data: data.map((item) => {
        if (item.MilkDetails.Shift === 'M') 
        return item.MilkDetails.Quantity
}),