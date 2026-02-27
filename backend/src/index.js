const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const prisma = require("./lib/prisma");
const config = require("./config");

const app = express();

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// CORS - restrict to frontend domain
const allowedOrigins = [
  config.baseUrl,
  'https://vivutruyenhay.com',
  'https://www.vivutruyenhay.com',
];
if (config.nodeEnv === 'development') {
  allowedOrigins.push('http://localhost', 'http://localhost:3000');
}
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (server-to-server, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too Many Requests", message: "Too many requests from this IP, please try again later." },
});
app.use("/api/", limiter);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 attempts per 15 minutes
  message: { error: "Too Many Requests", message: "Too many login attempts, please try again later." },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files (uploads)
app.use("/uploads", express.static(config.uploadPath || "./uploads"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API routes will be added here
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/stories", require("./routes/stories"));
app.use("/api/chapters", require("./routes/chapters"));
app.use("/api/comments", require("./routes/comments")); // Mount back at /api/comments
app.use("/api/bookmarks", require("./routes/bookmarks"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/media", require("./routes/media"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/affiliate", require("./routes/affiliate"));
app.use("/api/film-reviews", require("./routes/filmReviews"));

// Affiliate redirect (short URL)
app.use("/r", require("./routes/affiliate"));

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found on this server.",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message,
      details: err.details || null,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid token",
    });
  }

  res.status(500).json({
    error: "Internal Server Error",
    message:
      config.nodeEnv === "production" ? "Something went wrong!" : err.message,
  });
});

// Start server
const server = app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`📱 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Health check: http://localhost:${config.port}/health`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("🛑 SIGTERM received, shutting down gracefully...");
  server.close(async () => {
    await prisma.$disconnect();
    console.log("✅ Process terminated");
    process.exit(0);
  });
});

module.exports = app;
