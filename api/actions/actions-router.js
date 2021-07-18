// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')
const { checkProjectId,/* checkActionsPayload */ } = require('./actions-middlware.js')

const router = express.Router()

router.use(express.json())

/*
[GET] /api/actions
Returns an array of actions (or an empty array) as the body of the response.*/
router.get('/', (req, res) => {
	Actions.get()
		.then(actions => {
			actions.length > 0 ? res.status(200).json(actions)
				:
				res.status(200).json([])
		})
		.catch(err => console.log(err)

		)
})

/*
[GET] /api/actions/:id
Returns an action with the given id as the body of the response.
If there is no action with the given id it responds with a status code 404.*/
router.get('/:id', (req, res) => {
	Actions.get(req.params.id)
		.then(action => {
			action ? res.status(200).json(action) : res.status(404).json({ message: 'Action does not exist' })
		})
		.catch(err => console.log(err))
})

/*
[POST] /api/actions
Returns the newly created action as the body of the response.
If the request body is missing any of the required fields it responds with a status code 400.
When adding an action make sure the project_id provided belongs to an existing project.*/
router.post('/', checkProjectId, async (req, res, next) => {
	if (req.body.project_id && req.body.description && req.body.notes) {
		Actions.insert(req.body)
			.then(action => {
				action ? Actions.get(action.id)
					.then(newAction => {
						res.status(200).json(newAction)
					})
					: err => {
						next(err)
					}

			})

	} else {
		res.status(400).json({ message: 'Project_id, name and description required.' })
	}
})
/*[PUT] /api/actions/:id
Returns the updated action as the body of the response.
If there is no action with the given id it responds with a status code 404.
If the request body is missing any of the required fields it responds with a status code 400.
 [DELETE] /api/actions/:id
Returns no response body.
If there is no action with the given id it responds with a status code 404.
*/

module.exports = router