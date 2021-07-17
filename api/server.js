const express = require('express')
const cors = require('cors')
const { logger } = require('./projects/projects-middleware')
const projectsRouter = require('./projects/projects-router')


const server = express();

// Configure your server here
server.use(cors())
server.use(express.json())

server.use('/api/projects', [logger, logger], projectsRouter)

// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get('/', logger, (req, res, next) => {
	res.send(`LambdaProjects API`)
	next()
})
module.exports = server;
