const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            default: null,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // Regular expression for email validation
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Add timestamps to the schema
    }
);



module.exports = mongoose.model('noteUsersModel', userSchema);