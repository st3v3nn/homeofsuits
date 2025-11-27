import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
             <h2 className="font-serif text-2xl font-bold tracking-wider">HOME OF SUITS</h2>
             <p className="text-gray-400 text-sm leading-relaxed">
               Redefining men's elegance with premium craftsmanship and timeless designs. Experience luxury in every stitch.
             </p>
             <div className="flex space-x-4 pt-2">
               <a href="#" className="text-gray-400 hover:text-gold-500 transition"><Facebook className="w-5 h-5"/></a>
               <a href="#" className="text-gray-400 hover:text-gold-500 transition"><Instagram className="w-5 h-5"/></a>
               <a href="#" className="text-gray-400 hover:text-gold-500 transition"><Twitter className="w-5 h-5"/></a>
             </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gold-500 font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Shop All</a></li>
              <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition">Delivery Info</a></li>
              <li><a href="#" className="hover:text-white transition">Return Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-500 font-serif text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Westlands Business Park,<br/>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+254 700 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>concierge@homeofsuits.com</span>
              </li>
            </ul>
          </div>

           {/* Newsletter */}
           <div>
            <h3 className="text-gold-500 font-serif text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive offers and style tips.</p>
            <div className="flex flex-col space-y-2">
              <input type="email" placeholder="Your email address" className="px-4 py-2 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-gold-500 text-sm" />
              <button className="px-4 py-2 bg-gold-500 text-navy-900 font-semibold hover:bg-gold-400 transition text-sm">SUBSCRIBE</button>
            </div>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Home of Suits. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
