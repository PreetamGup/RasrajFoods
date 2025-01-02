import mongoose from "mongoose";


// Define the User schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        required: true
    },
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],

    role:{
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }

    
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;