
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../ui/ProductCard';
import { fetchFeaturedProducts } from '@/services/productService';
import { Product } from '@/types/product';
import { Link } from 'react-router-dom';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const featuredProducts = await fetchFeaturedProducts();
      setProducts(featuredProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Sản phẩm nổi bật</h2>
            <p className="text-muted-foreground max-w-2xl">
              Khám phá bộ sưu tập sản phẩm số chất lượng cao được chúng tôi lựa chọn kỹ lưỡng.
            </p>
          </div>
          <Link to="/products">
            <Button variant="ghost" className="mt-4 md:mt-0 group">
              Xem tất cả sản phẩm
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="rounded-lg border border-border bg-card animate-pulse h-[300px]"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="opacity-0 animate-in" 
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Chưa có sản phẩm nào. Vui lòng thêm sản phẩm trong trang quản trị.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
