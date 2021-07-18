// add middlewares here related to actions
const Projects = require('../projects/projects-model')

const checkProjectId = async (req, res, next) => {
	try {
		const { project_id } = req.param
		const project = await Projects.get(project_id)
		if (project) {
			req.project = project
			next()
		} else {
			next({
				status: 404,
				message: `project with id ${project_id} not found`
			})
		}

	} catch (err) {
		next(err)
	}
}

const checkActionsPayload = async (req, res, next) => {
	try {
		const changes = req.body
		console.log(req.method, '  req method')
		if (req.method.toLowerCase() === 'post') {
			if (!changes.project_id || !changes.description || !changes.notes) {
				next({
					status: 400,
					message: 'Project id, description, and notes are required'
				})
			} else {
				next()
			}
		} else if (req.method.toLowerCase() === 'put') {
			if (changes.project_id || changes.description || changes.notes) {
				if (changes.completed === true || changes.completed === false) {
					next()
				}
			} else {
				next({
					status: 400,
					message: 'Project id, description, notes, and completed status are required'
				})
			}
		}
	}
	catch (err) {
		next(err)
	}
}
module.exports = {
	checkProjectId,
	checkActionsPayload
}