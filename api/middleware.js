
const notFound = (req, res, next) => { // eslint-disable-line
	res.status(404).json({
		message: 'Resource not found'
	})
}

const errorHandling = (err, req, res, next) => { // eslint-disable-line
	const status = err.status || 500
	res.status(status).json({
		message: err.message,
	})
}

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

	console.log(`Method: ${method}`)
	console.log(`Request url: ${url} from: ${host} on ${formatted_date_time}`)
	next()
}



module.exports = {
	notFound,
	errorHandling,
	logger
}