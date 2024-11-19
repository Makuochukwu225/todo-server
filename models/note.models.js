const mongoose = require('mongoose');
const noteSchema = mongoose.Schema(
    {
        noteTitle: {
            type: String,
            default: null,
            required: true,
        },
        noteDescription: {
            type: String,
            default: null,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'noteUsersModel',
        },
        isComplete: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);



module.exports = mongoose.model('noteModel', noteSchema);