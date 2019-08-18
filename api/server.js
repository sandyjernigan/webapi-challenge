const express = require('express');
const helmet = require('helmet');

// Express
const server = express();
server.use(express.json());

// Routers
const ProjectsRouter = require('./ProjectsRouter.js');
const ActionsRouter = require('./ActionsRouter.js');
server.use('/api/projects', ProjectsRouter);
server.use('/api/actions', ActionsRouter);

// Middleware
server.use(express.json());
server.use(helmet());
server.use(logger);

//custom middleware
function logger(req, res, next) {
  const timeStamp = new Date().toUTCString();
  console.log(`Method: ${req.method} URL: ${req.url} Timestamp: ${timeStamp}`);
  next();
};

// Base Folder
server.get('/', (req, res) => {
  res.send(`<h2>Hello World!</h2><p><a href="./api/projects">Projects</a></p><p><a href="./api/actions">Actions</a></p>`)
});

