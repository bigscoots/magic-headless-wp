import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Laptop 
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Update navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search for:', searchQuery);
    setIsSearchOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 
          'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm' : 
          'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400"
          >
            <Laptop size={28} strokeWidth={1.5} />
            <span className="font-semibold text-xl hidden sm:block">Magic Headless WP</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                location.pathname === '/' ? 'text-primary-600 dark:text-primary-400' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/articles" 
              className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                location.pathname.includes('/articles') ? 'text-primary-600 dark:text-primary-400' : ''
              }`}
            >
              Articles
            </Link>
            <Link 
              to="/products" 
              className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                location.pathname.includes('/products') ? 'text-primary-600 dark:text-primary-400' : ''
              }`}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                location.pathname === '/about' ? 'text-primary-600 dark:text-primary-400' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                location.pathname === '/contact' ? 'text-primary-600 dark:text-primary-400' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={toggleTheme}
              className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <Link 
              to="/cart" 
              className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-full bg-white dark:bg-neutral-900 shadow-md py-4 animate-slide-down">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search for articles and products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute inset-x-0 top-full bg-white dark:bg-neutral-900 shadow-md animate-slide-down md:hidden">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-md ${
                location.pathname === '/' ? 
                  'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/articles" 
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-md ${
                location.pathname.includes('/articles') ? 
                  'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              Articles
            </Link>
            <Link 
              to="/products" 
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-md ${
                location.pathname.includes('/products') ? 
                  'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-md ${
                location.pathname === '/about' ? 
                  'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-md ${
                location.pathname === '/contact' ? 
                  'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;