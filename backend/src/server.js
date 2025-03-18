require("dotenv").config(); // Load environment variables from .env file

const app = require("./app"); // Import the Express app from app.js
const prisma = require("./utils/prisma"); // Import Prisma Client (optional, for graceful shutdown)
const PORT = process.env.PORT || 5005; // Set the port for the server

console.log("Current working directory:", process.cwd());

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

console.log("session sec", process.env.SESSION_SECRET)
const ML_API_URL = process.env.ML_API_URL;
console.log("ML API URL:", process.env.ML_API_URL); // Ensure it's loaded correctly

// Gracefully shut down the server and Prisma Client on process termination ie ctrl+c
process.on("SIGINT", async () => {
  await prisma.$disconnect(); // Disconnect Prisma Client
  server.close(() => {
    console.log("Server and Prisma Client disconnected");
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect(); // Disconnect Prisma Client when app is terminated
  server.close(() => {
    console.log("Server and Prisma Client disconnected");
    process.exit(0);
  });
});
