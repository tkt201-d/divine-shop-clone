
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="relative w-full sm:w-96">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Tìm kiếm sản phẩm..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8 w-full"
      />
    </div>
  );
};

export default SearchBar;
