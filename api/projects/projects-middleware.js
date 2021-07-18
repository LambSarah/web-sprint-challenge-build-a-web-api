// add middlewares here related to projects
const checkProjectsPayload = async (req, res, next) => {
	try {
		const changes = req.body
		console.log('req method: ', req.method)
		if (req.method.toLowerCase() === 'post') {
			if (changes.name && changes.description) {
				next()
			} else {
				next({
					status: 400,
					messages: 'Name, description and completed status required.'
				})
			}
		} else if (req.method.toLowerCase() === 'put') {
			if (changes.name && changes.description) {
				if (changes.completed === true || changes.completed === false) {
					next()
				} else {
					next({
						status: 400,
						message: 'Project id, description, notes, and completed status are required'
					})
				}
			} else {
				next({
					status: 400,
					message: 'Project id, description, notes, and completed status are required'
				})
			}
		}

	} catch (err) {
		next(err)
	}
}

module.exports = {
	checkProjectsPayload
}