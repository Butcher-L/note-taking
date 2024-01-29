import express, { Request, Response } from 'express';
import notesUseCase from '../useCases/notesUseCase';

const router = express.Router();

interface Note {
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const newNote = await notesUseCase.createNote(req.body as Note);
    res.status(201).json(newNote);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  const allNotes = await notesUseCase.getAllNotes();
  res.json(allNotes);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const foundNote = await notesUseCase.getNoteById(req.params.id);
    res.json(foundNote);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedNote = await notesUseCase.updateNote(req.params.id, req.body);
    res.json(updatedNote);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await notesUseCase.deleteNoteById(req.params.id);
    res.json({ message: 'Note deleted successfully.' });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
