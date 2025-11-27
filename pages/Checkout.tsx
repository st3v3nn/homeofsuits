import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Address, CartItem, Order } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const { user, addOrder } = useAuth();
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  
  const subtotal = cartItems ? cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;
  // Free shipping over KES 50,000, else KES 1,500
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + shipping;

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        phone: user.phone || '',
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ')[1] || ''
      }));
    }
  }, [user]);

  const handleUseAddress = (addr: Address) => {
    setFormData({
      firstName: addr.firstName,
      lastName: addr.lastName,
      email: user?.email || '',
      phone: addr.phone,
      street: addr.street,
      city: addr.city,
      postalCode: addr.postalCode
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create Order Object
    const newOrder: Order = {
      id: '#' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
      items: cartItems,
      total: total,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: `${formData.street}, ${formData.city}`
      }
    };

    // Save to user history if logged in
    if (user) {
      addOrder(newOrder);
    }

    // Simulate API call
    setTimeout(() => {
      clearCart();
      setStep(2);
    }, 1500);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-navy-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-500 mb-8">Thank you for choosing Home of Suits. Your order has been successfully placed.</p>
          <button onClick={() => navigate('/')} className="bg-navy-900 text-white px-8 py-3 font-medium uppercase tracking-wider hover:bg-navy-800 transition">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && step === 1) {
    return (
       <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <h2 className="font-serif text-3xl mb-4 text-navy-900">Your cart is empty</h2>
        <Link to="/shop" className="bg-navy-900 text-white px-8 py-3 hover:bg-navy-800 transition uppercase tracking-wider font-bold">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-navy-900 mb-8 text-center">Checkout</h1>
        
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Shipping Details */}
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold mb-6 text-navy-900">Shipping Information</h3>
            
            {user && user.addresses.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Saved Addresses:</p>
                <div className="flex flex-wrap gap-2">
                  {user.addresses.map(addr => (
                    <button
                      type="button"
                      key={addr.id}
                      onClick={() => handleUseAddress(addr)}
                      className="flex items-center px-3 py-1 bg-gray-100 border border-gray-200 rounded hover:bg-gold-50 hover:border-gold-200 text-sm transition"
                    >
                      <MapPin className="w-3 h-3 mr-1 text-gold-600" />
                      {addr.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="First Name" className="w-full p-3 border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500" />
                <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Last Name" className="w-full p-3 border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500" />
              </div>
              <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email Address" className="w-full p-3 border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500" />
              <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Phone Number (e.g. +254...)" className="w-full p-3 border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500" />
              <input required name="street" value={formData.street} onChange={handleInputChange} type="text" placeholder="Street Address" className="w-full p-3 border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500" />
              <div className="grid grid-cols-2 gap-4">
                <input required name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="City" className="w-full p-3 border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500" />
                <input required name="postalCode" value={formData.postalCode} onChange={handleInputChange} type="text" placeholder="Postal Code" className="w-full p-3 border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500" />
              </div>
            </div>
          </div>

          {/* Payment & Summary */}
          <div className="bg-white p-6 shadow-sm">
             <div className="mb-8 border-b border-gray-100 pb-6">
               <h3 className="font-serif text-xl font-bold mb-4 text-navy-900">Order Summary</h3>
               <div className="space-y-2 text-sm">
                 <div className="flex justify-between text-gray-600">
                   <span>Items ({cartItems.length})</span>
                   <span>KES {subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-gray-600">
                   <span>Shipping</span>
                   <span>{shipping === 0 ? 'Free' : `KES ${shipping.toLocaleString()}`}</span>
                 </div>
                 <div className="flex justify-between font-bold text-lg text-navy-900 pt-2">
                   <span>Total</span>
                   <span>KES {total.toLocaleString()}</span>
                 </div>
               </div>
             </div>

            <h3 className="font-serif text-xl font-bold mb-6 text-navy-900">Payment Method</h3>
            
            <div className="space-y-4 mb-8">
              <label className={`flex items-center p-4 border cursor-pointer transition ${paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="mpesa" 
                  checked={paymentMethod === 'mpesa'} 
                  onChange={() => setPaymentMethod('mpesa')}
                  className="mr-3" 
                />
                <span className="font-medium text-gray-800">M-Pesa (Mobile Money)</span>
              </label>
              
              <label className={`flex items-center p-4 border cursor-pointer transition ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')}
                  className="mr-3" 
                />
                <span className="font-medium text-gray-800">Credit/Debit Card</span>
              </label>

              <label className={`flex items-center p-4 border cursor-pointer transition ${paymentMethod === 'cod' ? 'border-gray-500 bg-gray-100' : 'border-gray-200'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')}
                  className="mr-3" 
                />
                <span className="font-medium text-gray-800">Cash on Delivery</span>
              </label>
            </div>

            <div className="border-t border-gray-200 pt-6">
               <p className="text-gray-500 text-sm mb-6">
                 By clicking the button below, you agree to our Terms and Conditions.
               </p>
               <button type="submit" className="w-full bg-navy-900 text-white font-bold py-4 uppercase tracking-widest hover:bg-navy-800 transition shadow-lg">
                 Pay KES {total.toLocaleString()}
               </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;