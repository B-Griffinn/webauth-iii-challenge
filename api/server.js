// Imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Import our routers
const userRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');

// Tell server to use express library
const server = express();

// What will our server be using?
server.use(helmet());
server.use(express.json()); // << parses our server to json format
server.use(cors());

// Use routers after creation
server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

// Always export
module.exports = server;
