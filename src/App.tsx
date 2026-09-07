import React, { useState, useEffect, useRef } from 'react';
import { 
  BangleProduct, 
  BangleCategory, 
  BangleSize, 
  CartItem, 
  PageView 
} from './types';
import { BANGLES_PRODUCTS } from './data/banglesData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { WishlistView } from './views/WishlistView';
import { CartView } from './views/CartView';
import { CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<BangleCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist persistence with strict schema validation against corrupt/tampered state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('karighor_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item): item is CartItem => (
        Boolean(item) &&
        typeof item === 'object' &&
        Boolean(item.product) &&
        typeof item.product.id === 'string' &&
        typeof item.product.name === 'string' &&
        typeof item.product.price === 'number' &&
        item.product.price >= 0 &&
        typeof item.quantity === 'number' &&
        item.quantity > 0 &&
        item.quantity <= 100 &&
        typeof item.selectedSize === 'string'
      ));
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('karighor_wishlist');
      if (!saved) return ['bangle-01', 'bangle-04'];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return ['bangle-01', 'bangle-04'];
      return parsed.filter((id): id is string => typeof id === 'string' && id.length < 50);
    } catch {
      return ['bangle-01', 'bangle-04'];
    }
  });

  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string>('');

  // Modals
  const [modalProduct, setModalProduct] = useState<BangleProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<{ text: string; icon?: 'cart' | 'wishlist' } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('karighor_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Unable to persist cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('karighor_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Unable to persist wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (text: string, icon: 'cart' | 'wishlist' = 'cart') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage({ text, icon });
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: BangleCategory) => {
    setSelectedCategory(cat);
  };

  // Cart Handlers
  const handleAddToCart = (product: BangleProduct, size: BangleSize, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, quantity }];
      }
    });

    showToast(`Added "${product.name}" (Size ${size}) to Cart`, 'cart');
  };

  const handleBuyNow = (product: BangleProduct, size: BangleSize, quantity: number = 1) => {
    handleAddToCart(product, size, quantity);
    setModalProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: BangleSize, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveItem = (productId: string, size: BangleSize) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
    setDiscountAmount(0);
    setAppliedCouponCode('');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: BangleProduct) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Wishlist`, 'wishlist');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to Wishlist`, 'wishlist');
        return [...prev, product.id];
      }
    });
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
  };

  // Coupon handling
  const handleApplyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (clean === 'BENGAL10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      setAppliedCouponCode(clean);
      return { success: true, message: `10% discount applied! Saved ৳${discount}`, discountAmount: discount };
    } else if (clean === 'BOISHAKH') {
      const discount = Math.min(subtotal, 100);
      setDiscountAmount(discount);
      setAppliedCouponCode(clean);
      return { success: true, message: `Boishakh special ৳100 discount applied!`, discountAmount: discount };
    } else {
      return { success: false, message: 'Invalid coupon code. Try "BENGAL10"', discountAmount: 0 };
    }
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistProducts = BANGLES_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-[#332D2D] font-sans selection:bg-[#8C4A32]/15 selection:text-[#8C4A32]">
      
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#332D2D] text-white px-4 py-3 rounded-full shadow-xl border border-[#4D4545] flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-sm">
          {toastMessage.icon === 'wishlist' ? (
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="line-clamp-1">{toastMessage.text}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartItemCount}
        cartTotal={cartTotal}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSearch={() => {
          handleNavigate('shop');
        }}
        onSelectCategory={(cat) => {
          handleSelectCategory(cat);
          handleNavigate('shop');
        }}
      />

      {/* Page Content */}
      <div className="flex-1 pb-16 lg:pb-0">
        {currentPage === 'home' && (
          <HomeView
            products={BANGLES_PRODUCTS}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onViewProduct={(p) => setModalProduct(p)}
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentPage === 'shop' && (
          <ShopView
            products={BANGLES_PRODUCTS}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onViewProduct={(p) => setModalProduct(p)}
          />
        )}

        {currentPage === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactView />
        )}

        {currentPage === 'wishlist' && (
          <WishlistView
            wishlistProducts={wishlistProducts}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onViewProduct={(p) => setModalProduct(p)}
            onNavigate={handleNavigate}
            onClearWishlist={handleClearWishlist}
          />
        )}

        {currentPage === 'cart' && (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            discount={discountAmount}
            onApplyCoupon={handleApplyCoupon}
          />
        )}
      </div>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={(cat) => handleSelectCategory(cat as BangleCategory)}
      />

      {/* Product Quick View / Detail Modal */}
      <ProductModal
        product={modalProduct}
        isOpen={Boolean(modalProduct)}
        onClose={() => setModalProduct(null)}
        isInWishlist={modalProduct ? wishlistIds.includes(modalProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Secure Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={cartTotal}
        discount={discountAmount}
        onClearCart={handleClearCart}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
