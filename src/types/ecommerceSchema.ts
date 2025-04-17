// ecommerceSchema.ts

// 1. User Entity
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: "buyer" | "seller" | "admin";
  createdAt: Date;
  updatedAt: Date;
  avatarUrl?: string;
  bio?: string;
  location?: string;
}

// 2. Product Entity
export interface Product {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
  tags: string[];
  images: ProductImage[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 3. Product Image Entity
export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText?: string;
}

// 4. Category Entity
export interface Category {
  id: string;
  name: string;
  parentId?: string; // for nested categories
  slug: string;
}

// 5. Order Entity
export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: Address;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
}

// 6. Order Item Entity
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

// 7. Address Entity
export interface Address {
  id: string;
  userId: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
}

// 8. Payment Entity
export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  method: "card" | "paypal" | "bank_transfer";
  transactionId?: string;
  createdAt: Date;
}

// 9. Review Entity
export interface Review {
  id: string;
  productId: string;
  buyerId: string;
  rating: number; // 1 to 5
  comment?: string;
  createdAt: Date;
}

// 10. Message Entity
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: Date;
  readAt?: Date;
}

// 11. Wishlist Entity
export interface Wishlist {
  id: string;
  userId: string;
  products: string[]; // array of productIds
}

// 12. Coupon/Discount Entity
export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountPercentage: number;
  maxUses: number;
  uses: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
}

// 13. Notification Entity
export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: "order" | "message" | "review" | "system";
  read: boolean;
  createdAt: Date;
}

// 14. SEO Metadata Entity
export interface SeoMetadata {
  id: string;
  productId?: string;
  categoryId?: string;
  title: string;
  description: string;
  keywords: string[];
  slug: string;
}

// 15. Analytics Event Entity
export interface AnalyticsEvent {
  id: string;
  userId?: string;
  type: string;
  metadata: Record<string, unknown>;
  timestamp: Date;
}
