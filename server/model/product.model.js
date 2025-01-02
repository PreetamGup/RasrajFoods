// Import mongoose
import mongoose from 'mongoose';

// Define the schema
const foodSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['North Indian', 'South Indian', 'Snacks', 'Desserts','Cakes'],
        required: true
    },
    spicyLevel: {
        type: Number,
        default: null,
        max: 4
    },
    isVegetarian: {
        type: Boolean,
        required: true
    },
    allergens: {
        type: [String],
        required: true
    }
});

// Create the model
const Food = mongoose.model('Food', foodSchema);

export default Food;



