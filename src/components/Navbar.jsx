import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

const Navbar = ({ onSearch }) => {
  const { auth, logout } = useAuth();
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-green-900 p-4 relative">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white text-2xl font-bold">
            <Link to="/">MyApp</Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center px-8">
            <form onSubmit={handleSubmit} className="w-2/3 flex">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full p-2 rounded-l-lg border border-r-0 border-gray-300 focus:outline-none focus:border-green-500"
              />
              <button 
                type="submit" 
                className="px-6 bg-green-600 text-white rounded-r-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Search
              </button>
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {auth.isAuthenticated ? (
              <>
                <Link 
                  to="/profile"
                  className="text-white hover:text-gray-300 flex items-center space-x-2"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                  <span>{auth.user.display_name}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:text-gray-300">
                  Register
                </Link>
              </>
            )}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-gray-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-gray-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full p-2 rounded-l-lg border border-r-0 border-gray-300 focus:outline-none focus:border-green-500"
            />
            <button 
              type="submit" 
              className="px-4 bg-green-600 text-white rounded-r-lg hover:bg-green-700"
            >
              Search
            </button>
          </form>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-green-800 rounded-lg p-4 space-y-4">
            {auth.isAuthenticated ? (
              <>
                <Link 
                  to="/profile"
                  className="text-white hover:text-gray-300 flex items-center space-x-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                  <span>{auth.user.display_name}</span>
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-gray-300 block w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-gray-300 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-white hover:text-gray-300 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <Cart />
          </div>
        </div>
      </div>

      {isCartOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;