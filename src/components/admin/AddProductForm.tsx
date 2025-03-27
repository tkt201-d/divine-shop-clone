
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
import { ProductFormData } from '@/types/product';

const formSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Giá không được âm'),
  original_price: z.coerce.number().min(0, 'Giá gốc không được âm').optional(),
  image: z.string().url('URL hình ảnh không hợp lệ').optional(),
  category: z.string().min(1, 'Danh mục là bắt buộc'),
  badge: z.string().optional(),
  rating: z.coerce.number().min(0, 'Đánh giá không được âm').max(5, 'Đánh giá tối đa là 5').optional(),
  stock: z.coerce.number().min(0, 'Số lượng không được âm').default(0),
});

const AddProductForm = () => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      original_price: undefined,
      image: '',
      category: '',
      badge: '',
      rating: undefined,
      stock: 0,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .insert([data])
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success('Thêm sản phẩm thành công', {
        description: `Đã thêm "${data.name}" vào cơ sở dữ liệu.`,
      });
      
      form.reset();
    } catch (error: any) {
      toast.error('Không thể thêm sản phẩm', {
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên sản phẩm..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <FormDescription>Đặt giá gốc nếu sản phẩm đang giảm giá</FormDescription>
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
                <Input placeholder="Danh mục sản phẩm..." {...field} />
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
                <Textarea
                  placeholder="Mô tả chi tiết sản phẩm..."
                  className="min-h-[120px]"
                  {...field}
                />
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
              <FormLabel>URL Hình ảnh</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>Nhập URL hình ảnh hợp lệ</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <Input placeholder="New / Sale / Best Seller" {...field} />
                </FormControl>
                <FormDescription>Thẻ hiển thị trên sản phẩm</FormDescription>
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
        
        <Button type="submit" className="mr-4">
          Thêm sản phẩm
        </Button>
        
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Xóa form
        </Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
