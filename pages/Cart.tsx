import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';
import { Trash2, ArrowRight, Lock } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, removeFromCart, updateQuantity }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  // Free shipping over KES 50,000, else KES 1,500
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <h2 className="font-serif text-3xl mb-4 text-navy-900">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't found your perfect suit yet.</p>
        <Link to="/shop" className="bg-navy-900 text-white px-8 py-3 hover:bg-navy-800 transition uppercase tracking-wider font-bold">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-navy-900 mb-8">Shopping Cart ({items.length})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="bg-white p-6 flex flex-col sm:flex-row gap-6 shadow-sm">
                <div className="w-full sm:w-32 h-40 bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg font-medium text-navy-900">{item.name}</h3>
                    <span className="font-bold text-gray-900">KES {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-300">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >-</button>
                      <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >+</button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-sm sticky top-24">
              <h3 className="font-serif text-xl font-bold text-navy-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `KES ${shipping.toLocaleString()}`}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-navy-900 mb-8">
                <span>Total</span>
                <span>KES {total.toLocaleString()}</span>
              </div>

              <Link 
                to="/checkout"
                className="w-full block text-center bg-gold-500 text-navy-900 font-bold py-4 uppercase tracking-widest hover:bg-gold-400 transition mb-4"
              >
                Proceed to Checkout
              </Link>
              
              <div className="flex items-center justify-center text-gray-400 text-xs">
                <Lock className="w-3 h-3 mr-1" /> Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;