const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '33c8738accdb44cd87428a9aab08dfa0'
});

const handleApiCall = (req, res) => {
	app.models
		.predict("d02b4508df58432fbb84e800597b8959", req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}