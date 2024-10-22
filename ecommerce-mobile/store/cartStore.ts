import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],
  addProduct: (product: any) =>
    set((state) => ({ items: [...state.items, { product, quantity: 1 }] })),
  removeFromCart: (item) => {},
  resetCart: () => set({ items: [] }),
}));
