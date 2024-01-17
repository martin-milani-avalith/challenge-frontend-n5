import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import NewProduct from "./pages/NewProduct";
import ShoppingCart from "./pages/ShoppingCart";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </>
  );
}

export default App;
