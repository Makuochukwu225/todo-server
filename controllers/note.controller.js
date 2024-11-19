const NoteModel = require('../models/note.models');
const { Request: ExpressRequest, Response: ExpressResponse } = require('express');

// Middleware
const { verifyToken } = require('../middleware/auth.middleware');

exports.createNote = [
    verifyToken,
    async (req = ExpressRequest, res = ExpressResponse) => {
        try {
            const newNote = new NoteModel({
                ...req.body,
                user: req.user.id, // Optionally associate note with the logged-in user
            });
            await newNote.save();
            res.status(201).json({ message: 'Note created successfully', note: newNote });
        } catch (error) {
            res.status(400).json({ message: 'Failed to create note', error: error.message });
        }
    },
];

exports.deleteNote = [
    verifyToken,
    async (req = ExpressRequest, res = ExpressResponse) => {
        try {
            const { id } = req.params;

            const note = await NoteModel.findById(id);
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }

            // Optional: Ensure the logged-in user owns the note
            if (note.user.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Access denied: Unauthorized' });
            }

            await note.remove();
            res.status(200).json({ message: 'Note deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Failed to delete note', error: error.message });
        }
    },
];

exports.getAllNotes = [
    verifyToken,
    async (req = ExpressRequest, res = ExpressResponse) => {
        try {
            // Fetch only notes belonging to the logged-in user
            const notes = await NoteModel.find({ user: req.user.id });
            res.status(200).json({ notes });
        } catch (error) {
            res.status(400).json({ message: 'Failed to fetch notes', error: error.message });
        }
    },
];

exports.getSingleNote = [
    verifyToken,
    async (req = ExpressRequest, res = ExpressResponse) => {
        try {
            const { id } = req.params;
            const note = await NoteModel.findById(id);

            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }

            // Optional: Ensure the logged-in user owns the note
            if (note.user.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Access denied: Unauthorized' });
            }

            res.status(200).json({ note });
        } catch (error) {
            res.status(400).json({ message: 'Failed to fetch note', error: error.message });
        }
    },
];

exports.updateNote = [
    verifyToken,
    async (req = ExpressRequest, res = ExpressResponse) => {
        try {
            const { id } = req.params;

            const note = await NoteModel.findById(id);
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }

            // Optional: Ensure the logged-in user owns the note
            if (note.user.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Access denied: Unauthorized' });
            }

            const updatedNote = await NoteModel.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
        } catch (error) {
            res.status(400).json({ message: 'Failed to update note', error: error.message });
        }
    },
];
