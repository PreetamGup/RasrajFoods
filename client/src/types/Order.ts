export interface Order {
    _id: string;
    order_id: string;
    orderDate: string;
    status: string;
    totalAmount: number;
    items: { food: {
      name: string, 
      price: number
    },
    quantity: number }[];
    customerInfo: {name: string, contact:string, address: `string`},
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }