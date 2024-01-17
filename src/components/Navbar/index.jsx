import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useBoundStore } from "../../core/store";
import DarkModeToggle from "../DarkModeToggle";

import { FiHome, FiShoppingCart, FiPlusSquare } from "react-icons/fi";
import "./navbar-styles.scss";

function NavBar() {
  const totalQuantity = useBoundStore((state) => state.totalCartQuantity());
  const totalPrice = useBoundStore((state) => state.totalCartPrice());
  const fetchProducts = useBoundStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="nav-container">
      <div className="nav-left">
        <Link to="/" className="nav-link">
          <FiHome />
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/new-product" className="nav-link">
          <FiPlusSquare className="link-item" />
          <span className="link-item">Producto</span>
        </Link>
        <Link to="/shopping-cart" className="nav-link">
          <FiShoppingCart className="link-item" />
          <span className="link-item">{`(${totalQuantity}) $${totalPrice}`}</span>
        </Link>
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default NavBar;
