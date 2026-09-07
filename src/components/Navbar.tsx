import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PageView, BangleCategory } from '../types';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  Sparkles,
  ChevronRight,
  Home,
  Grid,
  ShieldCheck
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
  onSelectCategory?: (category: BangleCategory) => void;
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
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navLinks: { id: PageView; label: string; bangla: string }[] = [
    { id: 'home', label: 'Home', bangla: 'মূল পাতা' },
    { id: 'shop', label: 'Shop Bangles', bangla: 'সকল কালেকশন' },
    { id: 'about', label: 'Our Heritage', bangla: 'কারিগর ঐতিহ্য' },
    { id: 'contact', label: 'Contact Us', bangla: 'যোগাযোগ ও অর্ডার' },
  ];

  const quickCategories: { id: BangleCategory; label: string; bangla: string }[] = [
    { id: 'all', label: 'All Collections', bangla: 'সকল চুড়ি' },
    { id: 'glass', label: 'Glass Churi', bangla: 'কাঁচের চুড়ি' },
    { id: 'silk-thread', label: 'Reshomi Silk', bangla: 'রেশমি সুতোর চুড়ি' },
    { id: 'terracotta', label: 'Clay & Terracotta', bangla: 'মাটির চুড়ি' },
    { id: 'brass', label: 'Nakshi Brass', bangla: 'পিতল ও কাঁসা' },
    { id: 'bridal', label: 'Bridal Kankan', bangla: 'বিয়ের কঙ্কন' },
  ];

  // Lock body scroll when mobile drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setShowSearchInput(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category: BangleCategory) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    onNavigate('shop');
    setMobileMenuOpen(false);
    setShowSearchInput(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('shop');
    setMobileMenuOpen(false);
    setShowSearchInput(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
        {/* Top Announcement Bar */}
        <div className="bg-[#8C4A32] text-[#FCFAF7] text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center tracking-wide flex items-center justify-center gap-1.5 sm:gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F2EDE4] shrink-0 animate-pulse" />
          <span className="truncate">
            Free Delivery nationwide on orders over <strong>৳1,500</strong> | Hotline: <strong>+880 1712-345678</strong>
          </span>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center lg:hidden">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(true)}
                className="w-11 h-11 -ml-1 rounded-xl flex items-center justify-center text-[#5C5552] hover:text-[#8C4A32] hover:bg-[#F2EDE4]/80 active:bg-[#E8E2D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8C4A32]/20"
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center min-w-0">
              <button
                id="brand-logo-btn"
                onClick={() => handleNavClick('home')}
                className="text-left group flex items-center gap-2 sm:gap-3 cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8C4A32] text-white flex items-center justify-center font-serif text-lg sm:text-xl font-bold shadow-sm group-hover:bg-[#723C29] transition-colors shrink-0">
                  ক
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#8C4A32] truncate">
                      KARIGHOR
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#5C5552] font-light tracking-wider uppercase font-sans shrink-0">
                      কারিঘর
                    </span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-[#A69E97] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium truncate hidden xs:block">
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
            <div className="flex items-center space-x-1.5 sm:space-x-4">
              {/* Desktop Search Trigger / Input */}
              <div className="relative">
                {showSearchInput ? (
                  <div className="hidden lg:flex items-center bg-[#FCFAF7] border border-[#E8E2D9] rounded-full px-3 py-1.5 shadow-sm w-60 transition-all">
                    <Search className="w-4 h-4 text-[#736B66] mr-2 shrink-0" />
                    <input
                      type="text"
                      maxLength={80}
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
                      className="text-[#736B66] hover:text-[#332D2D] text-xs font-bold ml-1 px-1"
                      aria-label="Close search"
                    >
                      ✕
                    </button>
                  </div>
                ) : null}

                {/* Search Toggle Icon */}
                <button
                  id="search-icon-btn"
                  onClick={() => {
                    setShowSearchInput(!showSearchInput);
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    showSearchInput 
                      ? 'bg-[#8C4A32] text-white' 
                      : 'text-[#5C5552] hover:text-[#8C4A32] hover:bg-[#F2EDE4]'
                  }`}
                  aria-label="Search bangles"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Wishlist Link */}
              <button
                id="wishlist-nav-btn"
                onClick={() => handleNavClick('wishlist')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors relative ${
                  currentPage === 'wishlist'
                    ? 'text-[#8C4A32] bg-[#F2EDE4]'
                    : 'text-[#5C5552] hover:text-[#8C4A32] hover:bg-[#F2EDE4]'
                }`}
                aria-label="Wishlist"
                title="Saved Bangles"
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#8C4A32] text-[#8C4A32]' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#8C4A32] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Link */}
              <button
                id="cart-nav-btn"
                onClick={() => handleNavClick('cart')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:pl-3 sm:pr-4 py-2 rounded-full border transition-all ${
                  currentPage === 'cart'
                    ? 'bg-[#8C4A32] text-white border-[#8C4A32] shadow-sm'
                    : 'bg-white hover:bg-[#F2EDE4] text-[#332D2D] border-[#E8E2D9]'
                }`}
                aria-label="Shopping Cart"
              >
                <div className="relative flex items-center justify-center">
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

        {/* Mobile Dropdown Search Bar */}
        {showSearchInput && (
          <div className="lg:hidden border-t border-[#E8E2D9] bg-white px-4 py-3 shadow-md animate-in fade-in slide-in-from-top-1 duration-200">
            <form onSubmit={handleMobileSearchSubmit} className="flex items-center gap-2">
              <div className="flex-1 flex items-center bg-[#FCFAF7] border border-[#E8E2D9] rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-[#736B66] mr-2 shrink-0" />
                <input
                  type="text"
                  maxLength={80}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search glass, terracotta, nakshi..."
                  className="w-full text-xs text-[#332D2D] placeholder-[#A69E97] bg-transparent focus:outline-none"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#8C4A32] text-white rounded-xl text-xs font-semibold hover:bg-[#723C29] transition-colors shrink-0 cursor-pointer"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSearchInput(false);
                  onSearchChange('');
                }}
                className="p-2 text-[#736B66] hover:text-[#332D2D] rounded-lg"
                aria-label="Dismiss search"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu - Rendered via Portal directly into document.body to bypass header stacking context */}
      {typeof document !== 'undefined' && createPortal(
        <div 
          className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-300 ${
            mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Dimmed Overlay / Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu backdrop"
          />

          {/* Drawer Slide-out Container */}
          <aside 
            className={`relative z-10 w-[85vw] max-w-sm bg-[#FCFAF7] h-full shadow-2xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8C4A32] text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                    ক
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#8C4A32] leading-tight">
                      Karighor
                    </h3>
                    <p className="text-[10px] text-[#736B66] uppercase tracking-[0.2em] font-medium">
                      কারিঘর চুড়ি সংগ্রহ
                    </p>
                  </div>
                </div>

                <button 
                  id="mobile-drawer-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#5C5552] hover:text-[#8C4A32] bg-white hover:bg-[#F2EDE4] rounded-full border border-[#E8E2D9] transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Search Bar */}
              <div className="mt-4">
                <form onSubmit={handleMobileSearchSubmit} className="flex items-center bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 shadow-xs focus-within:border-[#8C4A32] focus-within:ring-2 focus-within:ring-[#8C4A32]/10 transition-all">
                  <Search className="w-4 h-4 text-[#736B66] mr-2 shrink-0" />
                  <input
                    type="text"
                    maxLength={80}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search glass, terracotta, brass..."
                    className="w-full text-xs text-[#332D2D] placeholder-[#A69E97] focus:outline-none bg-transparent"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      className="text-xs text-[#736B66] hover:text-black mr-2 font-bold px-1"
                    >
                      ✕
                    </button>
                  )}
                  <button
                    type="submit"
                    className="text-[11px] font-semibold text-[#8C4A32] hover:text-[#723C29] shrink-0"
                  >
                    Go
                  </button>
                </form>
              </div>

              {/* Main Navigation Pages */}
              <div className="mt-5 space-y-1.5">
                <p className="text-[10px] font-bold text-[#A69E97] uppercase tracking-[0.15em] px-2 mb-2">
                  Navigation
                </p>
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs uppercase tracking-wider font-medium transition-all ${
                      currentPage === link.id
                        ? 'bg-[#8C4A32] text-white shadow-xs font-bold'
                        : 'text-[#5C5552] hover:bg-[#F2EDE4] active:bg-[#E8E2D9]'
                    }`}
                  >
                    <div>
                      <span className="font-semibold">{link.label}</span>
                      <span className={`block text-[10px] font-normal normal-case mt-0.5 ${
                        currentPage === link.id ? 'text-[#F2EDE4]' : 'text-[#A69E97]'
                      }`}>
                        {link.bangla}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${currentPage === link.id ? 'text-white' : 'text-[#A69E97]'}`} />
                  </button>
                ))}
              </div>

              {/* Popular Collections / Categories */}
              <div className="mt-5 pt-4 border-t border-[#E8E2D9]">
                <p className="text-[10px] font-bold text-[#A69E97] uppercase tracking-[0.15em] px-2 mb-2">
                  Popular Collections / চুড়ির ধরণ
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {quickCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="p-2.5 rounded-xl bg-white border border-[#E8E2D9] text-left hover:border-[#8C4A32] hover:bg-[#F2EDE4]/60 active:bg-[#F2EDE4] transition-all"
                    >
                      <span className="block text-xs font-semibold text-[#332D2D] leading-tight">
                        {cat.label}
                      </span>
                      <span className="block text-[10px] text-[#8C4A32] font-medium mt-0.5">
                        {cat.bangla}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions: Wishlist & Cart */}
              <div className="mt-5 pt-4 border-t border-[#E8E2D9] space-y-2">
                <button
                  onClick={() => handleNavClick('wishlist')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs uppercase tracking-wider font-medium transition-colors ${
                    currentPage === 'wishlist' ? 'bg-[#F2EDE4] text-[#8C4A32] font-bold' : 'text-[#5C5552] hover:bg-[#F2EDE4] bg-white border border-[#E8E2D9]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-[#8C4A32] fill-[#8C4A32]/20" />
                    <span>Saved Wishlist (সংরক্ষিত)</span>
                  </div>
                  <span className="text-xs bg-[#8C4A32] text-white px-2 py-0.5 rounded-full font-bold">
                    {wishlistCount}
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('cart')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs uppercase tracking-wider font-medium transition-colors ${
                    currentPage === 'cart' ? 'bg-[#F2EDE4] text-[#8C4A32] font-bold' : 'text-[#5C5552] hover:bg-[#F2EDE4] bg-white border border-[#E8E2D9]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-[#8C4A32]" />
                    <span>Shopping Cart ({cartCount})</span>
                  </div>
                  <span className="text-xs font-bold text-[#8C4A32]">
                    ৳{cartTotal.toLocaleString()}
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Footer Help & Customer Support */}
            <div className="pt-5 border-t border-[#E8E2D9] text-xs text-[#736B66] mt-6">
              <div className="bg-white p-3 rounded-xl border border-[#E8E2D9] mb-3">
                <a 
                  href="tel:+8801712345678"
                  className="font-bold text-[#332D2D] flex items-center gap-2 text-xs hover:text-[#8C4A32] transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#8C4A32]/10 flex items-center justify-center text-[#8C4A32]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span>Call or WhatsApp: 01712-345678</span>
                </a>
                <p className="text-[10px] text-[#A69E97] mt-1 pl-8">
                  Available daily 10:00 AM - 10:00 PM
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#736B66]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cash on Delivery across 64 Districts</span>
              </div>
            </div>
          </aside>
        </div>,
        document.body
      )}

      {/* Mobile Bottom Navigation Bar - Convenient thumb-friendly navigation */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E2D9] px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-around"
        aria-label="Quick mobile bottom navigation"
      >
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition-colors ${
            currentPage === 'home' ? 'text-[#8C4A32] font-bold' : 'text-[#736B66] hover:text-[#332D2D]'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${currentPage === 'home' ? 'stroke-[2.5]' : ''}`} />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavClick('shop')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition-colors ${
            currentPage === 'shop' ? 'text-[#8C4A32] font-bold' : 'text-[#736B66] hover:text-[#332D2D]'
          }`}
        >
          <Grid className={`w-5 h-5 mb-0.5 ${currentPage === 'shop' ? 'stroke-[2.5]' : ''}`} />
          <span>Shop</span>
        </button>

        <button
          onClick={() => handleNavClick('wishlist')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition-colors relative ${
            currentPage === 'wishlist' ? 'text-[#8C4A32] font-bold' : 'text-[#736B66] hover:text-[#332D2D]'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 mb-0.5 ${wishlistCount > 0 ? 'fill-[#8C4A32] text-[#8C4A32]' : ''} ${currentPage === 'wishlist' ? 'stroke-[2.5]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#8C4A32] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span>Saved</span>
        </button>

        <button
          onClick={() => handleNavClick('cart')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition-colors relative ${
            currentPage === 'cart' ? 'text-[#8C4A32] font-bold' : 'text-[#736B66] hover:text-[#332D2D]'
          }`}
        >
          <div className="relative">
            <ShoppingBag className={`w-5 h-5 mb-0.5 ${currentPage === 'cart' ? 'stroke-[2.5]' : ''}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#8C4A32] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition-colors ${
            mobileMenuOpen ? 'text-[#8C4A32] font-bold' : 'text-[#736B66] hover:text-[#332D2D]'
          }`}
          aria-label="Open full drawer menu"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span>Menu</span>
        </button>
      </nav>
    </>
  );
};
