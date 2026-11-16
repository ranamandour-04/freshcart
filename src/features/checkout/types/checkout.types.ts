export interface ShippingAddressPayload {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface CashOrderResponse {
  status: string;
  data: {
    _id: string;
    user: string;
    cartItems: Array<{
      product: string;
      count: number;
      price: number;
      _id: string;
    }>;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    updatedAt: string;
    id: number;
  };
}
