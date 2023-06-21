import express, { json } from 'express';
import mongoose from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const cors = require('cors');
require('dotenv/config');

const app = express();
app.use(
	cors({
		origin: ['https://dnvr-zero-be.vercel.app/task', 'http://localhost:8000'],
	})
);

const taskRouter = require('./routes/tasks');
const playerRouter = require('./routes/players');

app.use(express.json())
app.use("/tasks", taskRouter)
app.use("/players", playerRouter)

const PORT = 8000;

const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'dnvr-zero-be',
			summary: 'the backend endpoints for the SOA of dnvr-zero',
			description:
				'documentation for the available endpoints to retrieve, update, delete data from dnvr-zero-be',
			version: '3.0.0',
			contact: {
				name: 'Michael Marchand',
				email: 'MichaelDavidMarchand@gmail.com',
			},
			servers: ['http://localhost:8000'],
		},
		servers: [
			{
				url: 'http://localhost:8000',
				description: 'Development Server',
			},
		],
		components: {
			schemas: {
				TaskItem: {
					type: 'object',
					required: ['name'],
					properties: {
						name: {
							type: 'string',
							example: 'name of task',
						},
						description: {
							type: 'string',
							example: 'a really cool description of the task',
						},
						points: {
							type: 'string',
							example: '50 points',
						},
						createdby: {
							type: 'string',
							example: 'Anon Player',
						},
					},
				},
				PlayerItem: {
					type: 'object',
					required: ['username'],
					properties: {
						username: {
							type: 'string',
							example: 'userName',
						},
						level: {
							type: 'Number',
							example: '1',
						},
						score: {
							type: 'Number',
							example: '50',
						},
						email: {
							type: 'string',
							example: 'email@email.com',
						},
						group_id: {
							type: 'Number',
							example: '1',
						},
					},
				},
			},
		},
		externalDocs: {
			description:
				'To see additional documentation for the project, click here',
			url: 'https://github.com/dnvr-zero',
		},
	},
	apis: ['src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(options);
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/docs.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerDocs);
});

// Routes
app.get('/', async (request, response) => {
	response.send('The node.js app works');
});

// Database connection
mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB Connected '))
	.catch((err) => console.log('error'));

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

module.exports = app;
