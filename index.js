require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('./helpers/server');
const connectDb = require('./helpers/db');
const setupSwagger = require('./helpers/swagger');



const app = express();
const server = http.createServer(app);



// Initialize socket.io
socketIO.init(server);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Setup Swagger
setupSwagger(app);

// Routes
app.use('/api/v1/user', require('./routes/user.route'));
app.use('/api/v1/note', require('./routes/note.route'));

// Base route
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Server up and running! Looks Greate" });
});

// Webhook route
app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body);
    res.status(200).send('Webhook received');
    const io = socketIO.getIO();
    io.emit('webhookData', req.body);
});

// Start server
const start = async () => {
    try {
        await connectDb();
        server.listen(process.env.PORT || 4000, () =>
            console.log(`Server is listening on port ${process.env.PORT || 4000}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
