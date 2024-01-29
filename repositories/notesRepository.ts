interface Note {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  const notes: Note[] = [];
  
  async function create(noteData: Note) {
    const newNote: Note = {
      ...noteData,
      title: noteData.title,
      body: noteData.body,
    };
    notes.push(newNote);
    return newNote;
  }
  
  async function getAll() {
    return [...notes]; 
  }
  
  async function getById(noteId: string) {
    return notes.find(note => note.id === noteId);
  }
  
  async function update(updatedNote: Note) {
    const existingNoteIndex = notes.findIndex((note) => note.id === updatedNote.id);
  
    if (existingNoteIndex !== -1) {
      notes[existingNoteIndex] = { ...notes[existingNoteIndex], ...updatedNote };
      return notes[existingNoteIndex];
    } else {
      throw new Error('Note not found.');
    }
  }
  
  async function deleteById(noteId: string) {
    const index = notes.findIndex(note => note.id === noteId);
    if (index !== -1) {
      notes.splice(index, 1);
      return;
    }
    throw new Error('Note not found.');
  }
  
  export default {
    create,
    getAll,
    getById,
    update,
    deleteById,
  };
  