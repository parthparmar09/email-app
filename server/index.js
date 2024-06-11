const express = require("express");
const cors = require("cors");

const { notFound, errorHandler } = require("./errors/errorHandler");
const connectDB = require("./config/db");

require("dotenv").config();
require("express-async-errors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/emails", require("./routes/emailRoute"));
app.use("/api/users", require("./routes/userRoute"));

//Serving static files
app.use("/api", express.static("./public"));

// Global error handlers
app.use(notFound);
app.use(errorHandler);

//Establish DB connection
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
