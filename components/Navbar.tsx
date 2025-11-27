import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User, Search, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path ? "text-gold-500 font-medium" : "text-gray-600 hover:text-navy-900";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link to="/" className="flex flex-col items-center">
              <h1 className="font-serif text-2xl font-bold text-navy-900 tracking-wider">HOME OF SUITS</h1>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-600">Est. 2024</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/shop" className={isActive('/shop')}>Shop Collection</Link>
            <Link to="/about" className={isActive('/about')}>About Us</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-red-500 hover:text-red-700 text-xs uppercase font-bold border border-red-100 px-2 py-1 rounded bg-red-50">Admin Panel</Link>
            )}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-500 hover:text-navy-900 transition">
              <Search className="w-5 h-5" />
            </button>
            
            {user ? (
              <Link to="/account" className="text-gray-500 hover:text-navy-900 transition flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium hidden lg:block">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
               <Link to="/login" className="text-gray-500 hover:text-navy-900 transition flex items-center gap-1">
                 <LogIn className="w-5 h-5" />
                 <span className="text-xs uppercase font-bold">Login</span>
               </Link>
            )}

            <Link to="/cart" className="relative text-gray-500 hover:text-navy-900 transition">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <Link to="/cart" className="mr-4 relative text-gray-500">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-navy-900">
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-navy-900 hover:bg-gray-50">Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-navy-900 hover:bg-gray-50">Shop Collection</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-navy-900 hover:bg-gray-50">About Us</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-navy-900 hover:bg-gray-50">Contact</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-red-500 bg-red-50">Admin Dashboard</Link>
            )}
            <div className="border-t border-gray-100 pt-2 mt-2">
               {user ? (
                  <Link to="/account" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gold-600">My Account</Link>
               ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gold-600">Login / Register</Link>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;