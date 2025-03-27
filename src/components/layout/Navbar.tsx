
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
        ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-3' 
        : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary transition-opacity hover:opacity-80"
          >
            Divine<span className="text-foreground">Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="font-medium text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/categories" className="font-medium text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/deals" className="font-medium text-foreground hover:text-primary transition-colors">
              Deals
            </Link>
            <Link to="/about" className="font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className={`relative ${searchVisible ? 'block' : 'hidden md:block'}`}>
              <Input
                type="search"
                placeholder="Search..."
                className={`w-full md:w-40 lg:w-64 py-1 pl-3 pr-8 rounded-full transition-all ${
                  searchVisible 
                  ? 'animate-slide-in opacity-100' 
                  : 'opacity-100'
                }`}
              />
              <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
            
            <button 
              onClick={toggleSearch}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle search"
            >
              {searchVisible ? <X size={20} /> : <Search size={20} />}
            </button>
            
            <Link to="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors">
              <ShoppingCart size={20} className="text-foreground" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </Link>
            
            <Link to="/account" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors">
              <User size={20} className="text-foreground" />
            </Link>
            
            <Button 
              className="hidden md:inline-flex"
              size="sm"
            >
              Sign In
            </Button>
            
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 bg-background z-40 md:hidden transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '65px' }}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <nav className="flex flex-col space-y-6 text-lg">
            <Link 
              to="/" 
              className="font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-muted"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-muted"
              onClick={toggleMobileMenu}
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-muted"
              onClick={toggleMobileMenu}
            >
              Categories
            </Link>
            <Link 
              to="/deals" 
              className="font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-muted"
              onClick={toggleMobileMenu}
            >
              Deals
            </Link>
            <Link 
              to="/about" 
              className="font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-muted"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
          </nav>
          
          <div className="mt-auto flex flex-col space-y-4 py-4">
            <Link 
              to="/account" 
              className="font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              My Account
            </Link>
            <Button 
              onClick={toggleMobileMenu}
              className="w-full"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
