import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface ShopProps {
  addToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ addToCart }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priceSort, setPriceSort] = useState<string>('default');

  const categories = ['All', 'Business', 'Wedding', 'Casual', 'Vintage', 'Evening'];

  // Filter Logic
  const filteredProducts = PRODUCTS.filter(product => 
    categoryFilter === 'All' ? true : product.category === categoryFilter
  ).sort((a, b) => {
    if (priceSort === 'low') return a.price - b.price;
    if (priceSort === 'high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">The Collection</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Browse our exclusive range of premium suits. Filter by occasion to find the perfect match for your needs.</p>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 shadow-sm mb-8 sticky top-24 z-20">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  categoryFilter === cat 
                  ? 'bg-navy-900 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <select 
              className="bg-transparent text-sm text-gray-700 focus:outline-none border-b border-gray-300 pb-1"
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
            >
              <option value="default">Sort by: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onQuickAdd={addToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No suits found in this category.</p>
            <button 
              onClick={() => setCategoryFilter('All')}
              className="mt-4 text-gold-600 font-medium hover:underline"
            >
              View all products
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Shop;
