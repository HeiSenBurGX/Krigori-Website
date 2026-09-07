export type BangleCategory = 
  | 'all'
  | 'glass'
  | 'terracotta'
  | 'brass'
  | 'silk-thread'
  | 'bridal'
  | 'wooden';

export type BangleSize = '2.4' | '2.6' | '2.8' | '2.10';

export interface BangleProduct {
  id: string;
  name: string;
  banglaName?: string;
  category: Exclude<BangleCategory, 'all'>;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  description: string;
  artisanOrigin: string;
  materials: string;
  piecesPerSet: string;
  availableSizes: BangleSize[];
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: BangleProduct;
  selectedSize: BangleSize;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  deliveryType: 'dhaka' | 'outside';
  deliveryFee: number;
  paymentMethod: 'bkash' | 'nagad' | 'cod' | 'card';
  transactionId?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  orderDate: string;
  notes?: string;
  status: 'confirmed' | 'processing' | 'shipped';
}

export type PageView = 'home' | 'shop' | 'about' | 'contact' | 'wishlist' | 'cart';
