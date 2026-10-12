export type UserRole = 'client' | 'vendor' | 'professional' | 'admin' | 'accommodation_owner';
export type CurrencyCode = 'XOF' | 'USD' | 'EUR';
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
export type ShopStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type ProductStatus = 'pending' | 'active' | 'inactive' | 'rejected';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JwtPayload {
  userId: string;
  role: UserRole;
  email: string;
}