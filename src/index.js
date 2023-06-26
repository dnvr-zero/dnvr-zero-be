const express = require('express');

const axios = require('axios');

// const clientID = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;

const clientID = 'c820624d21ec78915700';
const clientSecret = 'eaae81f74c0f049528e4dc7367abb26f62c62900';
const app = express();

app.get('/oauth/redirect', (req, res) => {
	const requestToken = req.query.code;
	axios({
		method: 'post',
		url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
		headers: {
			accept: 'application/json',
		},
	})
		.then((response) => {
			const accessToken = response.data.access_token;
			res.redirect(`http://localhost:3000/player-profile?access_token=${accessToken}`);
		})
		.catch((error) => {
			console.error('Error exchanging code for access token:', error);
			res.redirect('/'); // Redirect to the login page or error page
		});
});

app.use(express.static(__dirname + '/public'));
app.listen(8080, () => {
	console.log('Server is running on http://localhost:8080');
});
