
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { type Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus } from 'lucide-react';
import { toast } from 'sonner';
import EditProductDialog from './EditProductDialog';
import SearchBar from './products/SearchBar';
import ProductTable from './products/ProductTable';
import DeleteConfirmDialog from './products/DeleteConfirmDialog';
import EmptyProductsView from './products/EmptyProductsView';
import LoadingView from './products/LoadingView';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setProducts(data || []);
    } catch (error: any) {
      toast.error('Không thể tải danh sách sản phẩm', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete);
      
      if (error) {
        throw error;
      }
      
      setProducts(products.filter(product => product.id !== productToDelete));
      toast.success('Đã xóa sản phẩm thành công');
    } catch (error: any) {
      toast.error('Không thể xóa sản phẩm', {
        description: error.message,
      });
    } finally {
      setProductToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const confirmDelete = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center mb-6">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        <div className="flex gap-2">
          <Button onClick={fetchProducts} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingView />
      ) : filteredProducts.length > 0 ? (
        <ProductTable 
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={confirmDelete}
        />
      ) : (
        <EmptyProductsView onReset={() => setSearchQuery('')} />
      )}

      {selectedProduct && (
        <EditProductDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          product={selectedProduct}
          onProductUpdated={(updatedProduct) => {
            setProducts(
              products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            );
          }}
        />
      )}

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ProductList;
