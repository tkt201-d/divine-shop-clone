
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type CartItem as CartItemType } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b">
      {/* Product image */}
      <div className="h-20 w-20 rounded-md border overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Product info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.category}</p>
        <div className="mt-1 font-semibold">${item.price.toFixed(2)}</div>
      </div>
      
      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-8 text-center">{item.quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleIncrement}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Item total */}
      <div className="font-semibold text-right min-w-[80px]">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      
      {/* Remove button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-destructive hover:text-destructive h-8 w-8"
        onClick={() => removeItem(item.id)}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Xóa sản phẩm</span>
      </Button>
    </div>
  );
};

export default CartItem;
