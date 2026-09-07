import React from 'react';
import { PageView } from '../types';
import { Sparkles, Heart, ShieldCheck, Award, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      
      {/* Hero Header */}
      <section className="bg-[#F2EDE4] border-b border-[#E8E2D9] py-14 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A32] mb-2 block">
            Our Artisan Heritage
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#332D2D] leading-tight">
            The Living Art of Bengali Bangles
          </h1>
          <p className="text-xs sm:text-sm text-[#736B66] max-w-2xl mx-auto mt-4 leading-relaxed">
            In Bengal, bangles (চুড়ি) are far more than ornamentation. They are poetry in motion, 
            a rhythm of festive joy, cultural identity, and generational craftsmanship handed down across centuries.
          </p>
        </div>
      </section>

      {/* Origin Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-md border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=80"
                alt="Clay artisan hand-shaping pottery and jewelry in Bengal"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-md border border-[#F2EDE4] max-w-xs hidden sm:block">
              <p className="font-serif text-sm font-bold text-[#332D2D]">
                "Every chime of glass and clay tells a story of perseverance."
              </p>
              <p className="text-[11px] text-[#A69E97] mt-1">— Master Artisan, Rayerbazar Potter Colony</p>
            </div>
          </div>

          <div className="space-y-5 text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A32]">
              Where Tradition Meets Tomorrow
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332D2D]">
              Preserving Ancient Crafts Across Bengal
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5552] leading-relaxed">
              Founded with deep reverence for indigenous Bangladeshi art, <strong>Karighor</strong> 
              collaborates directly with traditional artisanal clusters:
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-white rounded-xl border border-[#F2EDE4] shadow-sm">
                <h4 className="font-serif font-bold text-sm text-[#332D2D]">
                  Chawkbazar Glass Artisans (Old Dhaka)
                </h4>
                <p className="text-xs text-[#736B66] mt-0.5">
                  Generations of fiery kiln masters blow, twist, and polish colored glass tubes into the musical Reshmi churi.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#F2EDE4] shadow-sm">
                <h4 className="font-serif font-bold text-sm text-[#332D2D]">
                  Rayerbazar & Bijoypur Terracotta Potters
                </h4>
                <p className="text-xs text-[#736B66] mt-0.5">
                  Sculpting alluvial riverbed clay, baking them in woodfire kilns, and applying organic Alpona and floral motifs by hand.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#F2EDE4] shadow-sm">
                <h4 className="font-serif font-bold text-sm text-[#332D2D]">
                  Dhamrai Heritage Brass Guild
                </h4>
                <p className="text-xs text-[#736B66] mt-0.5">
                  Keeping the 200-year-old lost-wax casting and hand-chiseling filigree alive in Dhaka’s historic outskirts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#FAF7F2] border-y border-[#E8E2D9] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A32]">
              Our Guiding Principles
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332D2D] mt-1">
              Ethical, Sustainable & Authentic
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-xl border border-[#F2EDE4] shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#8C4A32] mx-auto flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#332D2D]">Fair Artisan Compensation</h3>
              <p className="text-xs text-[#5C5552] leading-relaxed">
                We eliminate exploitative middlemen. Our artisans, primarily rural women and heritage craft families, 
                receive fair, dignified compensation for their intricate labor.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-[#F2EDE4] shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#8C4A32] mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#332D2D]">Pure & Skin-Safe Materials</h3>
              <p className="text-xs text-[#5C5552] leading-relaxed">
                We use organic river clay, non-toxic natural pigments, tempered glass, pure brass, and natural silk. 
                No harsh nickel or toxic industrial residues.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-[#F2EDE4] shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#8C4A32] mx-auto flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#332D2D]">Heritage Bengal Motifs</h3>
              <p className="text-xs text-[#5C5552] leading-relaxed">
                From Jamdani lozenges to Sheuli blooms and Rickshaw art, every design honors authentic 
                traditional symbols of Bengal’s art history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Collage of Craftsmanship */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl overflow-hidden aspect-square border border-[#F2EDE4]">
            <img 
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" 
              alt="Handmade Bangles" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-xl overflow-hidden aspect-square border border-[#F2EDE4]">
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80" 
              alt="Brass filigree craftsmanship" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-xl overflow-hidden aspect-square border border-[#F2EDE4]">
            <img 
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80" 
              alt="Bengali folk art" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-xl overflow-hidden aspect-square border border-[#F2EDE4]">
            <img 
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80" 
              alt="Traditional silk weaving" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Explore CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#F2EDE4] shadow-sm space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#332D2D]">
            Experience the Touch of Handcrafted Tradition
          </h3>
          <p className="text-xs sm:text-sm text-[#736B66] max-w-lg mx-auto">
            Order your curated set of glass, brass, or terracotta bangles with fast nationwide delivery 
            and cash on delivery options across all 64 districts.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3.5 rounded-full bg-[#8C4A32] hover:bg-[#723C29] text-white text-xs sm:text-sm font-medium shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
