// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
	Projects.get()
		.then(projects => {
			if (projects) {
				if (projects.length > 0) {
					console.log('projects:', projects)
					res.status(200).json(projects)
				} else {
					res.status(200).json([])
				}
			}
		})
		.catch(err => {
			console.log(err)
		})
})

router.get('/:id', (req, res) => {
	Projects.get(req.params.id)
		.then(project => {
			project ? res.status(200).json(project) : res.status(404).json({ message: 'Project not found.' })
		})
		.catch(err => {
			console.log(err)
		})
})

module.exports = router