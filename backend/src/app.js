const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const doctorRoutes = require("./routes/doctorRoutes");
const indexRoute = require("./routes/index");
const patientRoutes = require("./routes/patientRoutes");
const testUpload = require("./routes/testUpload");
const gradcamUpload = require("./routes/uploadRouteGRADCAM");
const chatbot = require("./routes/chatbot");
const prediction = require("./routes/alz_prediction");
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow requests from any origin
app.use(
  cors({
    origin: "http://localhost:5174", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true,
  })
);

// Routes
app.use("/", indexRoute); // Root route for landing page
app.use("/upload", testUpload); // FOR DEV ONLY, DONT USE
app.use("/upload/gradcam", gradcamUpload);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/chatbot", chatbot);
app.use("/prediction", prediction);

module.exports = app;
