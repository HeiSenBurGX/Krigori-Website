import React, { useState } from 'react';
import { CartItem, OrderDetails, PageView } from '../types';
import { BANGLADESH_DISTRICTS } from '../data/banglesData';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  Phone, 
  MapPin, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  onClearCart: () => void;
  onNavigate: (page: PageView) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discount,
  onClearCart,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'checkout' | 'confirmed'>('checkout');

  // Customer Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    district: 'Dhaka',
    address: '',
    deliveryType: 'dhaka' as 'dhaka' | 'outside',
    paymentMethod: 'cod' as 'bkash' | 'nagad' | 'cod' | 'card',
    bkashNumber: '',
    trxId: '',
    notes: '',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Delivery Fee Calculation
  // Orders >= 1500 get Free shipping!
  const isFreeDelivery = subtotal >= 1500;
  const deliveryFee = isFreeDelivery 
    ? 0 
    : formData.deliveryType === 'dhaka' 
      ? 70 
      : 130;

  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dist = e.target.value;
    const isDhaka = dist.toLowerCase() === 'dhaka';
    setFormData((prev) => ({
      ...prev,
      district: dist,
      deliveryType: isDhaka ? 'dhaka' : 'outside',
    }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 11) {
      setErrorMsg('Please enter a valid 11-digit Bangladeshi mobile number (e.g. 017xxxxxxxx).');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg('Please provide your complete street address for courier delivery.');
      return;
    }

    if (formData.paymentMethod === 'bkash' && !formData.trxId.trim() && !formData.bkashNumber.trim()) {
      setErrorMsg('Please enter your bKash mobile number and Transaction ID (TrxID).');
      return;
    }

    setIsSubmitting(true);

    // Simulate instant bank-level SSL processing
    setTimeout(() => {
      const orderId = `KBD-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderId,
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        district: formData.district,
        deliveryType: formData.deliveryType,
        deliveryFee,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.trxId || undefined,
        items: [...cartItems],
        subtotal,
        discount,
        total: finalTotal,
        orderDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        notes: formData.notes,
        status: 'confirmed',
      };

      setConfirmedOrder(order);
      setIsSubmitting(false);
      setStep('confirmed');
      onClearCart();
    }, 1200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-[#FCFAF7] rounded-2xl max-w-4xl w-full border border-[#E8E2D9] shadow-2xl overflow-hidden my-auto relative max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F2EDE4] bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8C4A32] text-white flex items-center justify-center font-serif text-sm font-bold">
              ক
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#332D2D]">
                {step === 'checkout' ? 'Secure Checkout' : 'Order Confirmed'}
              </h3>
              <p className="text-[11px] text-[#736B66] flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#2D463E]" />
                256-Bit SSL Encrypted Verification • Bangladesh Courier
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {step === 'checkout' ? (
            <form onSubmit={handlePlaceOrder}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Form: Delivery & Payment Details */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {errorMsg && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* 1. Customer Info */}
                  <div className="bg-white p-5 rounded-xl border border-[#F2EDE4] shadow-sm space-y-4">
                    <h4 className="font-serif font-bold text-sm text-[#332D2D] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#8C4A32]" />
                      <span>1. Customer & Delivery Address</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-xs font-bold text-[#332D2D] block mb-1">
                          Recipient Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Anika Tabassum"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:border-[#8C4A32]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#332D2D] block mb-1">
                          Phone Number (11 Digits) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 01712-345678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:border-[#8C4A32]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-xs font-bold text-[#332D2D] block mb-1">
                          Select District *
                        </label>
                        <select
                          value={formData.district}
                          onChange={handleDistrictChange}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:border-[#8C4A32] cursor-pointer"
                        >
                          {BANGLADESH_DISTRICTS.map((dist) => (
                            <option key={dist} value={dist}>
                              {dist}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#332D2D] block mb-1">
                          Email (For Order Invoice)
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. anika@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:border-[#8C4A32]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#332D2D] block mb-1">
                        Detailed Street Address (House, Road, Thana/Area) *
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="e.g. House 14, Road 5, Sector 11, Uttara, Dhaka"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-[#E8E2D9] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:border-[#8C4A32] resize-none"
                      />
                    </div>
                  </div>

                  {/* 2. Courier Delivery Options */}
                  <div className="bg-white p-5 rounded-xl border border-[#F2EDE4] shadow-sm space-y-3">
                    <h4 className="font-serif font-bold text-sm text-[#332D2D] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#8C4A32]" />
                      <span>2. Delivery Speed & Region</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                          formData.deliveryType === 'dhaka'
                            ? 'border-[#8C4A32] bg-[#FAF7F2]'
                            : 'border-[#E8E2D9] bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="radio"
                            name="deliveryType"
                            checked={formData.deliveryType === 'dhaka'}
                            onChange={() => setFormData({ ...formData, deliveryType: 'dhaka' })}
                            className="mt-0.5 accent-[#8C4A32]"
                          />
                          <div>
                            <p className="text-xs font-bold text-[#332D2D]">Inside Dhaka City</p>
                            <p className="text-[11px] text-[#736B66]">24 - 48 Hours Express</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#8C4A32]">
                          {isFreeDelivery ? 'FREE' : '৳70'}
                        </span>
                      </label>

                      <label
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                          formData.deliveryType === 'outside'
                            ? 'border-[#8C4A32] bg-[#FAF7F2]'
                            : 'border-[#E8E2D9] bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="radio"
                            name="deliveryType"
                            checked={formData.deliveryType === 'outside'}
                            onChange={() => setFormData({ ...formData, deliveryType: 'outside' })}
                            className="mt-0.5 accent-[#8C4A32]"
                          />
                          <div>
                            <p className="text-xs font-bold text-[#332D2D]">Outside Dhaka (All BD)</p>
                            <p className="text-[11px] text-[#736B66]">3 - 5 Days Steadfast Courier</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#8C4A32]">
                          {isFreeDelivery ? 'FREE' : '৳130'}
                        </span>
                      </label>
                    </div>

                    {isFreeDelivery && (
                      <p className="text-[11px] text-[#2D463E] font-semibold bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E8E2D9]">
                        🎉 Free Shipping Qualified! (Subtotal above ৳1,500)
                      </p>
                    )}
                  </div>

                  {/* 3. Payment Method */}
                  <div className="bg-white p-5 rounded-xl border border-[#F2EDE4] shadow-sm space-y-4">
                    <h4 className="font-serif font-bold text-sm text-[#332D2D] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#8C4A32]" />
                      <span>3. Choose Payment Method</span>
                    </h4>

                    <div className="space-y-2.5">
                      {/* Cash on Delivery */}
                      <label
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          formData.paymentMethod === 'cod'
                            ? 'border-[#8C4A32] bg-[#FAF7F2]'
                            : 'border-[#E8E2D9] bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                          className="mt-0.5 accent-[#8C4A32]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#332D2D]">
                              Cash on Delivery (ক্যাশ অন ডেলিভারি)
                            </span>
                            <span className="text-[10px] bg-[#FAF7F2] text-[#2D463E] border border-[#E8E2D9] px-2 py-0.5 rounded-full font-bold">
                              Most Popular
                            </span>
                          </div>
                          <p className="text-[11px] text-[#736B66] mt-0.5">
                            Pay cash to the courier agent only after you receive and inspect your parcel.
                          </p>
                        </div>
                      </label>

                      {/* bKash Payment */}
                      <label
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          formData.paymentMethod === 'bkash'
                            ? 'border-[#8C4A32] bg-[#FAF7F2]'
                            : 'border-[#E8E2D9] bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'bkash'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'bkash' })}
                          className="mt-0.5 accent-[#8C4A32]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#D12053]">
                              bKash Mobile Payment (বিকাশ)
                            </span>
                            <span className="text-[10px] bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full font-bold">
                              Instant 0% Fee
                            </span>
                          </div>
                          <p className="text-[11px] text-[#736B66] mt-0.5">
                            Send Money to Karighor Merchant bKash: <strong>01712-345678</strong>
                          </p>
                          
                          {formData.paymentMethod === 'bkash' && (
                            <div className="mt-3 p-3 bg-pink-50/70 border border-pink-200 rounded-xl space-y-2 text-xs">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[11px] font-bold text-pink-950 block mb-1">
                                    Your bKash Number:
                                  </label>
                                  <input
                                    type="tel"
                                    placeholder="01XXXXXXXXX"
                                    value={formData.bkashNumber}
                                    onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-pink-300 bg-white"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] font-bold text-pink-950 block mb-1">
                                    bKash TrxID (Transaction ID):
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. BKT9821K9"
                                    value={formData.trxId}
                                    onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-pink-300 bg-white uppercase"
                                  />
                                </div>
                              </div>
                              <p className="text-[10px] text-pink-700">
                                Tip: For testing, you can enter any 8-character ID (e.g. DEMOBKASH).
                              </p>
                            </div>
                          )}
                        </div>
                      </label>

                      {/* Nagad Payment */}
                      <label
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          formData.paymentMethod === 'nagad'
                            ? 'border-[#8C4A32] bg-[#FAF7F2]'
                            : 'border-[#E8E2D9] bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'nagad'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'nagad' })}
                          className="mt-0.5 accent-[#8C4A32]"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-bold text-[#E65100]">
                            Nagad Payment (নগদ)
                          </span>
                          <p className="text-[11px] text-[#736B66] mt-0.5">
                            Nagad Merchant: 01712-345678. Enter TrxID on confirmation.
                          </p>
                        </div>
                      </label>

                      {/* Credit / Debit Cards */}
                      <label
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          formData.paymentMethod === 'card'
                            ? 'border-[#8C4A32] bg-[#FAF7F2]'
                            : 'border-[#E8E2D9] bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'card'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                          className="mt-0.5 accent-[#8C4A32]"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-bold text-[#1E3A8A]">
                            Debit / Credit Card (SSLCommerz)
                          </span>
                          <p className="text-[11px] text-[#736B66] mt-0.5">
                            Visa, Mastercard, City Bank, Brac Bank, DBBL Nexus.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                </div>

                {/* Right Side: Order Summary & Placement */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="bg-white p-5 rounded-xl border border-[#F2EDE4] shadow-sm space-y-4">
                    <h4 className="font-serif font-bold text-sm text-[#332D2D] pb-2 border-b border-[#F2EDE4]">
                      Order Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                    </h4>

                    {/* Items Mini List */}
                    <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                      {cartItems.map((item, idx) => (
                        <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="flex items-center gap-3 text-xs">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover bg-[#FAF7F2] shrink-0 border border-[#F2EDE4]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[#332D2D] truncate">{item.product.name}</p>
                            <p className="text-[11px] text-[#736B66]">
                              Size: <strong>{item.selectedSize}</strong> × {item.quantity}
                            </p>
                          </div>
                          <span className="font-bold text-[#332D2D] shrink-0">
                            ৳{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown */}
                    <div className="pt-3 border-t border-[#F2EDE4] space-y-2 text-xs">
                      <div className="flex justify-between text-[#5C5552]">
                        <span>Subtotal:</span>
                        <span>৳{subtotal.toLocaleString()}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-emerald-800 font-medium">
                          <span>Promo Discount:</span>
                          <span>-৳{discount.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-[#5C5552]">
                        <span>Delivery Charge:</span>
                        <span>{deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}</span>
                      </div>

                      <div className="pt-2 border-t border-[#F2EDE4] flex justify-between text-base font-bold text-[#332D2D]">
                        <span>Total Payable:</span>
                        <span className="text-[#8C4A32]">৳{finalTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      id="confirm-place-order-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 bg-[#8C4A32] hover:bg-[#723C29] disabled:bg-stone-400 text-white font-bold text-xs rounded-full shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Processing Order Securely...</span>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Confirm Order (৳{finalTotal.toLocaleString()})</span>
                        </>
                      )}
                    </button>

                    <div className="text-center space-y-1 pt-1">
                      <p className="text-[10px] text-[#736B66] flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2D463E]" />
                        100% Risk-Free Guarantee & Easy Size Exchanges
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </form>
          ) : confirmedOrder ? (
            /* Order Confirmation View */
            <div className="max-w-2xl mx-auto text-center space-y-6 py-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-[#FAF7F2] text-[#2D463E] border border-[#E8E2D9] rounded-full mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A32]">
                  Dhonnobad! Order Placed Successfully
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#332D2D] mt-1">
                  Thank You, {confirmedOrder.customerName}!
                </h2>
                <p className="text-xs sm:text-sm text-[#736B66] mt-1.5">
                  Your artisanal bangles order has been registered. An SMS confirmation will be sent to <strong>{confirmedOrder.phone}</strong>.
                </p>
              </div>

              {/* Order Details Receipt Box */}
              <div className="bg-white p-6 rounded-xl border border-[#F2EDE4] text-left space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F2EDE4] gap-2">
                  <div>
                    <span className="text-[10px] text-[#736B66] uppercase font-bold">Order Tracking ID</span>
                    <p className="font-serif font-bold text-lg text-[#8C4A32]">{confirmedOrder.orderId}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[10px] text-[#736B66] uppercase font-bold">Order Date</span>
                    <p className="text-xs font-semibold text-[#332D2D]">{confirmedOrder.orderDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-bold text-[#332D2D] mb-1">Delivery Destination:</p>
                    <p className="text-[#5C5552] leading-relaxed">
                      {confirmedOrder.address}, {confirmedOrder.district}
                    </p>
                    <p className="text-[#5C5552] mt-0.5">Phone: {confirmedOrder.phone}</p>
                  </div>

                  <div>
                    <p className="font-bold text-[#332D2D] mb-1">Payment Method:</p>
                    <p className="text-[#5C5552] uppercase font-semibold">
                      {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : confirmedOrder.paymentMethod}
                    </p>
                    {confirmedOrder.transactionId && (
                      <p className="text-[#5C5552]">TrxID: {confirmedOrder.transactionId}</p>
                    )}
                    <p className="text-[#5C5552] mt-0.5">
                      Delivery Courier: <strong>{confirmedOrder.deliveryType === 'dhaka' ? 'Inside Dhaka (24-48 hrs)' : 'Nationwide Courier (3-5 days)'}</strong>
                    </p>
                  </div>
                </div>

                {/* Items Ordered List */}
                <div className="pt-3 border-t border-[#F2EDE4]">
                  <p className="font-bold text-xs text-[#332D2D] mb-2">Ordered Bangles:</p>
                  <div className="space-y-2">
                    {confirmedOrder.items.map((it, i) => (
                      <div key={i} className="flex items-center justify-between text-xs text-[#5C5552]">
                        <span>
                          {it.product.name} (Size: {it.selectedSize}) × {it.quantity}
                        </span>
                        <span className="font-bold text-[#332D2D]">৳{(it.product.price * it.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2EDE4] flex justify-between text-sm font-bold text-[#332D2D]">
                  <span>Total Amount:</span>
                  <span className="text-[#8C4A32]">৳{confirmedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="px-5 py-2.5 rounded-full border border-[#E8E2D9] bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#332D2D] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onNavigate('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#8C4A32] hover:bg-[#723C29] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[11px] text-[#736B66]">
                Need help with your order? Call our hotline directly at <strong>+880 1712-345678</strong>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
