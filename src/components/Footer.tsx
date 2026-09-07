import React from 'react';
import { PageView } from '../types';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  return (
    <footer className="bg-[#332D2D] text-[#D8CDC4] pt-16 pb-12 border-t-4 border-[#8C4A32]">
      {/* Trust & Artisan Promises */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#4A4240]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#3E3735] text-[#DCA28A] shrink-0">
              <Sparkles className="w-5 h-5 text-[#C05E42]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Authentic Handcrafted</h4>
              <p className="text-xs text-[#A8988C] mt-1 leading-relaxed">
                Directly made by master artisans from Rayerbazar, Dhamrai, and Chawkbazar.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#3E3735] text-[#DCA28A] shrink-0">
              <Truck className="w-5 h-5 text-[#C05E42]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">All 64 Districts Delivery</h4>
              <p className="text-xs text-[#A8988C] mt-1 leading-relaxed">
                Fast courier across Bangladesh. Dhaka within 24-48 hrs, outside within 3-5 days.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#3E3735] text-[#DCA28A] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C05E42]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Safe Cash On Delivery</h4>
              <p className="text-xs text-[#A8988C] mt-1 leading-relaxed">
                Pay in cash after receiving your package. Also accepts bKash, Nagad & Cards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#3E3735] text-[#DCA28A] shrink-0">
              <RefreshCw className="w-5 h-5 text-[#C05E42]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Hassle-Free Size Exchange</h4>
              <p className="text-xs text-[#A8988C] mt-1 leading-relaxed">
                Wrong bangle size? Exchange within 3 days easily via our WhatsApp careline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#B94A28] text-white flex items-center justify-center font-serif text-lg font-bold">
                ক
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-wide">
                Karighor
              </span>
            </div>
            <p className="text-xs text-[#BFAEA2] mt-4 leading-relaxed max-w-sm">
              Karighor (কারিঘর) celebrates the living heritage of Bengal bangle-making. 
              From the chime of fired glass churi in Old Dhaka to the intricate terracotta art of Rayerbazar, 
              we connect indigenous women artisans with discerning bangle lovers.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-[#A69486]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Proudly handcrafted & packed in Bangladesh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8988C]">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('shop')}
                  className="hover:text-amber-200 transition-colors"
                >
                  All Bangles Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Our Bengal Artisan Heritage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Contact & Store Location
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('wishlist')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Saved Bangles (Wishlist)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('cart')}
                  className="hover:text-amber-200 transition-colors"
                >
                  View Cart & Checkout
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8988C]">
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('glass');
                    onNavigate('shop');
                  }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Glass & Reshmi Churi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('terracotta');
                    onNavigate('shop');
                  }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Terracotta & Clay
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('brass');
                    onNavigate('shop');
                  }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Dhamrai Brass & Nakshi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('silk-thread');
                    onNavigate('shop');
                  }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Silk Thread & Mirrorwork
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('bridal');
                    onNavigate('shop');
                  }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Bridal Kankan & Balas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('wooden');
                    onNavigate('shop');
                  }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Hand-painted Wooden
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Studio & Care
            </h4>
            <div className="space-y-3 text-xs text-[#A8988C]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DCA28A] shrink-0 mt-0.5" />
                <span>House 42, Road 11, Block D, Banani, Dhaka-1213, Bangladesh</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DCA28A] shrink-0" />
                <span>+880 1712-345678 (WhatsApp)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DCA28A] shrink-0" />
                <span>hello@karighor-bangladesh.com</span>
              </p>
              <p className="text-[11px] text-[#8C7B70] pt-1">
                Customer Support: 10:00 AM – 9:00 PM (Everyday)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateways and Delivery Partners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 border-t border-[#3D332D]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8E7E74]">
          <div>
            <p className="font-medium text-white mb-2 text-center md:text-left">
              Accepted Payment Methods
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-1 bg-[#362B25] text-pink-300 font-bold rounded border border-pink-900/40 text-[11px]">
                bKash
              </span>
              <span className="px-2.5 py-1 bg-[#362B25] text-orange-300 font-bold rounded border border-orange-900/40 text-[11px]">
                Nagad
              </span>
              <span className="px-2.5 py-1 bg-[#362B25] text-purple-300 font-bold rounded border border-purple-900/40 text-[11px]">
                Rocket
              </span>
              <span className="px-2.5 py-1 bg-[#362B25] text-emerald-300 font-bold rounded border border-emerald-900/40 text-[11px]">
                Cash on Delivery
              </span>
              <span className="px-2.5 py-1 bg-[#362B25] text-blue-300 font-bold rounded border border-blue-900/40 text-[11px]">
                Visa / Mastercard
              </span>
              <span className="px-2.5 py-1 bg-[#362B25] text-amber-200 font-medium rounded border border-amber-900/40 text-[11px]">
                SSLCommerz 256-Bit SSL
              </span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="font-medium text-white mb-2">Delivery Nationwide via</p>
            <p className="text-[11px] text-[#A8988C]">
              Pathao Courier • Steadfast Express • RedX Logistics • Sundarban
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#362B25] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7A6B62]">
          <p>© {new Date().getFullYear()} Karighor Bangles Bangladesh. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#B94A28] fill-[#B94A28]" /> for Bengal’s Artisan Heritage
          </p>
        </div>
      </div>
    </footer>
  );
};
