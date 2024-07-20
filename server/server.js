const express = require("express")
const dotenv = require('dotenv');
const cors = require("cors")
const app = express()
const connectDB = require('./config/db');

// Middleware to parse JSON bodies
app.use(express.json());
 
// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

app.use(cors());


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
