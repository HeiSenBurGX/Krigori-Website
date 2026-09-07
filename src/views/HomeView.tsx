import React from 'react';
import { BangleProduct, BangleCategory, BangleSize, PageView } from '../types';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES_LIST } from '../data/banglesData';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  HeartHandshake, 
  Star, 
  MapPin, 
  ChevronRight 
} from 'lucide-react';

interface HomeViewProps {
  products: BangleProduct[];
  wishlistIds: string[];
  onToggleWishlist: (product: BangleProduct) => void;
  onAddToCart: (product: BangleProduct, size: BangleSize, quantity?: number) => void;
  onViewProduct: (product: BangleProduct) => void;
  onNavigate: (page: PageView) => void;
  onSelectCategory: (category: BangleCategory) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onViewProduct,
  onNavigate,
  onSelectCategory,
}) => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const featuredCrafts = products.filter((p) => !p.isBestSeller || p.isNew).slice(0, 4);

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId as BangleCategory);
    onNavigate('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div className="bg-[#F7F3EC] rounded-3xl border border-[#EAE3D9] p-6 sm:p-10 lg:p-12 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Typography & Story */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              {/* Refined Cultural Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E8E2D9] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#8C4A32] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C4A32]">
                  ঐতিহ্যবাহী কারিগরি চুড়ি • Handcrafted in Bengal
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#332D2D] leading-[1.15] tracking-tight">
                The Timeless Grace of <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#8C4A32]">Handcrafted</span> Bengal Bangles
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#736B66] leading-relaxed max-w-xl">
                Discover resonant glass reshmi churi from legendary Chawkbazar kilns, 200-year-old lost-wax Dhamrai brass balas, and hand-painted Rayerbazar clay jewelry—lovingly shaped by generational craftswomen across Bangladesh.
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  id="hero-shop-all-btn"
                  onClick={() => {
                    onSelectCategory('all');
                    onNavigate('shop');
                  }}
                  className="px-8 py-3.5 bg-[#8C4A32] hover:bg-[#723C29] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md shadow-[#8C4A32]/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>Explore Bangle Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-heritage-btn"
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3.5 bg-white hover:bg-[#FAF7F2] text-[#332D2D] text-xs sm:text-sm font-semibold rounded-full border border-[#E8E2D9] transition-colors cursor-pointer"
                >
                  Our Artisan Heritage
                </button>
              </div>

              {/* Quick Category Chips */}
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-[#A69E97] uppercase tracking-wider mb-2">
                  Popular Styles:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Glass Reshmi', cat: 'glass' },
                    { label: 'Terracotta Clay', cat: 'terracotta' },
                    { label: 'Antique Brass', cat: 'brass' },
                    { label: 'Silk Thread', cat: 'silk-thread' },
                  ].map((chip) => (
                    <button
                      key={chip.cat}
                      onClick={() => handleCategoryClick(chip.cat)}
                      className="text-xs px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D9] text-[#5C5552] hover:text-[#8C4A32] hover:border-[#8C4A32] transition-colors cursor-pointer"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-[#E8E2D9]/80 flex flex-wrap items-center gap-6 text-xs text-[#5C5552]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C4A32] shrink-0" />
                  <span>100% Generational Craft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8C4A32] shrink-0" />
                  <span>Cash on Delivery (64 Districts)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2D463E] shrink-0" />
                  <span>Standard Sizes (2.2 — 2.10)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E8E2D9] bg-white group">
                
                {/* Main Artisan Showcase Image */}
                <div className="aspect-4/5 sm:aspect-square lg:aspect-4/5 w-full overflow-hidden bg-[#FAF7F2]">
                  <img
                    src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85"
                    alt="Artisanal Bengali Bangles"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  />
                </div>

                {/* Cultural Origin Badge */}
                <div className="absolute top-4 right-4 bg-[#2D463E]/95 backdrop-blur-xs text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
                  Old Dhaka & Dhamrai
                </div>

                {/* Bottom Floating Glass Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/70 shadow-lg flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[11px] font-bold text-[#332D2D] ml-1">4.9 (128 reviews)</span>
                    </div>
                    <p className="font-serif font-bold text-xs sm:text-sm text-[#332D2D] truncate">
                      Chawkbazar Classic Reshmi Churi
                    </p>
                    <p className="text-[11px] text-[#736B66]">
                      24 Pieces Set • ৳380
                    </p>
                  </div>

                  <button
                    id="hero-quick-view-bestseller"
                    onClick={() => {
                      const sample = products.find(p => p.id === 'bangle-01') || products[0];
                      if (sample) onViewProduct(sample);
                    }}
                    className="px-3.5 py-2 bg-[#8C4A32] hover:bg-[#723C29] text-white text-xs font-semibold rounded-full shrink-0 transition-colors shadow-xs cursor-pointer"
                  >
                    Quick View
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Product Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E8E2D9]">
          <div>
            <span className="text-xs font-bold text-[#8C4A32] uppercase tracking-[0.2em]">
              Artisan Guilds & Crafts
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332D2D] mt-1">
              Shop by Bangles Category
            </h2>
          </div>
          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigate('shop');
            }}
            className="text-xs font-bold text-[#8C4A32] uppercase tracking-widest border-b-2 border-[#8C4A32] pb-1 mt-2 sm:mt-0 flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES_LIST.filter(c => c.id !== 'all').map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group bg-white rounded-xl p-4 border border-[#F2EDE4] hover:border-[#8C4A32] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 border-2 border-[#FAF7F2] group-hover:border-[#8C4A32] transition-colors shadow-xs">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-xs sm:text-sm font-bold text-[#332D2D] group-hover:text-[#8C4A32] transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[11px] text-[#A69E97] mt-0.5 uppercase tracking-wider">
                {cat.count} Designs
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E8E2D9]">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 bg-[#F2EDE4] text-[#8C4A32] rounded-md text-xs">
                <Star className="w-3.5 h-3.5 fill-[#8C4A32] text-[#8C4A32]" />
              </span>
              <span className="text-xs font-bold text-[#8C4A32] uppercase tracking-[0.2em]">
                Customer Favorites
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332D2D] mt-1">
              Artisan Highlights & Best Sellers
            </h2>
          </div>
          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigate('shop');
            }}
            className="text-xs font-bold text-[#8C4A32] uppercase tracking-widest border-b-2 border-[#8C4A32] pb-1 mt-2 sm:mt-0 flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Shop</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
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
      </section>

      {/* 4. Bengal Artisan Heritage Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D463E] rounded-2xl overflow-hidden text-white border border-[#233832] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center space-y-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                Artisan Story & Fair Trade
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Keeping the Handcrafted Soul of Bengal Alive
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
                In an era of mass-produced plastic jewelry, Karighor supports generational pottery families 
                in Rayerbazar and ancient brass masters in Dhamrai. Each bangle preserves indigenous Bengali 
                motifs—from Alpona spirals to Jamdani weaves—empowering rural women artisans with dignified wages.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Non-toxic natural clay & pure brass</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <HeartHandshake className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Fair compensation for craftswomen</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-full bg-[#8C4A32] hover:bg-[#723C29] text-white font-medium text-xs transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Read Our Artisan Heritage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
                alt="Bengal clay artisan handcrafting bangles"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D463E]/60 to-transparent lg:hidden" />
            </div>

          </div>
        </div>
      </section>

      {/* 5. Trending New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E8E2D9]">
          <div>
            <span className="text-xs font-bold text-[#8C4A32] uppercase tracking-[0.2em]">
              Hand-carved & Thread-wound
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332D2D] mt-1">
              New Craft Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigate('shop');
            }}
            className="text-xs font-bold text-[#8C4A32] uppercase tracking-widest border-b-2 border-[#8C4A32] pb-1 mt-2 sm:mt-0 flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
          >
            <span>Explore All New Bangles</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCrafts.map((product) => (
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
      </section>

      {/* 6. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#8C4A32] uppercase tracking-[0.2em]">
            Loved Across Bengal
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332D2D] mt-1">
            Words from Bangle Enthusiasts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#F2EDE4] shadow-sm space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-[#5C5552] leading-relaxed italic">
              "The chime of these Chawkbazar glass churis took me back to my childhood in Old Dhaka! 
              The package arrived in eco-friendly earthen straw, completely intact. Will order again for Boishakh!"
            </p>
            <div className="pt-2 border-t border-[#F2EDE4]">
              <p className="font-bold text-xs text-[#332D2D]">Nusrat Jahan</p>
              <p className="text-[11px] text-[#A69E97]">Dhanmondi, Dhaka</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#F2EDE4] shadow-sm space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-[#5C5552] leading-relaxed italic">
              "The Dhamrai brass peacock kankan has weight and authentic antique engraving that you can't find in modern malls. 
              bKash payment was smooth and delivery to Chittagong took just 2 days."
            </p>
            <div className="pt-2 border-t border-[#F2EDE4]">
              <p className="font-bold text-xs text-[#332D2D]">Samira Ahmed</p>
              <p className="text-[11px] text-[#A69E97]">Nasirabad, Chittagong</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#F2EDE4] shadow-sm space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-[#5C5552] leading-relaxed italic">
              "The Rayerbazar hand-painted clay bala pair is a piece of art. Sizing was exact according to the guide table. 
              Wonderful to see genuine Bengali artisan work online!"
            </p>
            <div className="pt-2 border-t border-[#F2EDE4]">
              <p className="font-bold text-xs text-[#332D2D]">Tahmina Rahman</p>
              <p className="text-[11px] text-[#A69E97]">Zindabazar, Sylhet</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
