const mongoose = require('mongoose');
const cardSchema = mongoose.Schema(
    {

        cardId: {
            type: String,
            unique: true,
            default: null,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel',
        },
        isUse: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);



module.exports = mongoose.model('cardModel', cardSchema);