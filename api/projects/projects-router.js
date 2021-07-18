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

router.post('/', (req, res) => {
	!req.body.name || !req.body.description ? res.status(400).json({ message: 'Project name and body are required' })
		: Projects.insert(req.body)
			.then((newProject) => {
				if (newProject) {
					Projects.get(newProject.id)
						.then((anotherNewProject) => {
							res.status(201).json(anotherNewProject)
						})
				}
			})
			.catch(err => {
				console.log(err)
				res.status(500).json({ message: 'Error adding project' })
			})
})

router.put('/:id', (req, res) => {
	const changes = req.body
	if (!changes.name || !changes.description) {
		res.status(400).json({ message: 'Please provide name and description for project' })

	} else {
		Projects.update(req.params.id, changes)
			.then(project => {
				res.status(200).json(project)
			})
			.catch(err => {
				console.log(err)
			})
	}
})

router.delete('/:id', (req, res, next) => {
	Projects.get(req.params.id)
		.then(project => {
			if (!project) {
				res.status(404).json('Project could not be found')
				next()
			} else {
				Projects.remove(project.id)
					.then(count => {
						res.status(200)
						console.log(count, "count")
						next()
					})
					.catch(err => {
						console.log(err)
						next()
					})

			}
		})
		.catch(err => console.log(err))
})


router.get('/:id/actions', async (req, res) => {
	try {
		const { id } = req.params
		const actions = await Projects.getProjectActions(id)
		actions.length ? res.status(200).json(actions)
			:
			res.status(200).json([])

	} catch (err) {
		console.log(err)
	}
})
module.exports = router