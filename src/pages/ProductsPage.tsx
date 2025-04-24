import React, { useState, useEffect } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { useProducts } from '../hooks/useWooCommerceData';
import { Product } from '../types';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/ui/Button';

const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Fetch products with the correct page size
  const { products, loading, totalPages, total } = useProducts(
    searchQuery.trim() === '' ? currentPage : 1,  // If searching, always get first page
    12
  );
  
  // Filtered products (for search)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredTotalPages, setFilteredTotalPages] = useState<number>(1);
  
  // Apply search filter and calculate pagination
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
      setFilteredTotalPages(totalPages);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredPages = Math.ceil(filtered.length / 12);
      
      // Paginate filtered results
      const start = (currentPage - 1) * 12;
      const end = start + 12;
      setFilteredProducts(filtered.slice(start, end));
      setFilteredTotalPages(filteredPages);
    }
  }, [products, searchQuery, currentPage, total, totalPages]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Use filtered or original values based on search state
  const displayedProducts = searchQuery.trim() === '' ? products : filteredProducts;
  const displayedTotalPages = searchQuery.trim() === '' ? totalPages : filteredTotalPages;
  
  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="relative bg-primary-600/90 dark:bg-primary-900/90 text-white py-12 md:py-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt=""
            className="w-full h-full object-cover mix-blend-multiply opacity-50"
          />
        </div>
        
        {/* Header Content */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Shop</h1>
          <p className="text-white/90 text-lg max-w-3xl">
            Browse our collection of premium products designed for the modern web.
          </p>
        </div>
      </div>
      
      {/* Controls Bar */}
      <div className="bg-white dark:bg-neutral-900 shadow-sm border-b border-neutral-200 dark:border-neutral-800 sticky top-16 md:top-20 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* View Mode Toggles */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${
                  viewMode === 'grid' 
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                    : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${
                  viewMode === 'list' 
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                    : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
            
            {/* Search */}
            <form onSubmit={handleSearch} className="relative max-w-xs w-full md:max-w-sm">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500 dark:text-neutral-400"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="bg-neutral-50 dark:bg-neutral-950 py-12">
        <div className="container mx-auto px-4">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
                  <div className={`${viewMode === 'grid' ? 'aspect-square' : 'h-48'} bg-neutral-200 dark:bg-neutral-700`}></div>
                  <div className="p-5">
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-4 w-1/2"></div>
                    <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  </div>
                </div>
              ))
            ) : displayedProducts.length > 0 ? (
              displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} className={viewMode === 'list' ? 'flex flex-col md:flex-row' : ''} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Try adjusting your search criteria
                </p>
                <Button 
                  variant="primary"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {!loading && displayedProducts.length > 0 && displayedTotalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>
                
                {Array.from({ length: displayedTotalPages }, (_, i) => i + 1).map(page => {
                  // Show first 3 pages, current page, and last 3 pages
                  if (
                    page <= 3 ||
                    page > displayedTotalPages - 3 ||
                    Math.abs(currentPage - page) <= 1
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "primary" : "outline"}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  } else if (
                    page === 4 && currentPage < displayedTotalPages - 4 ||
                    page === displayedTotalPages - 3 && currentPage > 4
                  ) {
                    return <span key={page} className="px-2 self-center">...</span>;
                  }
                  return null;
                })}
                
                <Button
                  variant="outline"
                  disabled={currentPage === displayedTotalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, displayedTotalPages))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;