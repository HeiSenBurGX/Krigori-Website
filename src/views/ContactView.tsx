import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle, 
  Sparkles 
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      question: 'How do I choose the correct bangle size?',
      answer: 'Standard Bangladeshi bangle sizes are 2.4 (Small, 57mm), 2.6 (Medium standard, 60mm), 2.8 (Large, 63.5mm), and 2.10 (Extra Large, 66.7mm). You can measure the inside diameter of a comfortable bangle in your wardrobe using an ordinary ruler or refer to our interactive Size Guide on the product page.'
    },
    {
      question: 'What are your delivery charges and delivery times in Bangladesh?',
      answer: 'Delivery inside Dhaka is ৳70 (typically delivered within 24 to 48 hours). Delivery outside Dhaka across all 64 districts is ৳130 (typically delivered within 3 to 5 business days via Steadfast, RedX, or Pathao). Orders over ৳1,500 enjoy 100% Free Shipping anywhere in Bangladesh.'
    },
    {
      question: 'Can I pay via Cash on Delivery (COD)?',
      answer: 'Yes! We provide Cash on Delivery all across Bangladesh. You can inspect the package upon arrival and pay the delivery rider directly. We also accept instant bKash, Nagad, and Debit/Credit cards.'
    },
    {
      question: 'What happens if the bangles arrive damaged or the size is incorrect?',
      answer: 'Because our glass and terracotta bangles are handcrafted, we pack them in multi-layered bubble cushions and sturdy earthen boxes. In the rare event of damage or wrong sizing, message us on WhatsApp within 3 days with a photo, and we will dispatch a replacement or arrange an exchange free of charge.'
    },
    {
      question: 'Do you offer bulk orders for weddings (Gaye Holud) or corporate events?',
      answer: 'Yes, we curate custom wholesale bangle hampers for Gaye Holud, Mehendi nights, Pohela Boishakh, and cultural events. Please contact our WhatsApp hotline (+880 1712-345678) for bulk discounts and custom packaging.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A32] mb-2 block">
          We’re Here to Assist You
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#332D2D]">
          Contact Karighor Studio
        </h1>
        <p className="text-xs sm:text-sm text-[#736B66] mt-3 leading-relaxed">
          Have a question about bangle sizing, wedding bulk inquiries, or your ongoing order? 
          Reach out directly to our artisan support desk in Dhaka.
        </p>
      </div>

      {/* 2-Column Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 rounded-xl border border-[#F2EDE4] shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#332D2D] border-b border-[#F2EDE4] pb-4">
              Dhaka Studio & Care Desk
            </h3>

            <div className="space-y-4 text-xs text-[#5C5552]">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#8C4A32] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#332D2D] text-sm">Studio Location</p>
                  <p className="mt-0.5 leading-relaxed">
                    House 42, Road 11, Block D, Banani, Dhaka-1213, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#8C4A32] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#332D2D] text-sm">WhatsApp & Hotline</p>
                  <p className="mt-0.5">+880 1712-345678</p>
                  <p className="text-[11px] text-[#A69E97]">Instant support for order tracking & sizing</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#8C4A32] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#332D2D] text-sm">Email Address</p>
                  <p className="mt-0.5">care@karighor-bangladesh.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#8C4A32] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#332D2D] text-sm">Operating Hours</p>
                  <p className="mt-0.5">Everyday: 10:00 AM – 9:00 PM (BST)</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2">
              <a
                href="https://wa.me/8801712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#2D463E] hover:bg-[#233832] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick artisan note */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#F2EDE4] text-xs text-[#5C5552] flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#8C4A32] shrink-0" />
            <span>
              Orders dispatched from Dhaka with dedicated fragile cushioning for glass and terracotta pieces.
            </span>
          </div>
        </div>

        {/* Right: Interactive Message Form */}
        <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-xl border border-[#F2EDE4] shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#332D2D]">
                Message Received, Dhonnobad!
              </h3>
              <p className="text-xs text-[#736B66] max-w-sm mx-auto leading-relaxed">
                Our customer care executive will get back to you within 2-4 hours on WhatsApp or Phone (<strong>{formData.phone}</strong>).
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
                }}
                className="px-6 py-2.5 bg-[#FAF7F2] text-[#332D2D] border border-[#E8E2D9] hover:bg-[#F2EDE4] text-xs font-semibold rounded-full transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#332D2D]">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-[#736B66] mt-0.5">
                  Fill in your details and our team will assist promptly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#332D2D] block mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharmin Akter"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:border-[#8C4A32]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#332D2D] block mb-1.5">
                    Phone / WhatsApp Number *
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#332D2D] block mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. sharmin@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:border-[#8C4A32]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#332D2D] block mb-1.5">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:border-[#8C4A32] cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Tracking">Order Tracking & Status</option>
                    <option value="Bangle Sizing Help">Bangle Sizing Help</option>
                    <option value="Bulk Wedding / Event Order">Bulk Wedding / Holud Order</option>
                    <option value="Return / Size Exchange">Return / Size Exchange</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#332D2D] block mb-1.5">
                  Your Message or Question
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about the bangles you're looking for, or any special requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-3.5 rounded-xl border border-[#E8E2D9] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:border-[#8C4A32] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#8C4A32] hover:bg-[#723C29] text-white text-xs font-semibold rounded-full shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* FAQ Section */}
      <div className="pt-10 border-t border-[#E8E2D9] max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A32] mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332D2D]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#F2EDE4] overflow-hidden transition-colors shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-serif font-bold text-sm text-[#332D2D]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C4A32] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-[#5C5552] leading-relaxed border-t border-[#FAF7F2]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
