require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const brandRoutes = require("./routes/Brand");
const categoryRoutes = require("./routes/Category");
const userRoutes = require("./routes/User");
const addressRoutes = require("./routes/Address");
const reviewRoutes = require("./routes/Review");
const wishlistRoutes = require("./routes/Wishlist");
const emailRoutes = require('./routes/email')

const { connectToDB } = require("./database/db");

// server init
const server = express();

// database connection
connectToDB();

// // middlewares
// const allowedOrigins = [
//   'http://localhost:3000',
//   // 'https://yz-shop-taupe.vercel.app',
//   'https://yz-shop.vercel.app/',
//   'https://yz-shop.vercel.app'
// ];

// server.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS not allowed for origin: " + origin));
//     }
//   },
//   credentials: true,
//   exposedHeaders: ['X-Total-Count'],
//   methods: ['GET', 'POST', 'PATCH', 'DELETE'],
// }));

server.use(cors({
  origin: true, // Reflect the request origin
  credentials: true,
  exposedHeaders: ['X-Total-Count'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));





server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));

// route middleware
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/orders", orderRoutes);
server.use("/cart", cartRoutes);
server.use("/brands", brandRoutes);
server.use("/categories", categoryRoutes);
server.use("/address", addressRoutes);
server.use("/reviews", reviewRoutes);
server.use("/wishlist", wishlistRoutes);

server.use('/api', emailRoutes);




// test route
server.get("/", (req, res) => {
  res.status(200).json({ message: "running" });
});

// start server
server.listen(process.env.PORT, () =>
  console.log(`✅ server running on port ${process.env.PORT}`)
);




