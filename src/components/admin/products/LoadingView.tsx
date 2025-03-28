
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingViewProps {
  message?: string;
  className?: string;
}

const LoadingView = ({ message = 'Đang tải...', className = '' }: LoadingViewProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <RefreshCw className="h-8 w-8 animate-spin text-primary mb-2" />
      {message && <p className="text-muted-foreground">{message}</p>}
    </div>
  );
};

export default LoadingView;
