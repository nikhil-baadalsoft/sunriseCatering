import TopBar from './components/Topbar'
import CateringPage from './pages/CateringPage'
import { Routes, Route } from "react-router-dom";
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import { useRef } from 'react';
import { useEffect, useContext } from 'react';
import { EventCaptureContext } from './context/eventCaptureStore'

function App() {
  const { captureEvent, resetEventSequence } = useContext(EventCaptureContext)
  const hasTrackedLaunch = useRef(false);

  useEffect(() => {
    if (hasTrackedLaunch.current) return;

    hasTrackedLaunch.current = true;
    resetEventSequence();
    captureEvent("CATERING_SITE_LAUNCHED");
  }, [captureEvent, resetEventSequence])

  const hasTrackedExit = useRef(false);

  useEffect(() => {
    const handleExit = () => {
      if (hasTrackedExit.current) return;

      hasTrackedExit.current = true;
      captureEvent("EXIT_PAGE");
    };

    window.addEventListener("pagehide", handleExit);
    window.addEventListener("beforeunload", handleExit);

    return () => {
      window.removeEventListener("pagehide", handleExit);
      window.removeEventListener("beforeunload", handleExit);
    };
  }, [captureEvent]);

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<CateringPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
      </Routes>

    </>
  )
}

export default App
