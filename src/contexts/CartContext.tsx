import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CartItem as CartItemType } from '@/types/product';

interface CartContextType {
  items: CartItemType[];
  addItem: (product: CartItemType) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage', error);
    }
  }, []);
  
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage', error);
    }
  }, [items]);
  
  const addItem = (product: CartItemType) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.success('Số lượng sản phẩm đã được cập nhật');
        return currentItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        toast.success('Sản phẩm đã được thêm vào giỏ hàng');
        return [...currentItems, product];
      }
    });
  };
  
  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
    toast.success('Sản phẩm đã được xóa khỏi giỏ hàng');
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast.success('Giỏ hàng đã được xóa');
  };
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart, 
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
