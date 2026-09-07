import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  cartTotal,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navLinks: { id: PageView; label: string; bangla: string }[] = [
    { id: 'home', label: 'Home', bangla: 'মূল পাতা' },
    { id: 'shop', label: 'Shop Bangles', bangla: 'সকল চুরি' },
    { id: 'about', label: 'Our Heritage', bangla: 'আমাদের গল্প' },
    { id: 'contact', label: 'Contact Us', bangla: 'যোগাযোগ' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#8C4A32] text-[#FCFAF7] text-xs py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#F2EDE4] animate-pulse" />
        <span>
          Free Delivery across Bangladesh on orders over <strong>৳1,500</strong> | Call / WhatsApp: <strong>+880 1712-345678</strong>
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#5C5552] hover:text-[#8C4A32] focus:outline-none"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#8C4A32] text-white flex items-center justify-center font-serif text-xl font-bold shadow-sm group-hover:bg-[#723C29] transition-colors">
                ক
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#8C4A32]">
                    KARIGHOR
                  </span>
                  <span className="text-xs text-[#5C5552] font-light tracking-wider uppercase font-sans">
                    কারিঘর
                  </span>
                </div>
                <p className="text-[10px] text-[#A69E97] tracking-[0.2em] uppercase font-medium">
                  Artisan Bangles of Bengal
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium text-[#5C5552]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 relative ${
                  currentPage === link.id
                    ? 'text-[#8C4A32] border-b-2 border-[#8C4A32] font-bold'
                    : 'hover:text-[#8C4A32]'
                }`}
              >
                <span>{link.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Bar / Trigger */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-[#FCFAF7] border border-[#E8E2D9] rounded-full px-3 py-1.5 shadow-sm w-44 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-[#736B66] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search bangles..."
                    className="w-full text-xs text-[#332D2D] placeholder-[#A69E97] bg-transparent focus:outline-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onNavigate('shop');
                        setShowSearchInput(false);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      onSearchChange('');
                    }}
                    className="text-[#736B66] hover:text-[#332D2D] text-xs font-bold ml-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  id="search-icon-btn"
                  onClick={() => {
                    setShowSearchInput(true);
                  }}
                  className="p-2 text-[#5C5552] hover:text-[#8C4A32] hover:bg-[#F2EDE4] rounded-full transition-colors"
                  aria-label="Search bangles"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Link */}
            <button
              id="wishlist-nav-btn"
              onClick={() => handleNavClick('wishlist')}
              className={`p-2 rounded-full transition-colors relative ${
                currentPage === 'wishlist'
                  ? 'text-[#8C4A32] bg-[#F2EDE4]'
                  : 'text-[#5C5552] hover:text-[#8C4A32] hover:bg-[#F2EDE4]'
              }`}
              aria-label="Wishlist"
              title="Saved Bangles"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#8C4A32] text-[#8C4A32]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8C4A32] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Link */}
            <button
              id="cart-nav-btn"
              onClick={() => handleNavClick('cart')}
              className={`flex items-center gap-2 pl-3 pr-4 py-2 rounded-full border transition-all ${
                currentPage === 'cart'
                  ? 'bg-[#8C4A32] text-white border-[#8C4A32] shadow-sm'
                  : 'bg-white hover:bg-[#F2EDE4] text-[#332D2D] border-[#E8E2D9]'
              }`}
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className={`absolute -top-2 -right-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${
                    currentPage === 'cart' ? 'bg-[#FCFAF7] text-[#8C4A32]' : 'bg-[#8C4A32] text-white'
                  }`}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:inline">
                {cartTotal > 0 ? `৳${cartTotal.toLocaleString()}` : 'Cart'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className="relative w-4/5 max-w-sm bg-[#FCFAF7] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#8C4A32] text-white flex items-center justify-center font-serif text-base font-bold">
                    ক
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#8C4A32]">Karighor</h3>
                    <p className="text-[10px] text-[#736B66] uppercase tracking-[0.2em]">Artisan Bangles</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#5C5552] hover:text-[#8C4A32] rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mt-5">
                <div className="flex items-center bg-white border border-[#E8E2D9] rounded-xl px-3 py-2">
                  <Search className="w-4 h-4 text-[#736B66] mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search glass, brass, clay..."
                    className="w-full text-xs text-[#332D2D] focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleNavClick('shop');
                      }
                    }}
                  />
                </div>
              </div>

              {/* Mobile Navigation List */}
              <div className="mt-6 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs uppercase tracking-wider font-medium transition-colors ${
                      currentPage === link.id
                        ? 'bg-[#F2EDE4] text-[#8C4A32] font-bold'
                        : 'text-[#5C5552] hover:bg-[#F2EDE4]'
                    }`}
                  >
                    <div>
                      <span>{link.label}</span>
                      <span className="block text-[10px] text-[#A69E97] font-normal normal-case">{link.bangla}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#A69E97]" />
                  </button>
                ))}
                
                <div className="pt-2 border-t border-[#E8E2D9] mt-4">
                  <button
                    onClick={() => handleNavClick('wishlist')}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-left text-xs uppercase tracking-wider font-medium text-[#5C5552] hover:bg-[#F2EDE4]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className="w-4 h-4 text-[#8C4A32]" />
                      <span>Saved (Wishlist)</span>
                    </div>
                    <span className="text-xs bg-[#8C4A32] text-white px-2 py-0.5 rounded-full font-bold">
                      {wishlistCount}
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick('cart')}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-left text-xs uppercase tracking-wider font-medium text-[#5C5552] hover:bg-[#F2EDE4] mt-1"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag className="w-4 h-4 text-[#8C4A32]" />
                      <span>My Cart ({cartCount})</span>
                    </div>
                    <span className="text-xs font-bold text-[#8C4A32]">
                      ৳{cartTotal.toLocaleString()}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Footer Help */}
            <div className="pt-6 border-t border-[#E8E2D9] text-xs text-[#736B66]">
              <p className="font-semibold text-[#332D2D] flex items-center gap-1.5 mb-1">
                <Phone className="w-3.5 h-3.5 text-[#8C4A32]" /> Order Assistance
              </p>
              <p>Hotline: +880 1712-345678</p>
              <p className="text-[11px] text-[#A69E97] mt-1">Delivery in 64 Districts across Bangladesh</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
