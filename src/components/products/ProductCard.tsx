import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart();
  
  // Format price
  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Card 
      className={`h-full flex flex-col transition-all duration-300 hover:shadow-md ${className}`}
      hovered
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative pb-[100%] overflow-hidden rounded-t-lg">
          <img 
            src={product.images[0]?.src || 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.on_sale && (
            <span className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              SALE
            </span>
          )}
        </div>
      </Link>
      
      <CardContent className="flex flex-col flex-grow p-5">
        <div className="mb-2">
          {product.categories.map((category, index) => (
            <span 
              key={category.id}
              className="text-primary-600 dark:text-primary-400 text-xs"
            >
              {category.name}
              {index < product.categories.length - 1 && <span>, </span>}
            </span>
          ))}
        </div>
        
        <Link 
          to={`/products/${product.slug}`}
          className="text-lg font-medium text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1 mb-2"
        >
          {product.name}
        </Link>
        
        <div className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 flex-grow line-clamp-2"
             dangerouslySetInnerHTML={{ __html: product.short_description }} 
        />
        
        <div className="flex items-center mb-3">
          {product.on_sale ? (
            <>
              <span className="text-accent-600 font-medium mr-2">{formatPrice(product.sale_price)}</span>
              <span className="text-neutral-500 line-through text-sm">{formatPrice(product.regular_price)}</span>
            </>
          ) : (
            <span className="text-neutral-900 dark:text-white font-medium">{formatPrice(product.price)}</span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Button 
          onClick={handleAddToCart}
          variant="primary"
          size="sm"
          fullWidth
          leftIcon={<ShoppingCart size={16} />}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;