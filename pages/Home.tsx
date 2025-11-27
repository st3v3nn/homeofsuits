import React from 'react';
import { ArrowRight, Star, Truck, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, REVIEWS } from '../constants';
import { Product } from '../types';

interface HomeProps {
  addToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ addToCart }) => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/suits-hero" 
            alt="Man in Luxury Suit" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-900/30"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-gold-400 uppercase tracking-[0.3em] text-sm font-semibold animate-fade-in-up">
            Welcome to Home of Suits
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-bold mt-6 mb-8 leading-tight">
            Redefining Men's <br/> <span className="italic font-light">Elegance</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto">
            Discover our collection of premium tailored suits, designed for the modern gentleman who appreciates timeless sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop" 
              className="bg-gold-500 text-navy-900 px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition duration-300"
            >
              Shop Collection
            </Link>
            <Link 
              to="/shop" 
              className="border border-white text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white hover:text-navy-900 transition duration-300"
            >
              View New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Value Prop */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Truck className="w-10 h-10 mx-auto text-gold-500 mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Nationwide Delivery</h3>
              <p className="text-gray-500">Fast and secure delivery across the country, with express options available.</p>
            </div>
            <div className="p-6">
              <ShieldCheck className="w-10 h-10 mx-auto text-gold-500 mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-500">Hand-selected fabrics from the finest mills ensuring durability and style.</p>
            </div>
            <div className="p-6">
              <Clock className="w-10 h-10 mx-auto text-gold-500 mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Perfect Fit Guarantee</h3>
              <p className="text-gray-500">Detailed size guides and expert support to ensure you look your best.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-gold-600 uppercase tracking-widest font-semibold text-xs">Selected for you</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 mt-2">Featured Suits</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-navy-900 hover:text-gold-600 transition font-medium group">
              View All <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} onQuickAdd={addToCart} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center text-navy-900 font-medium">
              View All Collection <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-navy-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="relative z-10">
               <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Tailored to Perfection</h2>
               <p className="text-gray-400 text-lg mb-8 max-w-md">
                 Experience the difference of a suit made with precision. Our wedding collection is now available with exclusive discounts for groom parties.
               </p>
               <Link to="/shop" className="inline-block bg-gold-500 text-navy-900 px-8 py-3 font-bold uppercase tracking-wider hover:bg-white transition">
                 Shop Wedding
               </Link>
             </div>
             <div className="relative h-96 md:h-[500px]">
                <div className="absolute inset-0 border-2 border-gold-500/30 transform translate-x-4 translate-y-4 z-0"></div>
                <img 
                  src="/meninsuits.jpeg" 
                  alt="Wedding Suit" 
                  className="relative z-10 w-full h-full object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 text-center mb-16">What Gentlemen Say</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REVIEWS.map(review => (
                <div key={review.id} className="bg-gray-50 p-8 border border-gray-100">
                  <div className="flex text-gold-500 mb-4">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                  <p className="text-navy-900 font-bold font-serif">{review.user}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
