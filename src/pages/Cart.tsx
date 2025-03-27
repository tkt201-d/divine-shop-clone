
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

const Cart = () => {
  const { items, clearCart, subtotal, totalItems } = useCart();
  const isMobile = useIsMobile();
  
  const shippingCost = subtotal > 0 ? 10 : 0;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container max-w-6xl py-12 px-4">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Giỏ hàng</h1>
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Giỏ hàng của bạn đang trống</h2>
            <p className="text-muted-foreground mb-6">Bắt đầu mua sắm để thêm sản phẩm vào giỏ hàng</p>
            <Button asChild>
              <Link to="/products">Xem sản phẩm</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const CartSummary = () => (
    <Card>
      <CardHeader>
        <CardTitle>Tổng cộng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tạm tính</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Phí vận chuyển</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="border-t pt-4 flex justify-between font-semibold">
          <span>Tổng cộng</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">
          Thanh toán <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        <Button 
          variant="outline" 
          className="w-full text-destructive hover:text-destructive"
          onClick={clearCart}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Xóa giỏ hàng
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container max-w-6xl py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Giỏ hàng ({totalItems})</h1>
          
          {isMobile && (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Tổng cộng</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Tổng cộng</DrawerTitle>
                </DrawerHeader>
                <div className="px-4">
                  <CartSummary />
                </div>
                <DrawerFooter className="pt-2" />
              </DrawerContent>
            </Drawer>
          )}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="md:col-span-2 space-y-1">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          {/* Order summary */}
          <div className="hidden md:block">
            <CartSummary />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
