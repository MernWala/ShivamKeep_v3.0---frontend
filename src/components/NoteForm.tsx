import React, { useState } from 'react';
import { useAddNoteMutation } from '../store/rtk/notes.api';

export function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addNote, { isLoading }] = useAddNoteMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await addNote({ title, content }).unwrap();
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Add Note'}
      </button>
    </form>
  );
}