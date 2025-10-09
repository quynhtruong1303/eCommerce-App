import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  category: string;
  brand: string;
  size: string | null;
  color: string | null;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  cart: Product[];
  clearCart: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  cart: [],
  setProducts: (products) => set({ products }),
  addToCart: (product) => set((state) => ({ 
    cart: [...state.cart, product] 
  })),
  removeFromCart: (productId) => set((state) => ({ 
    cart: state.cart.filter((item) => item.id !== productId) 
  })),
  clearCart: () => set({ cart: [] }),
}));
