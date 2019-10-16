// Imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Tell server to use express library
const server = express();

// What will our server be using?
server.use(helmet());
server.use(express.json()); // << parses our server to json format
server.use(cors());

// Use routers after creation

// Always export
module.exports = server;
