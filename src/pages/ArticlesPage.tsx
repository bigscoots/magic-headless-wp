import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useCategories, usePosts } from '../hooks/useWordPressData';
import PostCard from '../components/posts/PostCard';
import Button from '../components/ui/Button';

const POSTS_PER_PAGE = 12;

const ArticlesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  
  const { categories } = useCategories();
  const { posts, loading, error, totalPages } = usePosts(
    currentPage,
    POSTS_PER_PAGE,
    activeCategory ? [activeCategory] : undefined
  );
  
  // Memoize filtered posts to prevent unnecessary re-renders
  const filteredPosts = useMemo(() => {
    if (!posts || error) return posts;
    if (!searchQuery) return posts;
    
    return posts.filter(post =>
      post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.rendered.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery, error]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };
  
  const handleCategoryClick = (categoryId: number | null) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
    setCurrentPage(1);
    setSearchQuery('');
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Error Loading Articles</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          {error.message}
        </p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="relative bg-primary-600 dark:bg-primary-900 text-white py-12 md:py-20">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Articles</h1>
          <p className="text-white/90 text-lg max-w-3xl">
            Discover the latest insights, tutorials, and news about WordPress, headless architecture, and modern web development.
          </p>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="bg-white dark:bg-neutral-900 shadow-sm border-b border-neutral-200 dark:border-neutral-800 sticky top-16 md:top-20 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
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
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeCategory === null ? "primary" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(null)}
              >
                All
              </Button>
              
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Articles Grid */}
      <div className="bg-neutral-50 dark:bg-neutral-950 py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
                  <div className="h-48 bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="p-5">
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      // Show first 3 pages, current page, and last 3 pages
                      if (
                        page <= 3 ||
                        page > totalPages - 3 ||
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
                        page === 4 && currentPage < totalPages - 4 ||
                        page === totalPages - 3 && currentPage > 4
                      ) {
                        return <span key={page} className="px-2 self-center">...</span>;
                      }
                      return null;
                    })}
                    
                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="primary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;