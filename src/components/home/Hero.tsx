
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              Premium Digital Products
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
              Digital Products <br className="hidden md:block" />
              <span className="text-primary">Delivered Instantly</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-8">
              Discover a curated collection of premium digital products, games, and software with instant delivery and guaranteed authenticity.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-6">
                Shop Now
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-6">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end animate-slide-in-right">
            <div className="relative w-full max-w-lg aspect-[4/3]">
              {/* Main hero image with parallax effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 rounded-2xl -rotate-2 transform animate-float"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80" 
                alt="Digital Store" 
                className="relative z-10 rounded-2xl shadow-xl object-cover w-full h-full"
              />
              
              {/* Floating elements */}
              <div className="absolute -bottom-10 -left-10 glass rounded-xl p-4 shadow-lg z-20 animate-float" style={{animationDelay: "0.5s"}}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-medium">Instant Delivery</p>
                    <p className="text-xs text-muted-foreground">Products in seconds</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-8 -right-8 glass rounded-xl p-4 shadow-lg z-20 animate-float" style={{animationDelay: "0.8s"}}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    🔒
                  </div>
                  <div>
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">100% Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
