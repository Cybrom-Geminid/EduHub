const express = require("express")
const dotenv = require('dotenv');
const cors = require("cors")
const app = express()

// Middleware to parse JSON bodies
app.use(express.json());
 
// Load environment variables from .env file
dotenv.config();

app.use(cors());


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
