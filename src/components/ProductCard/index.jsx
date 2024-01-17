import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addCartItem, updateCartItem } from "../../core/cart/actions";

import "react-toastify/dist/ReactToastify.css";
import "./productCard-styles.scss";

import { FiPlus, FiMinus } from "react-icons/fi";
import { useBoundStore } from "../../core/store";

function PorductCard({ product, showButtons, notify }) {
  const [quantity, setQuantity] = useState(1);
  const cart = useBoundStore((state) => state.cart);
  const addToCart = useBoundStore((state) => state.addToCart);

  const handleIncrement = () => {
    if (quantity < product.amount) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getProductIndex = () => {
    const index = cart.findIndex((item) => item.id === product.id);
    return index;
  };

  const outOfStock = (index) => {
    return cart[index].amount + quantity > product.amount;
  };

  const handleAddToCart = () => {
    const newItem = {
      name: product.name,
      price: product.price,
      amount: quantity,
      id: product.id,
    };
    const index = getProductIndex();

    if (index <= 0) {
      addToCart(newItem);
      notify("Producto agregado al carrito", "success");
    } else {
      outOfStock(index);
      notify("Stock insuficiente", "error");
    }
  };

  return (
    <div className="card-container">
      <div>
        <h3 className="card-title">{product.name}</h3>
        <div className="card-text">
          <p className="card-stock">
            {showButtons ? <span>Stock: </span> : <span>Cant.: </span>}
            {product.amount}
          </p>
          <h4 className="card-price">${product.price}</h4>
        </div>
      </div>
      {showButtons && (
        <div className="card-actions">
          <div className="card-action-container">
            <div className="card-quantity">
              <button
                onClick={handleIncrement}
                aria-label="+"
                data-testid="card-button-inc"
                className="card-button-quantity"
              >
                <FiPlus />
              </button>
              <p data-testid="card-button-quantity">{quantity}</p>
              <button
                onClick={handleDecrement}
                aria-label="-"
                data-testid="card-button-dec"
                className="card-button-quantity"
              >
                <FiMinus />
              </button>
            </div>
            <div className="card-button-container">
              <button
                onClick={handleAddToCart}
                className={`card-button ${
                  product.amount === 0 ? "disabled" : null
                }`}
                disabled={product.amount === 0}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

PorductCard.defaultProps = {
  showButtons: true,
};

export default PorductCard;
