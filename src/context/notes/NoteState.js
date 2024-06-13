import React, { useState } from 'react';
import noteContext from './NoteContext';

const NoteState = (props) => {
    const host = 'http://localhost:4000';
    const [notes, setNotes] = useState([]);

    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/note/list`, { method: 'POST' });
            const json = await response.json();

            if (Array.isArray(json.notes)) {
                setNotes(json.notes);
            } else {
                console.error('API response does not contain an array of notes:', json);
            }
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        }
    };

    const addNote = async (title, description, tag) => {
        const payload = { title, description, tag };
        try {
            const response = await fetch(`${host}/note/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmE5OGE4OTRlZDlhMmQ5M2U1ZTNjNSIsImVtYWlsIjoiYWtzaGl0amFhdDk5QHlvcG1haWwuY29tIiwiaWF0IjoxNzE4MjYzNDkzLCJleHAiOjE3MTkxMjc0OTN9.GR4zWh6N4Zy2MuNPPBx1P-Slo4z_oU5vtYK6XOM2SHg'
                },
                body: JSON.stringify(payload),
            });
            const newNote = await response.json();
            setNotes([...notes, newNote]);
        } catch (error) {
            console.error('Failed to add note:', error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/note/${id}`, { method: 'DELETE' });
            const json = await response.json();

            if (json.success) {
                setNotes(notes.filter((note) => note._id !== id));
            } else {
                console.error('Failed to delete the note:', json.message);
            }
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    const editNote = async (id, title, description, tag) => {
        console.log("edit---->", id, title, description, tag)
        try {
            const response = await fetch(`${host}/note/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, tag }),
            });
            const json = response.json()
            console.log(json)
        }
        catch (error) {
            console.error('Failed to edit note:', error);
        }
    }


    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    );
};


export default NoteState;
