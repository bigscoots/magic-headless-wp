import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { usePost, useCategories } from '../hooks/useWordPressData';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const SinglePostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const postId = location.state?.postId;
  const { post, loading, error } = usePost(postId, slug);
  const { categories } = useCategories();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-24 mb-6 animate-pulse"></div>
          <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded mb-6 animate-pulse"></div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-8 w-2/3 animate-pulse"></div>
          <div className="h-96 bg-neutral-200 dark:bg-neutral-700 rounded mb-8 animate-pulse"></div>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Article Not Found</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          The article you're looking for could not be found or doesn't exist.
        </p>
        <Link to="/articles">
          <Button variant="primary">
            Browse All Articles
          </Button>
        </Link>
      </div>
    );
  }
  
  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Find category names
  const postCategories = categories.filter(
    cat => post.categories.includes(cat.id)
  );

  return (
    <div className="animate-fade-in">
      {/* Featured Image */}
      {post.featured_image_url && (
        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <div className="absolute inset-0 bg-black/50"></div>
          <img 
            src={post.featured_image_url} 
            alt={post.title.rendered}
            className="w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 absolute inset-0 flex items-end pb-12">
            <div className="text-white max-w-3xl">
              <Link 
                to="/articles" 
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Articles
              </Link>
              <h1 className="text-3xl md:text-4xl font-semibold mb-4"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></h1>
              <div className="flex flex-wrap items-center text-sm text-white/80 gap-4">
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1.5" />
                  {formattedDate}
                </span>
                <span className="flex items-center">
                  <User size={14} className="mr-1.5" />
                  {post.author_name || 'Anonymous'}
                </span>
                {postCategories.length > 0 && (
                  <span className="flex items-center">
                    <Tag size={14} className="mr-1.5" />
                    {postCategories.map((cat, index) => (
                      <span key={cat.id}>
                        {cat.name}
                        {index < postCategories.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Article Content */}
      <div className={`container mx-auto px-4 py-12 ${!post.featured_image_url ? 'pt-24' : ''}`}>
        <div className="max-w-3xl mx-auto">
          {/* If no featured image, show title and meta here */}
          {!post.featured_image_url && (
            <>
              <Link 
                to="/articles" 
                className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Articles
              </Link>
              <h1 className="text-3xl md:text-4xl font-semibold mb-4"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></h1>
              <div className="flex flex-wrap items-center text-sm text-neutral-600 dark:text-neutral-400 gap-4 mb-8">
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1.5" />
                  {formattedDate}
                </span>
                <span className="flex items-center">
                  <User size={14} className="mr-1.5" />
                  {post.author_name || 'Anonymous'}
                </span>
                {postCategories.length > 0 && (
                  <span className="flex items-center">
                    <Tag size={14} className="mr-1.5" />
                    {postCategories.map((cat, index) => (
                      <span key={cat.id}>
                        {cat.name}
                        {index < postCategories.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </>
          )}
          
          {/* Article Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-lg prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-headings:font-semibold">
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </article>
          
          {/* Share and Tags */}
          <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                {postCategories.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-neutral-600 dark:text-neutral-400">Tags:</span>
                    {postCategories.map(cat => (
                      <Link 
                        key={cat.id} 
                        to={`/articles?category=${cat.id}`}
                        className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-700 dark:text-neutral-300 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-600 dark:text-neutral-400">Share:</span>
                <button className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;