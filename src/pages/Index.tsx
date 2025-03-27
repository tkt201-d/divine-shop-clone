
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import { ChevronRight, Gift, Award, Tag, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Trust badges section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center justify-center md:justify-start space-x-4 p-6 bg-card rounded-xl border">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                  <Gift size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Instant Delivery</h3>
                  <p className="text-muted-foreground text-sm">Receive your products instantly</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-4 p-6 bg-card rounded-xl border">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                  <Award size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">100% Authentic</h3>
                  <p className="text-muted-foreground text-sm">Guaranteed genuine products</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-4 p-6 bg-card rounded-xl border">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                  <Tag size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Best Prices</h3>
                  <p className="text-muted-foreground text-sm">Competitive pricing guaranteed</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-4 p-6 bg-card rounded-xl border">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                  <CreditCard size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Secure Payments</h3>
                  <p className="text-muted-foreground text-sm">Multiple payment options</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Categories */}
        <Categories />
        
        {/* CTA Banner */}
        <section className="py-16 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-8 md:p-12 shadow-lg text-white">
              <div className="mb-6 md:mb-0 md:max-w-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Join Our Newsletter
                </h2>
                <p className="text-white/90 mb-0 md:mb-6">
                  Subscribe to receive updates, exclusive offers, and discounts directly to your inbox.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-5 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-white/20 min-w-64"
                />
                <Button size="lg" variant="secondary" className="rounded-lg">
                  Subscribe
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
