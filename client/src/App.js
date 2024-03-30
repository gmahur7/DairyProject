import './App.css';
import './Style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import NewVender from './Components/NewVender';
import VenderTable from './Components/VenderTable';
import SetRateFat from './Components/SetRate_Fat';
import MilkEntry from './Components/MilkEntry';
import AdminLogin from './Components/AdminLogin';
import Protected from './Components/Protected';
import VenderDetail from './Components/VenderDetail';
import Payment from './Components/Payment';
import VenderPaymentTable from './Components/VenderPaymentTable';
import VenderAllEntries from './Components/VenderAllEntries';
import OneDayMilkDetail from './Components/OneDayMilkDetail';
import LastDaysDetailChart from './Components/LastDaysDetailChart';
import LastDaysPerVenderData from './Components/LastDaysPerVenderData';
import VenderMain from './Components/VenderMain';
import SellPurchaseHome from './Components/SellPurchase/SellPurchaseHome';
import SellEntry from './Components/SellPurchase/SellEntry';
import PurchaseEntry from './Components/SellPurchase/PurchaseEntry';
import SellTable from './Components/SellPurchase/SellTable';
import PurchaseTable from './Components/SellPurchase/PurchaseTable';
import DetailsChart from './Components/DetailsChart';

function App() {
  return (
      <Routes>
        <Route path='/adminlogin' element={<AdminLogin/>} />
        <Route path='/' element={<Home />} />
        {/* <Route element={<Protected />}> */}
          <Route path='/vender/payments/:id' element={<VenderPaymentTable/>} />
          <Route path='/vender' element={<VenderMain/>} />
          <Route path='/vender/:id' element={<VenderDetail/>} />
          <Route path='/vender/all/:id' element={<VenderAllEntries/>} />
          <Route path='/milkentry' element={<MilkEntry />} />
          <Route path='/payment/:id' element={<Payment />} />
          <Route path='/vendertable' element={<VenderTable />} />
          <Route path='/newvender' element={<NewVender />} />
          <Route path="/details" element={<DetailsChart/>} />
          <Route path='/perdaydetail' element={<OneDayMilkDetail />} />
          <Route path='/updatedetail/:id' element={<SetRateFat />} />
          <Route path='/lastdaysdetailchart' element={<LastDaysDetailChart />} />
          <Route path='/lastdayspervenderdata' element={<LastDaysPerVenderData />} />
          <Route path='/sellpurchase' element={<SellPurchaseHome />} />
          <Route path="/sell/sellentry" element={<SellEntry />} />
          <Route path="/purchase/purchaseentry" element={<PurchaseEntry />} />
          <Route path="/sell/selltable" element={<SellTable />} />
          <Route path="/purchase/purchasetable" element={<PurchaseTable/>} />
        {/* </Route> */}
      </Routes>
  );
}

export default App;
