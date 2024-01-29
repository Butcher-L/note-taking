import { generateUniqueId } from '../helpers/generateUniqueId';
import notesRepository from '../repositories/notesRepository';

interface Note {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

async function createNote(noteData: { title: string; body: string }) {
  const date = new Date()
  const note: Note = {
    id: generateUniqueId(), 
    title: noteData.title,
    body: noteData.body,
    createdAt: date,
    updatedAt: date,
  };
  return await notesRepository.create(note);
}

async function getAllNotes() {
  return await notesRepository.getAll();
}

async function getNoteById(noteId: string) {
  const note = await notesRepository.getById(noteId);
  if (!note) {
    throw new Error('Note not found.');
  }
  return note;
}

async function updateNote(noteId: string,  updatedNoteData: Note) {
  const existingNote = await notesRepository.getById(noteId);
  if (!existingNote) {
    throw new Error('Note not found.');
  }

  const updatedNote: Note = {
    ...existingNote,
    ...updatedNoteData,
    updatedAt: new Date(),
  };
  return await notesRepository.update(updatedNote);
}

async function deleteNoteById(noteId: string) {
  const existingNote = await notesRepository.getById(noteId);
  if (!existingNote) {
    throw new Error('Note not found.');
  }

  return await notesRepository.deleteById(noteId);
}

export default {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNoteById,
};
