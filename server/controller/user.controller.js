import { redisClient } from "../app.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const userMethods = {

    getAllUsers: async function(req, res) {
        // Fetch data for all users from your database and return it
        try{
            const allUsers = await User.find({ role: 'User' }).select({password:0})
            return res.status(200).json({allUsers,message:"All users found", success: true});

        }catch(error){

            return res.status(500).json({message:"Error fetching users", error:error});
        }
    },

    addUser: function(req, res) {
        // Add a new user to your database
        return res.send("add user");
    },

    editUser:async function(req, res) {
        // Update user data in your database
        try {
            const {userId, formData} = req.body;

            await User.findByIdAndUpdate(userId, formData)

            return res.status(200).json({success:true, message:"User updated successfully"});
            
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({message:"Error updating user", error:error});
            
        }
    },

    deleteUser: function(req, res) {
        // Delete a user from your database
        return res.send("delete user");
    },

    getUserById:async function(req, res) {

        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)){
            
                return res.status(404).json({ message: "Product not found", success: false });
            
            }
            
            const user = await User.findById(id).populate({
                path: "orderHistory", // First, populate the orderHistory field in User schema
                populate: {          // Then, populate the items.food field in each Order
                  path: "items.food",
                  model: "Food",      // Ensure the model name matches your Food model
                },
              }).select({orderHistory: 1});


            if (!user) {
                return res.status(404).send("User not found");
            }

            return res.status(200).json({user, message:"User found", success:true});

        } catch (error) {
            console.log(error.message);
            return res.status(500).json({message:"Error fetching user", error:error});
        }

        
    },

    login: async function(req, res) {
        // Authenticate user credentials
        const user = await User.findOne({mobile: req.body.mobile}).select({password:0})

        if (!user) {
            return res.status(400).send("User Not exists");
        }
        
        

        req.body.login=true;
        const otp = userMethods.generateOtp(req);
        
        const token =  jwt.sign({user}, process.env.JWT_SCRERT, {expiresIn: '1d'});
        
        res.cookie("token", token, {
            maxAge: 86400000,
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        
        return res.json({token, otp:otp, message:"OTP Generated", success:true});
    },

    register: async function(req, res) {
         // Register a new user
        
        try {
            const {fullName,mobile, address} = req.body
            const user = await User.findOne({mobile});
            if (user){
                return res.status(400).send("User already exists");
            }

            const newUser= new User({fullName,mobile, address});
            await newUser.save();

            return res.status(200).json({message:"Registration Successful",success:true})

        } catch (error) {
            
            return res.status(500).json({message:"Registration Failure",error:error});

        }
        
       
      
    },

    logout: async function(req, res) {

        // Clear user's session
        res.clearCookie("token");
        return res.json({message:"Logged out", success:true});

    },

    generateOtp: function (req, res) {
        
        try {
            const mobile= req.body.mobile;
          
            // Create a random 4 digit number and send it to user
            const otp =  Math.floor(1000 + Math.random() * 9000);
            console.log(`Generated OTP: ${otp}`);
            redisClient.set(mobile, otp);
            redisClient.expire(mobile, 900);
            // Store OTP in Redis for 60 seconds
            // Here you can add logic to send the OTP to the user, e.g., via email or SMS
            // For example, using a fictional sendOtp function:
            // await sendOtp(userContactInfo, otp);
            if(req.body.login){
                return otp
            }
            return res.status(200).json({
                otp: otp,
                message:"OTP Generated",
                success: true

            });
        } catch (error) {
            if(req.body.login){
                return res.status(500).send("Error generating OTP");
            }
            console.error("Error generating or sending OTP:", error);
            return res.status(500).send("Error generating or sending OTP");
        }   
    },


    verifyOtp: async function(req, res) {
       try {
         // Verify OTP for user
        const otp = await redisClient.get(req.body.mobile) 
       
        if (!otp) {
            return res.status(400).send("OTP expired");
        }
        if (otp !== req.body.otp) {
            return res.status(400).send("Invalid OTP");
        }
        redisClient.del(req.body.mobile);
        return res.status(200).json({otp:otp, message:"OTP Verified",success:true});
       } catch (error) {
              console.error("Error verifying OTP:", error);
              return res.status(500).send("Error verifying OTP");
       }
       
    },

};

export default userMethods;