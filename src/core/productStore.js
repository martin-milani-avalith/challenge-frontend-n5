import data from "../../products.json";

export const createProductsSlice = (set) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const storedProducts =
        JSON.parse(localStorage.getItem("store")).state.products || [];

      if (storedProducts.length > 0) {
        set({ products: storedProducts });
      } else {
        set({ products: data.products });
        localStorage.setItem("products", JSON.stringify(data.products));
      }
    } catch (error) {
      console.error("Failed to fetch or load products:", error);
    }
  },

  addNewProduct: (product) =>
    set(
      (state) => ({
        products: [...state.products, product],
      }),
      false,
      "ADD_PRODUCT"
    ),

  updateProductQuantity: (updatedProducts) =>
    set(
      (state) => {
        const newProducts = state.products.map((product) => {
          const updatedProduct = updatedProducts.find(
            (p) => p.id === product.id
          );
          if (updatedProduct) {
            return {
              ...product,
              amount: product.amount - updatedProduct.amount,
            };
          }
          return product;
        });

        return { products: newProducts };
      },
      false,
      "UPDATE_PRODUCT"
    ),
});
