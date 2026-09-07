import React, { useState, useMemo } from 'react';
import { BangleProduct, BangleCategory, BangleSize } from '../types';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES_LIST } from '../data/banglesData';
import { Search, SlidersHorizontal, ArrowUpDown, X, Filter } from 'lucide-react';

interface ShopViewProps {
  products: BangleProduct[];
  selectedCategory: BangleCategory;
  onSelectCategory: (category: BangleCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: BangleProduct) => void;
  onAddToCart: (product: BangleProduct, size: BangleSize, quantity?: number) => void;
  onViewProduct: (product: BangleProduct) => void;
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onViewProduct,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesBangla = product.banglaName?.toLowerCase().includes(q);
          const matchesOrigin = product.artisanOrigin.toLowerCase().includes(q);
          const matchesCategory = product.categoryLabel.toLowerCase().includes(q);
          const matchesMaterials = product.materials.toLowerCase().includes(q);
          if (!matchesName && !matchesBangla && !matchesOrigin && !matchesCategory && !matchesMaterials) {
            return false;
          }
        }
        // Size filter
        if (selectedSizeFilter !== 'all') {
          if (!product.availableSizes.includes(selectedSizeFilter as BangleSize)) {
            return false;
          }
        }
        // Max price filter
        if (product.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default featured
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, selectedSizeFilter, maxPrice, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('all');
    onSearchChange('');
    setSelectedSizeFilter('all');
    setMaxPrice(3000);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    searchQuery.trim() !== '' || 
    selectedSizeFilter !== 'all' || 
    maxPrice < 3000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="mb-8 pb-6 border-b border-[#E8E2D9]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A32]">
              Artisan Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#332D2D] mt-1">
              Handmade Bangles of Bangladesh
            </h1>
            <p className="text-xs sm:text-sm text-[#736B66] mt-1.5">
              Explore authentic glass churi, terracotta clay, Dhamrai brass, and silk thread sets.
            </p>
          </div>

          {/* Search and Sort controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-semibold text-[#332D2D] focus:outline-none focus:border-[#8C4A32] pr-8 cursor-pointer shadow-2xs"
              >
                <option value="featured">Sort: Featured & Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs font-semibold text-[#332D2D] shadow-2xs"
            >
              <Filter className="w-3.5 h-3.5 text-[#8C4A32]" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#8C4A32]" />
              )}
            </button>
          </div>
        </div>

        {/* Quick Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as BangleCategory)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#8C4A32] text-white shadow-xs'
                  : 'bg-white text-[#5C5552] border border-[#E8E2D9] hover:border-[#8C4A32]'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-amber-100 text-amber-900' : 'bg-[#FAF7F2] text-[#736B66]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filters (Desktop & Mobile Drawer) */}
        <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-5 rounded-xl border border-[#F2EDE4] shadow-sm space-y-6">
            
            {/* Filter Title & Reset */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EDE4]">
              <div className="flex items-center gap-1.5 font-serif font-bold text-base text-[#332D2D]">
                <SlidersHorizontal className="w-4 h-4 text-[#8C4A32]" />
                <span>Refine Collection</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#8C4A32] hover:underline font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="text-xs font-bold text-[#332D2D] block mb-2">
                Search in Catalog
              </label>
              <div className="flex items-center bg-[#FAF7F2] border border-[#E8E2D9] rounded-xl px-3 py-2">
                <Search className="w-3.5 h-3.5 text-[#736B66] mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="e.g. Glass, Clay, Dhamrai..."
                  className="w-full text-xs text-[#332D2D] bg-transparent focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-[#736B66] hover:text-[#332D2D] text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Bangle Sizing Filter */}
            <div>
              <label className="text-xs font-bold text-[#332D2D] block mb-2">
                Bangle Size (Hand Measurement)
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {['all', '2.4', '2.6', '2.8', '2.10'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSizeFilter(size)}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-colors border ${
                      selectedSizeFilter === size
                        ? 'bg-[#8C4A32] text-white border-[#8C4A32]'
                        : 'bg-[#FAF7F2] text-[#5C5552] border-[#E8E2D9] hover:border-[#8C4A32]'
                    }`}
                  >
                    {size === 'all' ? 'All' : size}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#332D2D]">
                  Max Price
                </label>
                <span className="text-xs font-bold text-[#8C4A32]">
                  ৳{maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="350"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8C4A32] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#736B66] mt-1">
                <span>৳350</span>
                <span>৳3,000</span>
              </div>
            </div>

            {/* Artisan Highlights note */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#F2EDE4] text-xs text-[#5C5552] space-y-1">
              <p className="font-bold text-[#332D2D]">✨ 100% Artisan Made</p>
              <p className="text-[11px] leading-relaxed">
                Handcrafted in small batches across craft quarters of Old Dhaka, Rayerbazar, Dhamrai, and Tangail.
              </p>
            </div>

          </div>
        </aside>

        {/* Right Main Product Grid */}
        <main className="lg:col-span-9">
          
          {/* Active Filter Pills Bar */}
          <div className="flex items-center justify-between mb-5 text-xs text-[#736B66]">
            <p>
              Showing <strong className="text-[#332D2D]">{filteredProducts.length}</strong> handcrafted bangles
            </p>

            {hasActiveFilters && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F2EDE4] text-[#8C4A32] font-medium text-[11px]">
                    Category: {selectedCategory}
                    <button onClick={() => onSelectCategory('all')}>✕</button>
                  </span>
                )}
                {selectedSizeFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F2EDE4] text-[#8C4A32] font-medium text-[11px]">
                    Size: {selectedSizeFilter}
                    <button onClick={() => setSelectedSizeFilter('all')}>✕</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F2EDE4] text-[#8C4A32] font-medium text-[11px]">
                    "{searchQuery}"
                    <button onClick={() => onSearchChange('')}>✕</button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onViewProduct={onViewProduct}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#F2EDE4] p-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF7F2] text-[#8C4A32] flex items-center justify-center font-serif text-2xl font-bold">
                ক
              </div>
              <h3 className="font-serif text-xl font-bold text-[#332D2D]">
                No Bangles Found Matching Your Filter
              </h3>
              <p className="text-xs text-[#736B66] max-w-sm mx-auto leading-relaxed">
                Try loosening your filters, changing the size, or resetting search keywords to explore our full collection.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 bg-[#8C4A32] hover:bg-[#723C29] text-white text-xs font-semibold rounded-full transition-colors shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>

      </div>

    </div>
  );
};
