
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Product, ProductFormData } from '@/types/product';
import { uploadProductImage } from '@/services/productService';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Giá không được âm'),
  original_price: z.coerce.number().min(0, 'Giá gốc không được âm').optional(),
  image: z.string().url('URL hình ảnh không hợp lệ').optional().or(z.literal('')),
  category: z.string().min(1, 'Danh mục là bắt buộc'),
  badge: z.string().optional(),
  rating: z.coerce.number().min(0, 'Đánh giá không được âm').max(5, 'Đánh giá tối đa là 5').optional(),
  stock: z.coerce.number().min(0, 'Số lượng không được âm').default(0),
});

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onProductUpdated: (product: Product) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  open,
  onOpenChange,
  product,
  onProductUpdated,
}) => {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(product.image || null);
  
  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description || '',
      price: product.price,
      original_price: product.original_price,
      image: product.image || '',
      category: product.category || '',
      badge: product.badge || '',
      rating: product.rating,
      stock: product.stock,
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (!files || files.length === 0) {
      return;
    }
    
    const file = files[0];
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước file quá lớn', {
        description: 'Hình ảnh không được vượt quá 5MB',
      });
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Loại file không hợp lệ', {
        description: 'Chỉ chấp nhận file hình ảnh',
      });
      return;
    }
    
    try {
      setUploading(true);
      
      // Create a preview
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      
      // Upload to Supabase Storage
      const imageUrl = await uploadProductImage(file);
      
      if (imageUrl) {
        form.setValue('image', imageUrl);
        toast.success('Tải ảnh lên thành công');
      } else {
        toast.error('Không thể tải ảnh lên');
      }
    } catch (error: any) {
      toast.error('Lỗi khi tải ảnh lên', {
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const { data: updatedProduct, error } = await supabase
        .from('products')
        .update(data)
        .eq('id', product.id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success('Cập nhật sản phẩm thành công', {
        description: `Đã cập nhật "${data.name}".`,
      });
      
      onProductUpdated(updatedProduct as Product);
      onOpenChange(false);
    } catch (error: any) {
      toast.error('Không thể cập nhật sản phẩm', {
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin sản phẩm "{product.name}"
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá (VNĐ)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="original_price"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Giá gốc (VNĐ)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        value={value === undefined ? '' : value}
                        onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình ảnh sản phẩm</FormLabel>
                  <div className="space-y-4">
                    <div className="border rounded-md p-2">
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mb-2"
                      />
                      
                      {field.value && (
                        <Input 
                          type="text"
                          value={field.value}
                          onChange={field.onChange}
                          className="mt-2"
                          disabled
                        />
                      )}
                      
                      {uploading && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">Đang tải ảnh lên...</span>
                        </div>
                      )}
                    </div>
                    
                    {(imagePreview || field.value) && (
                      <div className="mt-2 border rounded-md overflow-hidden h-36 w-full">
                        <img 
                          src={imagePreview || field.value} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng tồn kho</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="badge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Badge</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rating"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Đánh giá (0-5)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="5" 
                        step="0.1"
                        value={value === undefined ? '' : value}
                        onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
