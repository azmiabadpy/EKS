const express = require("express");
const pool = require("../db");
const { logInfo, uploadLogToS3 } = require("../logger");

const router = express.Router();


// GET all tasks
router.get("/", async (req, res) => {
  try {
    const [tasks] = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );

    const logMessage = logInfo("All tasks fetched");

    await uploadLogToS3(logMessage);

    res.status(200).json(tasks);

  } catch (error) {
    console.error("Error fetching tasks:", error);

    res.status(500).json({
      error: "Failed to fetch tasks"
    });
  }
});


// GET task by ID
router.get("/:id", async (req, res) => {
  try {
    const [tasks] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [req.params.id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    const logMessage = logInfo(
      `Task ${req.params.id} fetched`
    );

    await uploadLogToS3(logMessage);

    res.status(200).json(tasks[0]);

  } catch (error) {
    console.error("Error fetching task:", error);

    res.status(500).json({
      error: "Failed to fetch task"
    });
  }
});


// CREATE a new task
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      status
    } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Title is required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO tasks
      (title, description, status)
      VALUES (?, ?, ?)`,
      [
        title,
        description || null,
        status || "pending"
      ]
    );

    const logMessage = logInfo(
      `Task created with ID ${result.insertId}`
    );

    await uploadLogToS3(logMessage);

    res.status(201).json({
      message: "Task created successfully",
      taskId: result.insertId
    });

  } catch (error) {
    console.error("Error creating task:", error);

    res.status(500).json({
      error: "Failed to create task"
    });
  }
});


// UPDATE a task
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      status
    } = req.body;

    const [result] = await pool.query(
      `UPDATE tasks
       SET title = ?,
           description = ?,
           status = ?
       WHERE id = ?`,
      [
        title,
        description,
        status,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    const logMessage = logInfo(
      `Task ${req.params.id} updated`
    );

    await uploadLogToS3(logMessage);

    res.status(200).json({
      message: "Task updated successfully"
    });

  } catch (error) {
    console.error("Error updating task:", error);

    res.status(500).json({
      error: "Failed to update task"
    });
  }
});


// DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    const logMessage = logInfo(
      `Task ${req.params.id} deleted`
    );

    await uploadLogToS3(logMessage);

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting task:", error);

    res.status(500).json({
      error: "Failed to delete task"
    });
  }
});


module.exports = router;
