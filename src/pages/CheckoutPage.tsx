import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  
  const formatPrice = (price: string | number) => {
    return `$${parseFloat(price.toString()).toFixed(2)}`;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Handle successful order
    clearCart();
    navigate('/order-confirmation', { 
      state: { 
        orderId: Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
        orderTotal: totalPrice * 1.08
      } 
    });
  };
  
  // Redirect to products if cart is empty
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <AlertCircle size={48} className="mx-auto text-neutral-500 dark:text-neutral-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">Your Cart is Empty</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Please add some products to your cart before checking out.
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="bg-white dark:bg-neutral-950 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <Link 
            to="/cart" 
            className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Cart
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-semibold mb-8">Checkout</h1>
          
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden mb-6">
                  <div className="border-b border-neutral-200 dark:border-neutral-800 p-4 md:p-6">
                    <h2 className="text-lg font-medium">Contact Information</h2>
                  </div>
                  
                  <div className="p-4 md:p-6 space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden mb-6">
                  <div className="border-b border-neutral-200 dark:border-neutral-800 p-4 md:p-6">
                    <h2 className="text-lg font-medium">Shipping Address</h2>
                  </div>
                  
                  <div className="p-4 md:p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          ZIP/Postal Code *
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          required
                          value={formData.zip}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden mb-6">
                  <div className="border-b border-neutral-200 dark:border-neutral-800 p-4 md:p-6">
                    <h2 className="text-lg font-medium">Payment Information</h2>
                  </div>
                  
                  <div className="p-4 md:p-6 space-y-4">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        required
                        value={formData.cardName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Card Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          required
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-2 pl-10 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard size={16} className="text-neutral-500 dark:text-neutral-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="expMonth" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Exp. Month *
                        </label>
                        <select
                          id="expMonth"
                          name="expMonth"
                          required
                          value={formData.expMonth}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month.toString().padStart(2, '0')}>
                              {month.toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="expYear" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Exp. Year *
                        </label>
                        <select
                          id="expYear"
                          name="expYear"
                          required
                          value={formData.expYear}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                            <option key={year} value={year.toString()}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          required
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isProcessing}
                  className="mb-6 lg:hidden"
                >
                  {isProcessing ? 'Processing...' : `Pay ${formatPrice(totalPrice * 1.08)}`}
                </Button>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden sticky top-24">
                <div className="border-b border-neutral-200 dark:border-neutral-800 p-4 md:p-6">
                  <h2 className="text-lg font-medium">Order Summary</h2>
                </div>
                
                <div className="p-4 md:p-6">
                  <div className="max-h-64 overflow-y-auto mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center py-2 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0">
                        <div className="h-10 w-10 bg-neutral-100 dark:bg-neutral-800 rounded overflow-hidden mr-3 flex-shrink-0">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-neutral-400">
                              <span className="text-xs">No img</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">Qty: {item.quantity}</p>
                        </div>
                        <div className="ml-2 text-sm font-medium">
                          {formatPrice(parseFloat(item.price) * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Tax (8%)</span>
                      <span>{formatPrice(totalPrice * 0.08)}</span>
                    </div>
                    
                    <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 mt-3">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatPrice(totalPrice * 1.08)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleSubmit}
                      isLoading={isProcessing}
                      className="hidden lg:flex"
                    >
                      {isProcessing ? 'Processing...' : `Pay ${formatPrice(totalPrice * 1.08)}`}
                    </Button>
                  </div>
                  
                  <div className="mt-6 text-center text-xs text-neutral-600 dark:text-neutral-400">
                    <p>By placing your order, you agree to our</p>
                    <p className="mt-1">
                      <Link to="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</Link>
                      {' and '}
                      <Link to="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;