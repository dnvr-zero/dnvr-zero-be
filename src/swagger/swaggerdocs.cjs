import swaggerJsdoc from 'swagger-jsdoc';

export default function swaggerDocs() {
  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'dnvr-zero-be',
        swagger: '2.0',
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
              createdBy: {
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
              groupID: {
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

  return swaggerJsdoc(options);
}

// const swaggerDocs = swaggerJsdoc(options);