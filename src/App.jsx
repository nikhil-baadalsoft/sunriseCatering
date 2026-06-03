import TopBar from './components/Topbar'
import CateringPage from './pages/CateringPage'
import { Routes, Route } from "react-router-dom";
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

import { useEffect } from 'react';
function App() {

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get("sessionId");
    sessionStorage.clear();
    sessionStorage.setItem("sessionId",sessionId)
  }, [])

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<CateringPage/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
      </Routes>

    </>
  )
}

export default App
