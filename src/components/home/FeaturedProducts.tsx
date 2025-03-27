
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../ui/ProductCard';

// Sample product data
const featuredProducts = [
  {
    id: 1,
    name: 'Steam Wallet Card',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.8,
    category: 'Gift Cards',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Netflix Premium 1 Month',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.6,
    category: 'Subscriptions'
  },
  {
    id: 3,
    name: 'Microsoft Office 365',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.9,
    category: 'Software',
    badge: 'Sale'
  },
  {
    id: 4,
    name: 'Spotify Premium 3 Months',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.7,
    category: 'Subscriptions'
  }
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our handpicked selection of premium digital products that offer exceptional value.
            </p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0 group">
            View All Products
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="opacity-0 animate-in" 
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
