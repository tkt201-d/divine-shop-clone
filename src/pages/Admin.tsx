
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from '@/components/admin/ProductList';
import AddProductForm from '@/components/admin/AddProductForm';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  
  if (authLoading || adminLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Đang tải...</span>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-6">Quản lý Sản phẩm</h1>
        <p className="text-muted-foreground mb-8">
          Trang quản trị dành cho admin để quản lý sản phẩm trong cửa hàng.
        </p>
        
        <Separator className="my-6" />
        
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="products">Danh sách Sản phẩm</TabsTrigger>
            <TabsTrigger value="add">Thêm Sản phẩm Mới</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductList />
          </TabsContent>
          
          <TabsContent value="add">
            <AddProductForm />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
