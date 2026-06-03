import TopBar from './components/Topbar'
import CateringPage from './pages/CateringPage'
import { Routes, Route } from "react-router-dom";
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import { useRef } from 'react';
import { useEffect } from 'react';
function App() {
const EVENT_MAP_KEY = "EVENT_MAP";
const EVENT_COUNTER_KEY = "EVENT_COUNTER";

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get("sessionId");
    sessionStorage.clear();
    sessionStorage.setItem("sessionId",sessionId)
  }, [])

  const currentPageRef = useRef(window.location.pathname);
  const hasTrackedExit = useRef(false);

  useEffect(() => {
    currentPageRef.current = window.location.pathname;
  });

  const trackExit = (targetPage) => {
    let savedEventMap = {};

    try {
      savedEventMap =
        JSON.parse(sessionStorage.getItem(EVENT_MAP_KEY)) || {};
    } catch {
      savedEventMap = {};
    }

    let currentCounter =
      Number(sessionStorage.getItem(EVENT_COUNTER_KEY)) || 4;

    let eventSequence;

    if (savedEventMap["EXIT_PAGE"] !== undefined) {
      eventSequence = savedEventMap["EXIT_PAGE"];
    } else {
      eventSequence = currentCounter;
      savedEventMap["EXIT_PAGE"] = eventSequence;
      currentCounter++;

      try {
        sessionStorage.setItem(
          EVENT_MAP_KEY,
          JSON.stringify(savedEventMap)
        );
        sessionStorage.setItem(
          EVENT_COUNTER_KEY,
          currentCounter.toString()
        );
      } catch {}
    }

    const payload = {
      eventName: "EXIT_PAGE",
      page: targetPage,
      eventSequence,
      eventTimestamp: new Date().toISOString(),
      customerId: "",
      sessionId,
      device: {
        browser: getBrowser(),
        operatingSystem: getOperatingSystem(),
        deviceType: getDeviceType(),
      },
      market: {
        utmSource: queryParams.get("utm_source") || "DIRECT",
        campaign: queryParams.get("utm_campaign") || "UNKNOWN",
      },
      referrer: {
        url: window.location.href,
        referrer: document.referrer || "DIRECT",
      },
    };

    navigator.sendBeacon(
      "https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/Events",
      new Blob([JSON.stringify(payload)], {
        type: "application/json",
      })
    );
  };

  useEffect(() => {
    const handleExit = () => {
      if (hasTrackedExit.current) return;

      hasTrackedExit.current = true;
      trackExit(currentPageRef.current);
    };

    window.addEventListener("pagehide", handleExit);
    window.addEventListener("beforeunload", handleExit);

    return () => {
      window.removeEventListener("pagehide", handleExit);
      window.removeEventListener("beforeunload", handleExit);
    };
  }, []);

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
