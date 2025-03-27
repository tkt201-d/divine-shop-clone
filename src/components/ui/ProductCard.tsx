
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <div className="group relative bg-card rounded-xl border overflow-hidden transition-all duration-300 card-hover">
      {/* Product badge */}
      {product.badge && (
        <Badge 
          className={`absolute top-3 left-3 z-10 ${
            product.badge === 'Sale' 
              ? 'bg-red-500' 
              : product.badge === 'Best Seller' 
                ? 'bg-amber-500' 
                : 'bg-blue-500'
          }`}
        >
          {product.badge}
        </Badge>
      )}
      
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="rounded-full"
              aria-label="Add to cart"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-2" />
              Thêm vào giỏ
            </Button>
            <Button 
              size="icon" 
              variant="secondary"
              className="rounded-full"
              aria-label="Add to wishlist"
            >
              <Heart size={16} className="text-muted-foreground" />
            </Button>
          </div>
        </div>
        
        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link 
            to={`/products/${product.id}`}
            className="text-sm text-muted-foreground hover:text-muted-foreground/80 transition-colors"
          >
            {product.category}
          </Link>
          
          <div className="flex items-center">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-lg mt-2 mb-3 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-muted-foreground line-through ml-2 text-sm">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full hover:bg-primary hover:text-primary-foreground p-0 w-8 h-8"
            aria-label="Quick add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
