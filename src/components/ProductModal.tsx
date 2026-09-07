import React, { useState } from 'react';
import { BangleProduct, BangleSize } from '../types';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  ShieldCheck, 
  Ruler, 
  Check, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { SizeGuideModal } from './SizeGuideModal';

interface ProductModalProps {
  product: BangleProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isInWishlist: boolean;
  onToggleWishlist: (product: BangleProduct) => void;
  onAddToCart: (product: BangleProduct, size: BangleSize, quantity: number) => void;
  onBuyNow: (product: BangleProduct, size: BangleSize, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<BangleSize>(product.availableSizes[0] || '2.6');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, quantity);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <div 
          className="bg-[#FCFAF7] rounded-2xl max-w-3xl w-full border border-[#E8E2D9] shadow-2xl overflow-hidden my-auto relative animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-black shadow-sm transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Image Gallery */}
            <div className="p-6 bg-[#FAF7F2] flex flex-col justify-between border-r border-[#F2EDE4]">
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-white shadow-xs border border-[#F2EDE4]">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails if gallery > 1 */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                  {product.gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        selectedImage === img
                          ? 'border-[#8C4A32] shadow-xs scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Artisan Origin Tag */}
              <div className="mt-4 p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-[#F2EDE4] text-xs text-[#5C5552] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8C4A32] shrink-0" />
                <span>
                  Crafted in <strong>{product.artisanOrigin}</strong>
                </span>
              </div>
            </div>

            {/* Right: Details & Order Controls */}
            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                {/* Category badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C4A32] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E8E2D9]">
                    {product.categoryLabel}
                  </span>
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-2 rounded-full transition-colors cursor-pointer ${
                      isInWishlist
                        ? 'text-[#8C4A32] bg-rose-50'
                        : 'text-stone-400 hover:text-[#8C4A32] bg-[#FAF7F2]'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-[#8C4A32]' : ''}`} />
                  </button>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#332D2D] leading-snug">
                  {product.name}
                </h2>
                {product.banglaName && (
                  <p className="text-sm text-[#736B66] font-medium mt-1">
                    {product.banglaName}
                  </p>
                )}

                {/* Rating & reviews */}
                <div className="flex items-center gap-2 mt-2 mb-4 text-xs">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-[#332D2D]">{product.rating}</span>
                  <span className="text-[#A69E97]">({product.reviewsCount} customer reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-[#F2EDE4]">
                  <span className="text-2xl font-bold text-[#332D2D]">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-[#736B66] ml-1 bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E8E2D9]">
                    {product.piecesPerSet}
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#5C5552] leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Specifications */}
                <div className="space-y-1.5 text-xs text-[#5C5552] mb-5 bg-[#FAF7F2] p-3 rounded-xl border border-[#F2EDE4]">
                  <p>
                    <strong className="text-[#332D2D]">Materials:</strong> {product.materials}
                  </p>
                  <p>
                    <strong className="text-[#332D2D]">Package Contents:</strong> {product.piecesPerSet}
                  </p>
                  <p>
                    <strong className="text-[#332D2D]">Availability:</strong>{' '}
                    <span className="text-[#2D463E] font-semibold">In Stock (Ready to Dispatch)</span>
                  </p>
                </div>

                {/* Sizing Selection */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#332D2D]">
                      Select Bangle Size (Traditional Bengal):
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(true)}
                      className="text-xs text-[#8C4A32] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" /> Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#8C4A32] text-white border-[#8C4A32] shadow-xs'
                            : 'bg-white text-[#332D2D] border-[#E8E2D9] hover:border-[#8C4A32]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-bold text-[#332D2D]">Quantity (Sets):</span>
                  <div className="flex items-center border border-[#E8E2D9] rounded-full bg-[#FAF7F2] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 text-sm font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-[#332D2D]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 text-sm font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-[#F2EDE4]">
                <div className="flex gap-2">
                  <button
                    id="modal-add-to-cart-btn"
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      addedAnimation
                        ? 'bg-[#2D463E] text-white'
                        : 'bg-[#332D2D] hover:bg-[#201C1C] text-white shadow-sm'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Cart (৳{(product.price * quantity).toLocaleString()})
                      </>
                    )}
                  </button>

                  <button
                    id="modal-buy-now-btn"
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-4 rounded-full text-xs font-semibold bg-[#8C4A32] hover:bg-[#723C29] text-white shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" /> Buy Now
                  </button>
                </div>

                {/* Delivery reassurance */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#736B66]">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#8C4A32]" />
                    <span>Dhaka: 24-48 hrs delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2D463E]" />
                    <span>Cash on delivery available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </>
  );
};
