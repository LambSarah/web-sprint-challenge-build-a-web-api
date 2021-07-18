// add middlewares here related to projects
const logger = (req, res, next) => {
	let current_date_time = new Date()
	let formatted_date_time =
		current_date_time.getFullYear()
		+ '-'
		+ (current_date_time.getMonth() + 1)
		+ '-'
		+ current_date_time.getDate()
		+ ' '
		+ current_date_time.getHours()
		+ ':'
		+ current_date_time.getMinutes()
		+ ':'
		+ current_date_time.getSeconds();

	let method = req.method
	let url = req.url
	let host = req.headers.host
	let resp = res.statusCode


	console.log(`Method: ${method}`)
	console.log(`Request url: ${url} from: ${host} on ${formatted_date_time}`)
	console.log(`Response: ${resp} `)
	next()
}

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
	logger,
	checkProjectsPayload
}