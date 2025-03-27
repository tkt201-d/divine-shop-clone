
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-primary inline-block">
              Divine<span className="text-foreground">Shop</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Premium digital products marketplace with a curated selection of games, software, and digital services.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Special Deals
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground text-sm">123 Digital Avenue, Tech City, TC 10111</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-muted-foreground" />
                <a href="tel:+11234567890" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-muted-foreground" />
                <a href="mailto:support@divineshop.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  support@divineshop.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DivineShop. All rights reserved.
          </p>
          <div className="flex items-center space-x-5 mt-4 md:mt-0">
            <img src="https://via.placeholder.com/40x20" alt="Visa" className="h-5 opacity-70" />
            <img src="https://via.placeholder.com/40x20" alt="Mastercard" className="h-5 opacity-70" />
            <img src="https://via.placeholder.com/40x20" alt="PayPal" className="h-5 opacity-70" />
            <img src="https://via.placeholder.com/40x20" alt="Apple Pay" className="h-5 opacity-70" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
