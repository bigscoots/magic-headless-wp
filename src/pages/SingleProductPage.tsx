import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useWooCommerceData';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, ChevronRight, ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import Button from '../components/ui/Button';

type TabType = 'description' | 'additional' | 'reviews';

const SingleProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [productId, setProductId] = useState<number>(0);
  const { product, loading, error } = useProduct(productId);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('description');
  
  // Fetch product ID from slug
  useEffect(() => {
    const fetchProductId = async () => {
      try {
        const response = await fetch(`/api/products?slug=${slug}`);
        const products = await response.json();
        if (products && products.length > 0) {
          setProductId(products[0].id);
        } else {
          navigate('/404');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/404');
      }
    };
    
    if (slug) {
      fetchProductId();
    }
  }, [slug, navigate]);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Set active image when product loads
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0].src);
    }
  }, [product]);
  
  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    if (product?.stock_quantity && value > product.stock_quantity) {
      setQuantity(product.stock_quantity);
    } else {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsAddedToCart(true);
      
      // Reset the "Added to cart" message after 3 seconds
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 3000);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="animate-pulse">
            <div className="aspect-square bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
          </div>
          <div className="space-y-6 animate-pulse">
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4"></div>
            <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3"></div>
            </div>
            <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          The product you're looking for could not be found or doesn't exist.
        </p>
        <Link to="/products">
          <Button variant="primary">
            Browse All Products
          </Button>
        </Link>
      </div>
    );
  }
  
  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };
  
  return (
    <div className="animate-fade-in">
      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400">
              Home
            </Link>
            <ChevronRight size={14} className="mx-2 text-neutral-400" />
            <Link to="/products" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400">
              Products
            </Link>
            <ChevronRight size={14} className="mx-2 text-neutral-400" />
            <span className="text-primary-600 dark:text-primary-400">
              {product.name}
            </span>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="bg-neutral-50 dark:bg-neutral-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-white dark:bg-neutral-900 rounded-lg overflow-hidden">
                <img 
                  src={activeImage} 
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex space-x-4 overflow-x-auto pb-2 px-1">
                  {product.images.map((image, i) => (
                    <button
                      key={image.id}
                      onClick={() => setActiveImage(image.src)}
                      className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                        activeImage === image.src 
                          ? 'ring-2 ring-primary-500' 
                          : 'ring-1 ring-neutral-200 dark:ring-neutral-700'
                      }`}
                    >
                      <img 
                        src={image.src} 
                        alt={image.name || `Product image ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              {/* Back to Products */}
              <Link 
                to="/products" 
                className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Products
              </Link>
              
              {/* Categories */}
              <div>
                {product.categories.map((category, index) => (
                  <span 
                    key={category.id}
                    className="text-primary-600 dark:text-primary-400 text-sm"
                  >
                    {category.name}
                    {index < product.categories.length - 1 && <span>, </span>}
                  </span>
                ))}
              </div>
              
              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">
                {product.name}
              </h1>
              
              {/* Pricing */}
              <div className="flex items-center">
                {product.on_sale ? (
                  <>
                    <span className="text-2xl font-medium text-accent-600 mr-3">
                      {formatPrice(product.sale_price)}
                    </span>
                    <span className="text-lg text-neutral-500 line-through">
                      {formatPrice(product.regular_price)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-medium text-neutral-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center">
                {product.stock_status === 'instock' ? (
                  <span className="text-success-600 dark:text-success-400 flex items-center">
                    <Check size={16} className="mr-1.5" />
                    In Stock
                    {product.stock_quantity && (
                      <span className="text-neutral-500 dark:text-neutral-400 text-sm ml-2">
                        ({product.stock_quantity} available)
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-error-600 dark:text-error-400">
                    Out of Stock
                  </span>
                )}
              </div>
              
              {/* Description */}
              <div className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              ></div>
              
              {/* Quantity and Add to Cart */}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="inline-flex items-center border border-neutral-300 dark:border-neutral-700 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-12 text-center border-x border-neutral-300 dark:border-neutral-700 py-2 bg-transparent"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={isAddedToCart ? <Check size={18} /> : <ShoppingCart size={18} />}
                    onClick={handleAddToCart}
                    disabled={product.stock_status !== 'instock' || isAddedToCart}
                  >
                    {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-16">
            <div className="border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex space-x-8">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`px-4 py-3 border-b-2 ${
                    activeTab === 'description'
                      ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-neutral-600 dark:text-neutral-400'
                  } font-medium`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('additional')}
                  className={`px-4 py-3 border-b-2 ${
                    activeTab === 'additional'
                      ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-neutral-600 dark:text-neutral-400'
                  } font-medium`}
                >
                  Additional Information
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`px-4 py-3 border-b-2 ${
                    activeTab === 'reviews'
                      ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-neutral-600 dark:text-neutral-400'
                  } font-medium`}
                >
                  Reviews
                </button>
              </div>
            </div>
            
            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-lg prose-a:text-primary-600 dark:prose-a:text-primary-400">
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              )}
              
              {activeTab === 'additional' && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {product.attributes && product.attributes.map(attr => (
                        <tr key={attr.id}>
                          <td className="py-4 pr-4 font-medium">{attr.name}</td>
                          <td className="py-4">{attr.options.join(', ')}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="py-4 pr-4 font-medium">SKU</td>
                        <td className="py-4">{product.sku || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {product.reviews_allowed ? (
                    <div>
                      <h3>Customer Reviews</h3>
                      {/* You can implement reviews functionality here */}
                      <p className="text-neutral-600 dark:text-neutral-400">
                        There are no reviews yet. Be the first to review this product.
                      </p>
                    </div>
                  ) : (
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Reviews are disabled for this product.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;