import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, PenTool, Zap } from 'lucide-react';
import { useLatestPosts } from '../hooks/useWordPressData';
import { useProducts } from '../hooks/useWooCommerceData';
import LogoSvg  from '../assets/images/bigscoots-vertical.svg';
import PostCard from '../components/posts/PostCard';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const { posts, loading: postsLoading } = useLatestPosts(3);
  const { products, loading: productsLoading } = useProducts(1, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-900 dark:from-primary-800 dark:to-primary-950 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="flex flex-wrap 7xl:gap-13 container mx-auto px-4 py-20 md:py-28 lg:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              Modern Headless WordPress + WooCommerce Solution
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Experience the power of decoupled architecture with blazing-fast performance, 
              exceptional user experience, and seamless content management.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                rightIcon={<ArrowRight size={18} />}
                className="bg-white text-primary-700 hover:bg-white/90"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className='bigscoots-logo opacity-75 hidden 7xl:block'>
            <img src={LogoSvg} alt="BigScoots Logo" className="bigscoots-logo" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Why Choose Magic Headless WP?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Our solution combines the flexibility of WordPress with the performance of modern frontend technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg inline-block mb-4">
                <Zap size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Lightning Fast</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Optimized performance with static site generation and dynamic content fetching for blazing-fast load times.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg inline-block mb-4">
                <PenTool size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Easy Content Management</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Familiar WordPress admin for content creators with a modern frontend experience for your visitors.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg inline-block mb-4">
                <ShoppingBag size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Seamless E-Commerce</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                WooCommerce integration with a custom-designed shopping experience optimized for conversions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 md:py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">Latest Articles</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Stay up to date with our latest insights and tips
              </p>
            </div>
            <Link 
              to="/articles" 
              className="flex items-center text-primary-600 dark:text-primary-400 font-medium mt-4 md:mt-0 hover:underline"
            >
              View All Articles
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {postsLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
                  <div className="h-48 bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="p-5">
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 w-2/3"></div>
                  </div>
                </div>
              ))
            ) : (
              posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">Featured Products</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Shop our carefully selected products
              </p>
            </div>
            <Link 
              to="/products" 
              className="flex items-center text-primary-600 dark:text-primary-400 font-medium mt-4 md:mt-0 hover:underline"
            >
              View All Products
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
                  <div className="aspect-square bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="p-5">
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-4 w-1/2"></div>
                    <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-50 dark:bg-primary-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to Transform Your WordPress Experience?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Join thousands of businesses that have upgraded to a headless WordPress solution for better performance, security, and user experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg"
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;