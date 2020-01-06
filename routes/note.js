import express from "express";
const router = express.Router();

// Import Note model
import Note from "../models/note";

// Add note
router.post("/new-note", async (req, res) => {
  const body = req.body;

  try {
    const noteDB = await Note.create(body);

    res.status(200).json(noteDB);
  } catch (error) {
    return res.status(500).json({
      message: "An error has occurred",
      error
    });
  }
});

// Export router
module.exports = router;
