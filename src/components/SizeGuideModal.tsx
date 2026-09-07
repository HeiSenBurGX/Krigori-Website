import React from 'react';
import { X, Check, HelpCircle } from 'lucide-react';
import { BANGLE_SIZE_GUIDE } from '../data/banglesData';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-[#FCFAF7] rounded-2xl max-w-lg w-full border border-[#E8E2D9] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#F2EDE4] bg-white">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#FAF7F2] text-[#8C4A32] rounded-lg border border-[#E8E2D9]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#332D2D]">Bengali Bangle Size Guide</h3>
              <p className="text-xs text-[#736B66]">চুরির সঠিক মাপ জানার উপায়</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Quick Explanation */}
          <div className="bg-white p-4 rounded-xl border border-[#F2EDE4] text-xs text-[#5C5552] leading-relaxed shadow-xs">
            <p className="font-semibold text-[#332D2D] mb-1">How Bengal Bangle Sizes Work:</p>
            Traditional sizes are expressed in inches (e.g. 2-4 means 2 and 4/16 inches inner diameter, approx 2.25").
            Measure an existing bangle that fits comfortably across its inner diameter.
          </div>

          {/* Size Chart Table */}
          <div className="overflow-x-auto rounded-xl border border-[#E8E2D9] bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF7F2] text-[#332D2D] uppercase font-semibold border-b border-[#E8E2D9]">
                <tr>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Inner Diameter</th>
                  <th className="p-2.5">Wrist Fit</th>
                  <th className="p-2.5">Fit Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EDE4]">
                {BANGLE_SIZE_GUIDE.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF7F2]">
                    <td className="p-2.5 font-bold text-[#8C4A32]">{row.size}</td>
                    <td className="p-2.5">{row.innerDiameterMm} ({row.innerDiameterInches})</td>
                    <td className="p-2.5">{row.wristCircumferenceCm}</td>
                    <td className="p-2.5 text-[#736B66]">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Steps */}
          <div className="space-y-2 text-xs text-[#5C5552]">
            <p className="font-semibold text-[#332D2D]">Quick 2-Step Measure:</p>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E8E2D9] text-[#8C4A32] flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
              <p>Place a ruler straight across the center of your favorite bangle to measure its inside circle in millimeters.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E8E2D9] text-[#8C4A32] flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
              <p>If between sizes, we recommend choosing one size up for easy slipping over knuckles.</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#FAF7F2] border-t border-[#F2EDE4] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#8C4A32] hover:bg-[#723C29] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
          >
            Got It, Thanks
          </button>
        </div>
      </div>
    </div>
  );
};
