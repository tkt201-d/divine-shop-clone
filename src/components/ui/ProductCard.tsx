
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Product, CartItem } from '@/types/product';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || 'https://placehold.co/600x400?text=No+Image', 
      category: product.category || 'Uncategorized'
    };
    
    addItem(cartItem);
    
    toast.success('Đã thêm vào giỏ hàng', {
      description: product.name,
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden bg-muted">
        {product.badge && (
          <Badge className="absolute top-2 right-2 z-10">{product.badge}</Badge>
        )}
        <img
          src={product.image || 'https://placehold.co/600x400?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-1">{product.category || 'Uncategorized'}</div>
        <h3 className="font-semibold truncate" title={product.name}>{product.name}</h3>
        
        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm">{product.rating}</span>
          </div>
        )}
        
        <div className="flex items-center mt-2">
          <span className="font-bold">{product.price.toLocaleString('vi-VN')}₫</span>
          {product.original_price && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              {product.original_price.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          variant="secondary"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
