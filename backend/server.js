const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require("socket.io");
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const bugsRouter = require('./routes/api/bugs');
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');


app.use('/api/bugs', bugsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// serve static assest if in production
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '../build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    })
}

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

const io = socketIo(server);

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", socket => {
    console.log("New client connected");

    //Here we listen on a new namespace called "incoming data"
    socket.on("createBug", () => {
        io.sockets.emit("createBug");
    });
    socket.on("finishBug", (id) => {
        io.sockets.emit("finishBug", id);
    });

    socket.on("editBug", (bug) => {
        io.sockets.emit("editBug", bug);
    });
    socket.on("deleteBug", (id) => {
        io.sockets.emit("deleteBug", id);
    });
    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
});