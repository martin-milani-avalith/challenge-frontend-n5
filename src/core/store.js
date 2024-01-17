import { create } from "zustand";
import { createProductsSlice } from "./productStore";
import { createCartSlice } from "./cartStore.js";
import { persist, devtools } from "zustand/middleware";

export const useBoundStore = create(
  persist(
    devtools((...a) => ({
      ...createProductsSlice(...a),
      ...createCartSlice(...a),
    })),
    { name: "store" }
  )
);
