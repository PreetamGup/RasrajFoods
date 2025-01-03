import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../model/order.model.js";
import dotenv from "dotenv";
import User from "../model/user.model.js";

dotenv.config({
  path: "./.env",
});

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET)

const paymentController = {

    createOrder: async function(req,res){
        const { userId, amount,cart,customerInfo } = req.body;

        const items = cart.map((item)=> ({food: item._id, quantity: item.quantity}))
        console.log("amount", amount)
      
        try {
            // Create an entry for razorpay
            const order = await razorpay.orders.create({
            amount: Number(amount),
            currency: "INR",
            });

            const newOrder = new Order({
                order_id: order.id,
                userId,
                totalAmount:amount/100,
                items,
                customerInfo

            })

            await newOrder.save();

            await User.findByIdAndUpdate(
                userId,
                { $push: { orderHistory: newOrder._id } },
                { new: true }
              );

            return res.status(200).json({ order,   message: `${amount} received` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "something went wrong" });
        }

    },
    verifyPayment: async function(req,res){

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const body_data = razorpay_order_id + "|" + razorpay_payment_id;

        const expect = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(body_data)
            .digest("hex");

        const isValid = expect === razorpay_signature;

        if (isValid) {
            console.log("payment is successful");

            await Order.findOneAndUpdate(
            { order_id: razorpay_order_id },
            {
                $set: { razorpay_payment_id, razorpay_order_id, razorpay_signature, status:"Completed" },
            }
            );


            res.redirect(
            `${process.env.FRONTEND_URL}/success?payment_id=${razorpay_order_id}`
            );
            return;
        } else {
            res.redirect(
            `${process.env.FRONTEND_URL}/failure?payment_id=${razorpay_order_id}`
            );
            return;
        }

    },

    getAllOrder: async function(req,res){
        try {
            const {status}= req.query;
    
            const orders = await Order.find({status:status}).populate("items.food").populate({path:"userId", select:"fullName address mobile"}).sort({orderDate:-1});
           
            return res.status(200).json({ orders });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "something went wrong" });
        }
    }


}


export default paymentController;