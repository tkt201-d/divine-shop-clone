
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Gamepad2, Film, Music, BarChart, Layers, Zap, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample categories data
const categories = [
  {
    id: 1,
    name: 'Gift Cards',
    description: 'Digital gift cards for your favorite platforms',
    icon: Gift,
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    products: 56
  },
  {
    id: 2,
    name: 'Games',
    description: 'Premium games for PC, Console, and Mobile',
    icon: Gamepad2,
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    products: 124
  },
  {
    id: 3,
    name: 'Streaming',
    description: 'Subscription packages for top streaming services',
    icon: Film,
    color: 'bg-red-50 text-red-600 border-red-100',
    products: 43
  },
  {
    id: 4,
    name: 'Music',
    description: 'Premium music subscriptions and content',
    icon: Music,
    color: 'bg-green-50 text-green-600 border-green-100',
    products: 32
  },
  {
    id: 5,
    name: 'Business',
    description: 'Software solutions for productivity and business',
    icon: BarChart,
    color: 'bg-orange-50 text-orange-600 border-orange-100',
    products: 87
  },
  {
    id: 6,
    name: 'Software',
    description: 'Premium software for design, development and more',
    icon: Layers,
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    products: 76
  },
  {
    id: 7,
    name: 'VPN Services',
    description: 'Secure VPN solutions for privacy and security',
    icon: Zap,
    color: 'bg-teal-50 text-teal-600 border-teal-100',
    products: 29
  },
  {
    id: 8,
    name: 'Offers',
    description: 'Special deals and limited-time offers',
    icon: ShoppingBag,
    color: 'bg-pink-50 text-pink-600 border-pink-100',
    products: 18,
    highlight: true
  }
];

const Categories: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Browse Categories</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our extensive range of digital products across multiple categories
            </p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0 group">
            All Categories
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              to={`/categories/${category.id}`}
              key={category.id}
              className={`group relative rounded-xl border p-6 ${category.highlight ? 'ring-2 ring-primary' : ''} hover:shadow-md transition-all duration-300 ${category.color} opacity-0 animate-in`}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon size={24} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {category.products} Products
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              
              <div className="flex items-center text-sm font-medium text-primary">
                Browse Category
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
              
              {category.highlight && (
                <div className="absolute -top-3 -right-2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Popular
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
