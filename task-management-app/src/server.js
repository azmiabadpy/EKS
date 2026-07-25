const express = require("express");
const cors = require("cors");

const tasksRouter = require("./routes/tasks");
const { logInfo, uploadLogToS3 } = require("./logger");

const app = express();

const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());


// Health check
app.get("/health", async (req, res) => {
  const logMessage = logInfo("Health check successful");

  await uploadLogToS3(logMessage);

  res.status(200).json({
    status: "UP",
    message: "Task Management Application is running"
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


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
