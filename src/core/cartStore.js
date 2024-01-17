export const createCartSlice = (set, get) => ({
  cart: [],

  addToCart: (product) =>
    set(
      (state) => {
        const existingCartItem = state.cart.find(
          (item) => item.id === product.id
        );

        if (existingCartItem) {
          // If the product is already in the cart, update its amount
          existingCartItem.amount += product.amount;
        } else {
          // If the product is not in the cart, add it
          const updatedCart = [...state.cart, product];
          return { cart: updatedCart };
        }
      },
      false,
      "ADD_TO_CART"
    ),

  totalCartQuantity: () => {
    const cart = get().cart;
    if (cart.length === 0) {
      return 0;
    }
    return cart.reduce((accumulator, item) => {
      return accumulator + item.amount;
    }, 0);
  },

  totalCartPrice: () => {
    const cart = get().cart;
    if (cart.length === 0) {
      return 0;
    }
    return cart.reduce((accumulator, item) => {
      return accumulator + item.amount * item.price;
    }, 0);
  },

  clearCart: () =>
    set(
      () => ({
        cart: [],
      }),
      false,
      "CLEAR _CART"
    ),
});
