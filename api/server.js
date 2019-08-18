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
