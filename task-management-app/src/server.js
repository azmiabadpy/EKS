const express = require("express");
const cors = require("cors");

const tasksRouter = require("./routes/tasks");
const { logInfo, uploadLogToS3 } = require("./logger");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Homepage
app.get("/", (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Task Management Application</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f4f6f8;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }

        .container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 600px;
          width: 90%;
        }

        h1 {
          color: #2c3e50;
        }

        p {
          color: #555;
          font-size: 18px;
        }

        .status {
          color: green;
          font-weight: bold;
        }

        a {
          display: inline-block;
          margin: 10px;
          padding: 12px 20px;
          text-decoration: none;
          color: white;
          background: #3498db;
          border-radius: 6px;
        }

        a:hover {
          background: #2980b9;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h1>Task Management Application</h1>

        <p class="status">
          Application is running successfully
        </p>

        <p>
          Deployed using Jenkins, Docker, and Amazon EKS.
        </p>

        <a href="/health">Check Application Health</a>

        <a href="/tasks">View Tasks</a>
      </div>
    </body>
    </html>
  `);
});

// Health check
app.get("/health", (req, res) => {
  // Create health-check log
  const logMessage = logInfo("Health check successful");

  // Respond immediately to Kubernetes
  res.status(200).json({
    status: "UP",
    message: "Task Management Application is running"
  });

  // Upload log asynchronously in the background
  uploadLogToS3(logMessage).catch((error) => {
    console.error(
      "Failed to upload health check log to S3:",
      error.message
    );
  });
});

// Task routes
app.use("/tasks", tasksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Application error:", err);

  res.status(500).json({
    error: "Internal server error"
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
