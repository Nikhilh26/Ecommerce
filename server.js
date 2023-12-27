const express = require('express');
const connectDB = require("./config/db");
const morgan = require("morgan");
const router = require("./routes/authRoutes");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Hello <hr> </h1>");
})

connectDB();

// middleware 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

app.use('/api/v1/category', categoryRoutes);
app.use('/api/v2', productRoutes);
app.use('/api', router);

// PORT activation
const PORT = process.env.PORT;
app.listen(PORT, (port, err) => {
    console.log("Server Live ", PORT);
})
