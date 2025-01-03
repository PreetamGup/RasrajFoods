import Order from "../model/order.model.js";
import Food from "../model/product.model.js";
import User from "../model/user.model.js";
// Dashboard Route
const adminController= {

    adminDashboard: async function (req, res) {
        try {
            // 1. Total Orders
            const totalOrders = await Order.countDocuments();
    
            // 2. Orders by Status
            const ordersByStatus = await Order.aggregate([
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ]);
    
            // 3. Total Revenue
            const totalRevenue = await Order.aggregate([
                { $group: { _id: null, total: { $sum: "$totalAmount" } } }
            ]);
    
            // 4. Total Products
            const totalProducts = await Food.countDocuments();
    
            // 5. Category-Wise Product Count
            const productsByCategory = await Food.aggregate([
                { $group: { _id: "$category", count: { $sum: 1 } } }
            ]);
    
            // 6. Most Popular Products
            const popularProducts = await Order.aggregate([
                { $unwind: "$items" },
                { $group: { _id: "$items.food", totalQuantity: { $sum: "$items.quantity" } } },
                { $sort: { totalQuantity: -1 } },
                { $limit: 5 },
                {
                    $lookup: {
                        from: "foods",
                        localField: "_id",
                        foreignField: "_id",
                        as: "foodDetails"
                    }
                }
            ]);
    
            // 7. Total Users
            const totalUsers = await User.countDocuments();
    
            // 8. Admins and Users Count
            const usersByRole = await User.aggregate([
                { $group: { _id: "$role", count: { $sum: 1 } } }
            ]);
    
            // Combine results
            res.json({
                totalOrders,
                ordersByStatus,
                totalRevenue: totalRevenue[0]?.total || 0,
                totalProducts,
                productsByCategory,
                popularProducts,
                totalUsers,
                usersByRole
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

}


export default adminController;