import React, { useState } from 'react';
import { CartItem, BangleSize, PageView } from '../types';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Check, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: BangleSize, delta: number) => void;
  onRemoveItem: (productId: string, size: BangleSize) => void;
  onClearCart: () => void;
  onNavigate: (page: PageView) => void;
  onOpenCheckout: () => void;
  discount: number;
  onApplyCoupon: (code: string) => { success: boolean; message: string; discountAmount: number };
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  onOpenCheckout,
  discount,
  onApplyCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Free shipping threshold ৳1500
  const freeShippingThreshold = 1500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = onApplyCoupon(couponInput.trim().toUpperCase());
    setCouponFeedback({ success: result.success, message: result.message });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#E8E2D9] mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A32]">
            Review Your Bag
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#332D2D] mt-1">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-[#736B66] mt-1">
            {cartItems.length} {cartItems.length === 1 ? 'bangle item' : 'bangle items'} ready for delivery
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-stone-500 hover:text-rose-700 font-medium flex items-center gap-1.5 self-start sm:self-end transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#F2EDE4] p-12 sm:p-16 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#8C4A32] mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#332D2D]">
            Your Bag is Empty
          </h3>
          <p className="text-xs text-[#736B66] leading-relaxed">
            Discover Bengal’s finest glass churi, terracotta balas, and antique brass bangles to fill your cart.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-3 bg-[#8C4A32] hover:bg-[#723C29] text-white text-xs font-semibold rounded-full shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Handmade Bangles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Progress Indicator */}
            <div className="bg-white p-4 rounded-xl border border-[#F2EDE4] shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#332D2D] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#8C4A32]" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-[#2D463E] font-bold">
                      🎉 You unlocked Free Delivery nationwide!
                    </span>
                  ) : (
                    <span>
                      Add <strong>৳{remainingForFreeShipping.toLocaleString()}</strong> more to get{' '}
                      <strong>FREE Delivery</strong> across Bangladesh!
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-[#8C4A32]">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden border border-[#F2EDE4]">
                <div
                  className="bg-[#8C4A32] h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items Table / Cards */}
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${index}`}
                  className="bg-white p-4 sm:p-5 rounded-xl border border-[#F2EDE4] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-[#FAF7F2] shrink-0 border border-[#F2EDE4]"
                    />
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C4A32]">
                        {item.product.categoryLabel}
                      </span>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-[#332D2D] line-clamp-1">
                        {item.product.name}
                      </h3>
                      {item.product.banglaName && (
                        <p className="text-xs text-[#736B66]">
                          {item.product.banglaName}
                        </p>
                      )}
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="text-xs bg-[#FAF7F2] text-[#5C5552] px-2.5 py-0.5 rounded-full font-semibold border border-[#E8E2D9]">
                          Size: {item.selectedSize}
                        </span>
                        <span className="text-xs text-[#736B66]">
                          ৳{item.product.price.toLocaleString()} each
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F2EDE4]">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#E8E2D9] rounded-full bg-[#FAF7F2] overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                        className="px-3 py-1 text-stone-600 hover:bg-stone-200 text-xs font-bold cursor-pointer"
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-[#332D2D]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                        className="px-3 py-1 text-stone-600 hover:bg-stone-200 text-xs font-bold cursor-pointer"
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[70px]">
                      <span className="font-bold text-sm sm:text-base text-[#332D2D] block">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      className="p-2 text-stone-400 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="text-xs text-[#8C4A32] hover:text-[#723C29] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>← Continue Shopping Bangles</span>
              </button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Coupon Box */}
            <div className="bg-white p-5 rounded-xl border border-[#F2EDE4] shadow-sm space-y-3">
              <label className="text-xs font-bold text-[#332D2D] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#8C4A32]" />
                <span>Have a Discount Promo Code?</span>
              </label>
              
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. BENGAL10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 rounded-xl border border-[#E8E2D9] bg-[#FAF7F2] focus:bg-white uppercase focus:outline-none focus:border-[#8C4A32]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#332D2D] hover:bg-[#8C4A32] text-white text-xs font-semibold rounded-full transition-colors shrink-0 cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponFeedback && (
                <p className={`text-[11px] flex items-center gap-1 ${
                  couponFeedback.success ? 'text-emerald-700 font-semibold' : 'text-rose-700'
                }`}>
                  {couponFeedback.success ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  {couponFeedback.message}
                </p>
              )}

              <p className="text-[10px] text-[#A69E97]">
                Try code <strong className="text-[#8C4A32]">BENGAL10</strong> for 10% off your order!
              </p>
            </div>

            {/* Total Summary */}
            <div className="bg-white p-5 rounded-xl border border-[#F2EDE4] shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-[#332D2D] pb-2 border-b border-[#F2EDE4]">
                Cart Summary
              </h3>

              <div className="space-y-2.5 text-xs text-[#5C5552]">
                <div className="flex justify-between">
                  <span>Cart Subtotal:</span>
                  <span className="font-semibold text-[#332D2D]">৳{subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Discount Applied:</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span className="text-[#332D2D]">
                    {subtotal >= 1500 ? (
                      <strong className="text-[#2D463E]">FREE</strong>
                    ) : (
                      'Calculated at checkout (৳70 - ৳130)'
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#F2EDE4] flex justify-between text-base font-bold text-[#332D2D]">
                  <span>Estimated Subtotal:</span>
                  <span className="text-[#8C4A32]">
                    ৳{Math.max(0, subtotal - discount).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                id="cart-proceed-checkout-btn"
                onClick={onOpenCheckout}
                className="w-full py-3.5 px-4 bg-[#8C4A32] hover:bg-[#723C29] text-white font-bold text-xs rounded-full shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Guarantees */}
              <div className="pt-2 border-t border-[#F2EDE4] space-y-2 text-[11px] text-[#736B66]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2D463E] shrink-0" />
                  <span>Cash on Delivery (COD) available in all 64 districts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C4A32] shrink-0" />
                  <span>Safe bubble wrap & fragile clay cushioning guaranteed</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
