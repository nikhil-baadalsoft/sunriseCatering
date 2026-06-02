import TopBar from './components/Topbar'
import CateringPage from './pages/CateringPage'
import { Routes, Route } from "react-router-dom";
import CartPage from './pages/CartPage';
function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={ <CateringPage />}/>
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
     
    </>
  )
}

export default App
