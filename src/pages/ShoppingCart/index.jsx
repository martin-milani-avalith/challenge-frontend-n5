import { Link, useNavigate } from "react-router-dom";

import PorductCard from "../../components/ProductCard";
import "./shoppingCart-styles.scss";

import Swal from "sweetalert2";
import { useBoundStore } from "../../core/store";

function ShoppingCart() {
  const navigate = useNavigate();
  // const cart = useSelector((state) => state.cartReducer.cart);
  // const totalCartAmount = getCartTotalQuantity(cart);
  // const totalCartPrice = getCartTotalPrice(cart);
  const cart = useBoundStore((state) => state.cart);
  const totalCartQuantity = useBoundStore((state) => state.totalCartQuantity());
  const totalCartPrice = useBoundStore((state) => state.totalCartPrice());
  const clearCart = useBoundStore((state) => state.clearCart);
  const updateProductQuantity = useBoundStore(
    (state) => state.updateProductQuantity
  );

  const handleBuy = () => {
    Swal.fire({
      title: "Desea comprar los productos?",
      text: `TOTAL $: ${totalCartPrice}`,
      showCancelButton: true,
      confirmButtonText: "Comprar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Compra realizada con exito!",
          icon: "success",
        });
        updateProductQuantity(cart);
        clearCart();
        navigate("/");
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Desea vaciar el carrito?",
      text: "Todos los productos seran eliminados",
      showCancelButton: true,
      confirmButtonText: "Vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "El carrito esta vacio",
          text: "Todos los productos fueron eliminados",
          icon: "success",
        });
        clearCart();
        navigate("/");
      }
    });
  };

  const listItems = cart.map((product) => (
    <li key={product.id}>
      <PorductCard product={product} showButtons={false} />
    </li>
  ));

  return (
    <div className="cart-container">
      <div className="cart-title">Carrito de Compras</div>
      {totalCartQuantity === 0 ? (
        <>
          <div className="empty-cart"> El Carrito esta vacio</div>
          <p className="link-to-home">
            <Link to="/">Volver a la pagina de productos</Link>
          </p>
        </>
      ) : (
        <div className="cart-items">
          <ul>{listItems}</ul>
          <div className="cart-actions">
            <button
              onClick={handleBuy}
              className="cart-button"
            >{`Comprar $${totalCartPrice}`}</button>
            <button onClick={handleDelete} className="cart-button">
              Vaciar Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
