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
		if (!req.body.project_id || req.body.description || req.body.notes) {
			next({
				status: 400,
				message: 'Project id, description, and notes are required'
			})
		} else {
			next()
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