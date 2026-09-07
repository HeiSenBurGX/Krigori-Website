import React, { useState } from 'react';
import { BangleProduct, BangleSize, PageView } from '../types';
import { Heart, ShoppingBag, Trash2, ArrowRight, Star, Sparkles } from 'lucide-react';

interface WishlistViewProps {
  wishlistProducts: BangleProduct[];
  onToggleWishlist: (product: BangleProduct) => void;
  onAddToCart: (product: BangleProduct, size: BangleSize, quantity?: number) => void;
  onViewProduct: (product: BangleProduct) => void;
  onNavigate: (page: PageView) => void;
  onClearWishlist: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistProducts,
  onToggleWishlist,
  onAddToCart,
  onViewProduct,
  onNavigate,
  onClearWishlist,
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, BangleSize>>({});

  const handleSizeChange = (productId: string, size: BangleSize) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#E8E2D9] mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A32]">
            Your Curated Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#332D2D] mt-1">
            Saved Bangles (Wishlist)
          </h1>
          <p className="text-xs sm:text-sm text-[#736B66] mt-1">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={onClearWishlist}
            className="text-xs text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1.5 self-start sm:self-end cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#F2EDE4] p-12 sm:p-16 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#8C4A32] mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#332D2D]">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-[#736B66] leading-relaxed">
            Discover Bengal’s finest glass churi, terracotta balas, and antique brass bangles to add to your wishlist.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-3 bg-[#8C4A32] hover:bg-[#723C29] text-white text-xs font-semibold rounded-full shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Bangles Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || product.availableSizes[0] || '2.6';
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#F2EDE4] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div 
                    onClick={() => onViewProduct(product)}
                    className="relative aspect-square w-full bg-[#FAF7F2] overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-rose-600 shadow-sm transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C4A32]">
                      {product.categoryLabel}
                    </span>
                    <h3 
                      onClick={() => onViewProduct(product)}
                      className="font-serif font-bold text-sm text-[#332D2D] hover:text-[#8C4A32] cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    {product.banglaName && (
                      <p className="text-xs text-[#736B66] truncate">
                        {product.banglaName}
                      </p>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-base font-bold text-[#332D2D]">
                        ৳{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-400 line-through">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Sizing selector */}
                    <div className="pt-2">
                      <label className="text-[11px] font-medium text-[#5C5552] block mb-1">
                        Size: <strong className="text-[#8C4A32]">{currentSize}</strong>
                      </label>
                      <div className="flex gap-1">
                        {product.availableSizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeChange(product.id, size)}
                            className={`flex-1 py-1 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                              currentSize === size
                                ? 'bg-[#8C4A32] text-white border-[#8C4A32]'
                                : 'bg-[#FAF7F2] text-[#332D2D] border-[#E8E2D9] hover:border-[#8C4A32]'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onAddToCart(product, currentSize, 1)}
                    className="w-full py-2.5 bg-[#332D2D] hover:bg-[#8C4A32] text-white text-xs font-semibold rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
