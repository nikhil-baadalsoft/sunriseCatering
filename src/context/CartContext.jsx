import { useState } from 'react'
import { CartContext } from './cartStore'

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  )
}
