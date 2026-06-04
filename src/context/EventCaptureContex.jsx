import { useCallback } from "react";
import axios from "axios";
import { EventCaptureContext } from "./eventCaptureStore";

const EVENT_COUNTER_KEY = "EVENT_COUNTER";
const EVENT_MAP_KEY = "EVENT_MAP";


export const EventCaptureProvider = ({ children }) => {
  const getBrowser = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Edg")) return "EDGE";
    if (userAgent.includes("Chrome")) return "CHROME";
    if (userAgent.includes("Firefox")) return "FIREFOX";
    if (userAgent.includes("Safari")) return "SAFARI";
    return "UNKNOWN";
  };

  const getOperatingSystem = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Windows")) return "WINDOWS";
    if (userAgent.includes("Mac")) return "MACOS";
    if (userAgent.includes("Android")) return "ANDROID";
    if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "IOS";
    if (userAgent.includes("Linux")) return "LINUX";
    return "UNKNOWN";
  };

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    if (/mobile/i.test(userAgent)) return "MOBILE";
    if (/tablet|ipad/i.test(userAgent)) return "TABLET";
    return "DESKTOP";
  };

  const getCurrentPage = () =>
    window.location.pathname === "/"
      ? "HOME"
      : window.location.pathname === "/cart"
      ? "CART"
      : window.location.pathname === "/checkout"
      ? "CHECKOUT"
      : window.location.pathname === "/order-success"
      ? "ORDER_SUCCESS"
      : "OTHER";

  const resetEventSequence = useCallback(() => {
    sessionStorage.removeItem(EVENT_MAP_KEY);
    sessionStorage.setItem(EVENT_COUNTER_KEY, "1");
  }, []);

  const getNextEventSequence = (eventName) => {
    let savedEventMap;

    try {
      savedEventMap = JSON.parse(sessionStorage.getItem(EVENT_MAP_KEY)) || {};
    } catch {
      savedEventMap = {};
    }

    if (savedEventMap[eventName] !== undefined) {
      return savedEventMap[eventName];
    }

    const currentCounter = Number(sessionStorage.getItem(EVENT_COUNTER_KEY)) || 1;
    savedEventMap[eventName] = currentCounter;

    sessionStorage.setItem(EVENT_MAP_KEY, JSON.stringify(savedEventMap));
    sessionStorage.setItem(EVENT_COUNTER_KEY, String(currentCounter + 1));

    return currentCounter;
  };

  const captureEvent = useCallback(async (eventname) => {
    try {
      const queryParams = new URLSearchParams(window.location.search);

      let sessionId = sessionStorage.getItem("sessionId");

      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem("sessionId", sessionId);
      }

      const eventSequence = getNextEventSequence(eventname);

      const payload = {
        eventName: eventname,
        eventSequence,
        eventTimestamp: new Date().toISOString(),
        sessionId,
        page: getCurrentPage(),
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
          url: encodeURIComponent(window.location.href),
          referrer: encodeURIComponent(document.title),
        },
      };

      console.log("EVENT PAYLOAD =>", payload);
      await axios.post(
        "https://app-customerevents-southindia-bud0d7e9a5akhuep.southindia-01.azurewebsites.net/api/v1/Events",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <EventCaptureContext.Provider value={{ captureEvent, resetEventSequence }}>
      {children}
    </EventCaptureContext.Provider>
  );
};
