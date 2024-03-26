import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ data, type }) => {

  useEffect(()=>{
    if(data.length === 0) return;
    if(!type){
      alert("Please Select Chart Type")
      return;
    }
  },[type,data])

  const formattedData = data.reduce((acc, entry) => {
    const existingEntry = acc.find(item => item.date === entry.DateDetail);

    if (existingEntry) {
      existingEntry.shifts[entry.Shift] = {
        fat: entry.Fat,
        quantity: entry.Quantity,
        netAmount: entry.NetAmount,
      };
    } else {
      acc.push({
        date: entry.DateDetail,
        shifts: {
          [entry.Shift]: {
            fat: entry.Fat,
            quantity: entry.Quantity,
            netAmount: entry.NetAmount,
          },
        },
      });
    }

    return acc;
  }, []);

  return (
    <BarChart
      width={1000}
      height={400}
      data={formattedData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {type === 'Fat' &&
        <>
          <Bar dataKey="shifts.M.fat" stackId="a" fill="#8884d8" name="Morning Fat" />
          <Bar dataKey="shifts.E.fat" stackId="b" fill="#ff7300" name="Evening Fat" />
        </>}
      {type === 'Quantity' &&
      <>
      <Bar dataKey="shifts.M.quantity" stackId="a" fill="#82ca9d" name="Morning Quantity" />
      <Bar dataKey="shifts.E.quantity" stackId="b" fill="#a890d3" name="Evening Quantity" />
      </>}
      {type === 'Amount' &&
      <>
      <Bar dataKey="shifts.M.netAmount" stackId="a" fill="#ffc658" name="Morning Net Amount" />
      <Bar dataKey="shifts.E.netAmount" stackId="b" fill="#4bd6b8" name="Evening Net Amount" />
      </>}
    </BarChart>
  );
};

export default BarChartComponent;