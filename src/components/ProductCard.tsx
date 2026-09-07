import React, { useState } from 'react';
import { BangleProduct, BangleSize } from '../types';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: BangleProduct;
  isInWishlist: boolean;
  onToggleWishlist: (product: BangleProduct) => void;
  onAddToCart: (product: BangleProduct, size: BangleSize, quantity?: number) => void;
  onViewProduct: (product: BangleProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
  onViewProduct,
}) => {
  const [selectedSize, setSelectedSize] = useState<BangleSize>(product.availableSizes[0] || '2.6');
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onViewProduct(product)}
      className="group bg-white rounded-xl border border-[#F2EDE4] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-[#FAF7F2] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isBestSeller && (
            <span className="bg-[#8C4A32] text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-xs">
              Best Seller
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#C05E42] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="bg-[#2D463E] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-xs">
              New Craft
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isInWishlist
              ? 'bg-[#8C4A32] text-white'
              : 'bg-white/80 hover:bg-white text-[#5C5552] hover:text-[#8C4A32]'
          }`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Hover Pill */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-white/95 text-[#332D2D] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-[#E8E2D9]">
            <Eye className="w-3.5 h-3.5 text-[#8C4A32]" /> Quick Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Origin and Category Tag */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-[#736B66] mb-1">
            <span className="uppercase tracking-widest font-medium truncate">{product.categoryLabel}</span>
            <span className="text-[#A69E97] shrink-0 font-normal">{product.artisanOrigin.split(',')[0]}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base font-semibold text-[#332D2D] group-hover:text-[#8C4A32] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Bengali Subtitle */}
          {product.banglaName && (
            <p className="text-xs text-[#5C5552] font-medium mt-0.5 mb-1.5 truncate">
              {product.banglaName}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs mb-3">
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
            <span className="font-semibold text-[#332D2D] text-xs">{product.rating}</span>
            <span className="text-[#A69E97] text-[11px]">({product.reviewsCount})</span>
          </div>
        </div>

        <div>
          {/* Size Selector */}
          <div className="mb-3 pt-2 border-t border-[#F2EDE4]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-1 text-[11px]">
              <span className="text-[#5C5552] font-medium">Bangle Size:</span>
              <span className="text-[#8C4A32] font-semibold">{selectedSize}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`flex-1 py-1 text-xs font-semibold rounded-md transition-colors ${
                    selectedSize === size
                      ? 'bg-[#8C4A32] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#5C5552] hover:bg-[#F2EDE4]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Add to Cart Button */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-[#8C4A32]">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#A69E97] line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#736B66] block -mt-0.5">
                {product.piecesPerSet}
              </span>
            </div>

            <button
              id={`add-to-cart-${product.id}`}
              onClick={handleAddToCart}
              className={`p-2.5 rounded-lg font-medium text-xs flex items-center justify-center transition-all ${
                justAdded
                  ? 'bg-[#2D463E] text-white'
                  : 'bg-[#332D2D] hover:bg-[#8C4A32] text-white shadow-xs'
              }`}
              title="Add to Cart"
            >
              {justAdded ? (
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4" /> Added
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4" /> Add
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
