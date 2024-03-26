import React, { useEffect, useState } from 'react';
import { AdminState } from '../Context/ContextApi';
import Api_Url from '../env';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const OneDayMilkDetail = () => {
  const { token } = AdminState();
  const [data, setData] = useState('');
  const [date, setDate] = useState('');
  const [displayChart, setDisplayChart] = useState(false)
  const [fetchError, setFetchError] = useState();

  const getData = async (date) => {
    if (date) {
      try {
        let result = await fetch(`${Api_Url}/api/perday/`, {
          method: 'post',
          body: JSON.stringify({ date }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        result = await result.json();
        console.log(result)
        if (!result.msg) {
          setData(result);
          setFetchError(false)
        } else {
          setData({});
          throw new Error(result.msg);
        }
      } catch (error) {
        setFetchError(error.message);
      }
    }
  };

  useEffect(() => { }, [token]);

  const getVendorQuantities = () => {
    const vendorQuantities = {};
    data.MilkDetails?.forEach((detail) => {
      const { Vender, Shift, Quantity } = detail;
      const vendorName = Vender.Name;

      if (!vendorQuantities[vendorName]) {
        vendorQuantities[vendorName] = { M: 0, E: 0 };
      }
      vendorQuantities[vendorName][Shift] += Quantity;
      
    });

    return Object.entries(vendorQuantities).map(([vendor, quantities]) => ({
      vendor,
      quantity: quantities.M + quantities.E,
      morningQuantity: quantities.M,
      eveningQuantity: quantities.E,

    }));
  };

  const chartData = {
    labels: getVendorQuantities().map((vendorData) => vendorData.vendor),
    datasets: [
      {
        label: 'Total Quantity',
        data: getVendorQuantities().map((vendorData) => vendorData.quantity),
        backgroundColor: 'rgba(35, 1, 178, 0.2)',
        borderColor: 'rgba(35, 1, 178, 1)',
        borderWidth: 1,
        barThickness: 30, // Set the thickness of each bar
        hoverBackgroundColor: 'rgba(134, 192, 192, 0.5)',
      },
      {
        label: 'Morning Quantity',
        data: getVendorQuantities().map((vendorData) => vendorData.morningQuantity),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 30,
      },
      {
        label: 'Evening Quantity',
        data: getVendorQuantities().map((vendorData) => vendorData.eveningQuantity),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  return (
    <div>
      <h2>One Day Detail:</h2>
      <div>
        <span>Select Date : </span>
        <input type='date' onChange={e => setDate(e.target.value)} />
        <button onClick={() => getData(date)}>Get Data</button>
      </div>
      <div>
        <div>Date: {data.Date}</div>
        {data.Shift && <div>Shift: {data.Shift}</div>}
        <div>TotalQuantity: {data.TotalQuantity}</div>
        <div>TotalAmount: {data.TotalAmount}</div>
      </div>
      <div>
        {data && <button onClick={() => displayChart ? setDisplayChart(false) : setDisplayChart(true)}>{displayChart ? 'Remove Chart' : 'Generate Chart'}</button>}
      </div>
      {fetchError && <p>Error: Data Not Found</p>}
      {data && displayChart&&
        <div style={{ width: '600px', height: '400px' }}>
          <Bar data={chartData} />
        </div>
      }
    </div>
  );
};

export default OneDayMilkDetail;