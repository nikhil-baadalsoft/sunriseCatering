import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { BrowserRouter } from "react-router-dom";
import { EventCaptureProvider } from "./context/EventCaptureContex"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <CartProvider>
          <EventCaptureProvider>
            <App />
          </EventCaptureProvider>
        </CartProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
