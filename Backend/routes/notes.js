const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
// Fetch all notes - /api/notes/fetchallusers

router.get("/fetchallusers", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
});

// Add note for user - /api/notes/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    [
      body("title", "Enter a Valid title").isLength({ min: 3 }),
      body("description", "description must be min 5 characters").isLength({
        min: 5,
      }),
    ],
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      res.status(400).send("Internal Server Error");
    }
  }
);
module.exports = router;

// Update an existing note for user - /api/notes/updatenote -- Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // Finding the Note

  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  // Checking whether accessed by right user
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Unauthorized");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );

  res.json(note);
});


router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // Finding the Note

  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  // Checking whether accessed by right user
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Unauthorized");
  }
  note = await Notes.findByIdAndDelete(
    req.params.id
  );

  res.json({"Success": "Note has been deleted", note: note});
});
