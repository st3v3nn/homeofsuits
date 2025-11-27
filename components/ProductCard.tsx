import React from 'react';
import { Product } from '../types';
import { Eye, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd }) => {
  return (
    <div className="group relative bg-white">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <Link 
            to={`/product/${product.id}`}
            className="p-3 bg-white rounded-full text-navy-900 hover:bg-gold-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button 
            onClick={() => onQuickAdd(product)}
            className="p-3 bg-white rounded-full text-navy-900 hover:bg-gold-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
        
        {/* Badges */}
        {product.rating >= 4.9 && (
          <span className="absolute top-2 left-2 bg-navy-900 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
            Best Seller
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="text-sm text-gray-500 uppercase tracking-widest">{product.category}</h3>
        <Link to={`/product/${product.id}`}>
          <h2 className="mt-1 text-lg font-serif font-medium text-navy-900 hover:text-gold-600 transition cursor-pointer">
            {product.name}
          </h2>
        </Link>
        <p className="mt-1 text-gray-900 font-semibold">
          KES {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;