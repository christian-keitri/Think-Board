import { Router } from "express";
import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNoteById,
} from "../controllers/notesController";

const router = Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
