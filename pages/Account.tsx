import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, User, LogOut, Plus, Trash2 } from 'lucide-react';
import { Address } from '../types';

const Account: React.FC = () => {
  const { user, logout, updateProfile, addAddress, removeAddress } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  
  // Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    label: 'Home',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      id: Date.now().toString(),
      ...newAddress as Address
    });
    setShowAddressForm(false);
    setNewAddress({ label: 'Home', firstName: '', lastName: '', street: '', city: '', postalCode: '', phone: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-navy-900 text-gold-500 flex items-center justify-center text-xl font-bold font-serif">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-navy-900">{user.name}</h2>
                  <p className="text-xs text-gray-500">Member since {new Date(user.joinedDate).getFullYear()}</p>
                  {user.role === 'admin' && (
                     <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded">Administrator</span>
                  )}
                </div>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'profile' ? 'bg-gold-50 text-gold-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <User className="mr-3 h-5 w-5" /> Profile Details
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'orders' ? 'bg-gold-50 text-gold-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Package className="mr-3 h-5 w-5" /> Order History
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'addresses' ? 'bg-gold-50 text-gold-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <MapPin className="mr-3 h-5 w-5" /> Addresses
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors mt-4"
                >
                  <LogOut className="mr-3 h-5 w-5" /> Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full md:w-3/4">
            <div className="bg-white shadow-sm p-8 min-h-[500px]">
              
              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">Profile Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={user.name}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={user.email}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={user.phone || ''}
                        onChange={(e) => updateProfile({ phone: e.target.value })}
                        placeholder="+254..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500" 
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <button className="bg-navy-900 text-white px-6 py-2 rounded-md font-medium hover:bg-navy-800 transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                 <div className="animate-fade-in">
                  <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">Order History</h2>
                  {user.orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {user.orders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-900">{order.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items.length} items</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-navy-900">KES {order.total.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                      You haven't placed any orders yet.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                 <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-navy-900">My Addresses</h2>
                    <button 
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="flex items-center text-sm text-gold-600 font-medium hover:text-gold-500"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add New Address
                    </button>
                  </div>

                  {showAddressForm && (
                    <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                      <h3 className="font-medium text-navy-900 mb-4">New Address Details</h3>
                      <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required placeholder="Label (e.g. Home)" value={newAddress.label} onChange={e => setNewAddress({...newAddress, label: e.target.value})} className="p-2 border rounded focus:ring-gold-500 focus:border-gold-500" />
                        <input required placeholder="First Name" value={newAddress.firstName} onChange={e => setNewAddress({...newAddress, firstName: e.target.value})} className="p-2 border rounded focus:ring-gold-500 focus:border-gold-500" />
                        <input required placeholder="Last Name" value={newAddress.lastName} onChange={e => setNewAddress({...newAddress, lastName: e.target.value})} className="p-2 border rounded focus:ring-gold-500 focus:border-gold-500" />
                        <input required placeholder="Street Address" value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="p-2 border rounded focus:ring-gold-500 focus:border-gold-500" />
                        <input required placeholder="City" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="p-2 border rounded focus:ring-gold-500 focus:border-gold-500" />
                        <input required placeholder="Postal Code" value={newAddress.postalCode} onChange={e => setNewAddress({...newAddress, postalCode: e.target.value})} className="p-2 border rounded focus:ring-gold-500 focus:border-gold-500" />
                        <input required placeholder="Phone" value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} className="p-2 border rounded focus:ring-gold-500 focus:border-gold-500" />
                        <div className="md:col-span-2 flex justify-end space-x-2 mt-2">
                          <button type="button" onClick={() => setShowAddressForm(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
                          <button type="submit" className="px-4 py-2 bg-navy-900 text-white rounded hover:bg-navy-800">Save Address</button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.addresses.map(addr => (
                      <div key={addr.id} className="border border-gray-200 rounded-lg p-6 relative group hover:border-gold-500 transition">
                        <div className="flex justify-between items-start mb-2">
                          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase">{addr.label}</span>
                          <button onClick={() => removeAddress(addr.id)} className="text-gray-400 hover:text-red-500 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-bold text-navy-900">{addr.firstName} {addr.lastName}</p>
                        <p className="text-gray-600 text-sm">{addr.street}</p>
                        <p className="text-gray-600 text-sm">{addr.city}, {addr.postalCode}</p>
                        <p className="text-gray-600 text-sm mt-2">{addr.phone}</p>
                      </div>
                    ))}
                    {user.addresses.length === 0 && (
                      <div className="col-span-2 text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        No addresses saved yet.
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;