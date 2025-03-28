
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyProductsViewProps {
  onReset: () => void;
}

const EmptyProductsView = ({ onReset }: EmptyProductsViewProps) => {
  return (
    <div className="text-center py-10 border rounded-lg bg-muted/20">
      <p className="text-muted-foreground mb-4">Không tìm thấy sản phẩm nào</p>
      <Button variant="outline" onClick={onReset}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Xóa bộ lọc
      </Button>
    </div>
  );
};

export default EmptyProductsView;
