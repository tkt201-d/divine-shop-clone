
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { UserMenu } from "./UserMenu";
import { useMobile } from "@/hooks/use-mobile";

const Navbar = ({ className }: { className?: string }) => {
  const isMobile = useMobile();

  return (
    <header className={cn("w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and brand */}
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-semibold hover:text-primary">
                  Trang chủ
                </Link>
                <Link to="/products" className="text-lg font-semibold hover:text-primary">
                  Sản phẩm
                </Link>
                <Link to="/categories" className="text-lg font-semibold hover:text-primary">
                  Danh mục
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Divine</span>
            <span className="bg-primary rounded-md text-primary-foreground px-1.5 py-0.5 text-xs font-medium">Store</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-base">
          <Link to="/" className="font-medium hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <Link to="/products" className="font-medium hover:text-primary transition-colors">
            Sản phẩm
          </Link>
          <Link to="/categories" className="font-medium hover:text-primary transition-colors">
            Danh mục
          </Link>
        </nav>

        {/* Search and cart */}
        <div className="flex items-center gap-2">
          <div className="relative hidden lg:flex items-center">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Tìm kiếm..." 
              className="pl-9 w-[200px] bg-muted" 
            />
          </div>
          
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">View Cart</span>
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
