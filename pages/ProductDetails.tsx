import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { Star, Truck, Check, Sparkles, MessageSquare } from 'lucide-react';
import { getStylingAdvice } from '../services/geminiService';

interface ProductDetailsProps {
  addToCart: (product: Product, size: string, color: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ addToCart }) => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  // Gemini Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color.");
      return;
    }
    // Just for type safety in this example, usually handled better
    const sizeStr = selectedSize || product.sizes[0];
    const colorStr = selectedColor || product.colors[0];
    addToCart(product, sizeStr, colorStr);
  };


  const handleStylistAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    
    setIsThinking(true);
    setChatResponse('');
    
    const response = await getStylingAdvice(product.name, product.description, chatQuery);
    
    setChatResponse(response);
    setIsThinking(false);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <div className="relative aspect-[3/4] bg-gray-100">
             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details Section */}
          <div>
            <h3 className="text-gold-600 uppercase tracking-widest text-sm font-semibold mb-2">{product.category}</h3>
            <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
               <div className="flex text-gold-500 mr-4">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                 ))}
               </div>
               <span className="text-gray-500 text-sm">{product.reviews} Reviews</span>
            </div>

            <p className="text-3xl font-bold text-gray-900 mb-6">KES {product.price.toLocaleString()}</p>
            
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <div className="space-y-6 mb-8">
              {/* Color Selection */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Select Color</h4>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border text-sm transition ${
                        selectedColor === color 
                        ? 'border-navy-900 bg-navy-900 text-white' 
                        : 'border-gray-300 text-gray-700 hover:border-navy-900'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
               <div>
                <h4 className="font-medium text-gray-900 mb-3">Select Size</h4>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center border text-sm transition ${
                        selectedSize === size 
                        ? 'border-navy-900 bg-navy-900 text-white' 
                        : 'border-gray-300 text-gray-700 hover:border-navy-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-gold-500 text-navy-900 font-bold py-4 uppercase tracking-widest hover:bg-gold-400 transition"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="w-full border border-navy-900 text-navy-900 font-bold py-4 uppercase tracking-widest hover:bg-navy-900 hover:text-white transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {isChatOpen ? "Close Stylist" : "Ask AI Stylist"}
              </button>
            </div>

            {/* AI Stylist Interface */}
            {isChatOpen && (
              <div className="mb-8 bg-gray-50 p-6 border border-gray-200 rounded-lg animate-fade-in">
                <h4 className="font-serif font-bold text-lg mb-2 flex items-center gap-2 text-navy-900">
                  <Sparkles className="w-5 h-5 text-gold-500" /> Virtual Stylist
                </h4>
                <p className="text-sm text-gray-500 mb-4">Ask about matching ties, shoes, or occasions for this suit.</p>
                
                {chatResponse && (
                   <div className="bg-white p-4 rounded border border-gray-100 mb-4 text-gray-700 text-sm leading-relaxed shadow-sm">
                     <span className="font-bold text-gold-600 block mb-1">Stylist says:</span>
                     {chatResponse}
                   </div>
                )}

                <form onSubmit={handleStylistAsk} className="relative">
                  <input 
                    type="text" 
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    placeholder="e.g., What color shoes go with this?"
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 focus:outline-none focus:border-gold-500 rounded-md text-sm"
                    disabled={isThinking}
                  />
                  <button 
                    type="submit" 
                    disabled={isThinking}
                    className="absolute right-2 top-2 p-1 text-navy-900 hover:text-gold-600"
                  >
                    {isThinking ? <span className="animate-spin block">⌛</span> : <MessageSquare className="w-5 h-5"/>}
                  </button>
                </form>
              </div>
            )}

            {/* Extra Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span>In stock and ready to ship</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="w-5 h-5 text-navy-900 mr-3" />
                <span>Free delivery on orders over KES 50,000</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;