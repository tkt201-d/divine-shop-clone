
import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingView = () => {
  return (
    <div className="flex justify-center py-8">
      <RefreshCw className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default LoadingView;
