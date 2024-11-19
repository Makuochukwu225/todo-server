const router = require('express').Router();
const controller = require('../controllers/note.controller');

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for managing notes
 */

/**
 * @swagger
 * /api/v1/note/notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/notes', controller.getAllNotes);

/**
 * @swagger
 * /api/v1/note/notes/{id}:
 *   get:
 *     summary: Get a single note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: A single note object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/notes/:id', controller.getSingleNote);

/**
 * @swagger
 * /api/v1/note/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: [] # Require token authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noteTitle:
 *                 type: string
 *               noteDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 */
router.post('/notes', controller.createNote);

/**
 * @swagger
 * /api/v1/note/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: [] # Require token authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noteTitle:
 *                 type: string
 *               noteDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 */
router.put('/notes/:id', controller.updateNote);

/**
 * @swagger
 * /api/v1/note/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: [] # Require token authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       204:
 *         description: Note deleted
 */
router.delete('/notes/:id', controller.deleteNote);

module.exports = router;
