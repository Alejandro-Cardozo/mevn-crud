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

// Get with parameters
router.get("/note/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const noteDB = await Note.findOne({ _id });
    res.json(noteDB);
  } catch (error) {
    return res.status(400).json({
      message: "An error has occurred",
      error
    });
  }
});

// Get every document
router.get("/note", async (req, res) => {
  try {
    const noteDB = await Note.find();
    res.json(noteDB);
  } catch (error) {
    return res.status(400).json({
      message: "An error has occurred",
      error
    });
  }
});

// Delete note
router.delete("/note/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const noteDB = await Note.findByIdAndDelete({ _id });
    if (!noteDB) {
      return res.status(400).json({
        message: "The ID does not exist",
        error
      });
    }
    res.json(noteDB);
  } catch (error) {
    return res.status(400).json({
      message: "An error has occurred",
      error
    });
  }
});

// Update note (put)
router.put("/note/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;

  try {
    const noteDB = await Note.findByIdAndUpdate(_id, body, { new: true });
    res.json(noteDB);
  } catch (error) {
    return res.status(400).json({
      message: "An error has occurred",
      error
    });
  }
});

// Export router
module.exports = router;
