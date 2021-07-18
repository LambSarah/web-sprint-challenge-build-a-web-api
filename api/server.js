const express = require('express')
const cors = require('cors')
const { logger, notFound, errorHandling } = require('./middleware')

const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

const server = express();

// Configure your server here
server.use(cors())
server.use(express.json())

server.use('/api/projects', [logger, logger], projectsRouter)
server.use('/api/actions', [logger, logger], actionsRouter)
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get('/', logger, (req, res, next) => {
	res.send(`LambdaProjects API`)
	next()
})

server.use('*', notFound)

server.use(errorHandling)
module.exports = server;
