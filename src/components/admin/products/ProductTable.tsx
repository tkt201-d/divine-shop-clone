
import React from 'react';
import { type Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Ảnh</TableHead>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead className="text-right">Giá (₫)</TableHead>
            <TableHead className="text-center">Tồn kho</TableHead>
            <TableHead className="text-right w-[100px]">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.image ? (
                  <div className="h-10 w-10 rounded overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded bg-secondary" />
                )}
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category || '-'}</TableCell>
              <TableCell className="text-right">
                {product.price.toLocaleString('vi-VN')}
              </TableCell>
              <TableCell className="text-center">{product.stock}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Sửa</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Xóa</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
