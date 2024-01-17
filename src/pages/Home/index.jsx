import { useBoundStore } from "../../core/store.js";
import ProductsList from "../../components/ProductsList";

function Home() {
  const products = useBoundStore((state) => state.products);

  return (
    <div>
      <ProductsList products={products} />
    </div>
  );
}

export default Home;
