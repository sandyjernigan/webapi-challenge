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

// Base Folder
server.get('/', (req, res) => {
  res.send(`<h2>Hello World!</h2><p><a href="./api/projects">Projects</a></p><p><a href="./api/actions">Actions</a></p>`)
});