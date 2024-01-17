import ProductCard from "../ProductCard";

import { ToastContainer, toast } from "react-toastify";
import "./productsList-styles.scss";

function ProductsList({ products }) {
  const notify = (message, type) => {
    toast(message, { type });
  };

  const listItems = products.map((product) => (
    <li key={product.id}>
      <ProductCard product={product} notify={notify} />
    </li>
  ));

  return (
    <div className="products-container">
      <div className="products-title">Listado de Productos</div>
      <ul className="products-list">{listItems}</ul>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default ProductsList;
