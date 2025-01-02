import mongoose from "mongoose";
// Define the Order schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    customerInfo: {
        name: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },

    order_id: {
        type: String,
        required: true,
        unique: true,
   
    },

    razorpay_payment_id: {
        type: String,
        default: null,
    },
    razorpay_order_id: {
        type: String,
        default: null,
    },
    razorpay_signature: {
        type: String,
        default: null,
    },

},{timestamps: true});


const Order = mongoose.model('Order', orderSchema);

export default Order;