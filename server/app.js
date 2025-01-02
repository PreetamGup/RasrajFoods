import express from "express";
import cors from "cors";
import productRouter from "./routes/product.router.js";
import userRouter from "./routes/user.router.js";
import paymentRouter from "./routes/payment.router.js";
import dotenv from "dotenv";
import {createClient} from 'redis';
import cookieParser from "cookie-parser";

dotenv.config();

export const app = express();


app.use(cors(
    {
      origin: ["http://localhost:5173", "https://rasraj-foods.vercel.app"], // replace with your frontend URL
      httpOnly: true,
      credentials: true,
    }
  
));

app.use(cookieParser());

export let redisClient;

(async () => {
  redisClient = createClient({
   url:process.env.REDIS_URL,
});

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

app.use(express.json());
app.use(express.urlencoded());

//rotues 
app.get("/", (req, res) => {
  res.send("Hello World!");
})
app.use("/api/v1/product",productRouter )
app.use("/api/v1/user",userRouter)
app.use("/api/v1/payment", paymentRouter)



