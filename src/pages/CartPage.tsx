import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  
  const formatPrice = (price: string | number) => {
    return `$${parseFloat(price.toString()).toFixed(2)}`;
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="mx-auto bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full w-24 h-24 flex items-center justify-center mb-6">
            <ShoppingBag size={32} className="text-neutral-500 dark:text-neutral-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">Your Cart is Empty</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button 
              variant="primary" 
              size="lg"
              rightIcon={<ArrowRight size={18} />}
            >
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="bg-white dark:bg-neutral-950 py-10 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-semibold mb-8">Your Shopping Cart</h1>
          
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              {/* Cart Items */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden mb-6 lg:mb-0">
                <div className="border-b border-neutral-200 dark:border-neutral-800 p-4 md:p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">Cart Items ({cart.length})</h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
                
                <div>
                  {cart.map(item => (
                    <div key={item.id} className="border-b border-neutral-200 dark:border-neutral-800 last:border-b-0 p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        {/* Product Image */}
                        <div className="w-full sm:w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                              <ShoppingBag size={24} />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          {/* Product Info */}
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                            <div>
                              <h3 className="text-base font-medium mb-1">{item.name}</h3>
                              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2 sm:mb-0">
                                {formatPrice(item.price)} each
                              </p>
                            </div>
                            <p className="font-medium sm:text-right">
                              {formatPrice(parseFloat(item.price) * item.quantity)}
                            </p>
                          </div>
                          
                          {/* Quantity and Remove */}
                          <div className="flex justify-between items-center">
                            <div className="inline-flex items-center border border-neutral-300 dark:border-neutral-700 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center py-1">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-600 dark:text-neutral-400 hover:text-error-600 dark:hover:text-error-400 p-1.5"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden h-fit">
              <div className="border-b border-neutral-200 dark:border-neutral-800 p-4 md:p-6">
                <h2 className="text-lg font-medium">Order Summary</h2>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
                    <span className="font-medium">{formatPrice(totalPrice * 0.08)}</span>
                  </div>
                  
                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-4">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>{formatPrice(totalPrice * 1.08)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <Link to="/checkout">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <Link to="/products">
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
                  <p>We accept all major credit cards and PayPal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;