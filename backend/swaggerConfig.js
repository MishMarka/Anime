const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Anime Charting API',
    version: '1.0.0',
    description: 'API documentation for the Anime Charting application',
    contact: {
      name: 'API Support',
      url: 'https://github.com/MishMarka/Anime'
    }
  },
  servers: [
    {
      url: '/api',
      description: 'Development server'
    },
    {
      url: 'https://anime-charting-app.netlify.app/api',
      description: 'Production server'
    }
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'User ID'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'User creation timestamp'
          }
        }
      },
      Chart: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Chart ID'
          },
          title: {
            type: 'string',
            description: 'Chart title'
          },
          description: {
            type: 'string',
            description: 'Chart description'
          },
          user_id: {
            type: 'string',
            format: 'uuid',
            description: 'ID of the user who owns the chart'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Chart creation timestamp'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'Chart last update timestamp'
          }
        }
      },
      Page: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Page ID'
          },
          title: {
            type: 'string',
            description: 'Page title'
          },
          chart_id: {
            type: 'string',
            format: 'uuid',
            description: 'ID of the chart this page belongs to'
          },
          layout: {
            type: 'object',
            description: 'Page layout configuration'
          },
          order: {
            type: 'integer',
            description: 'Order of the page within the chart'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Page creation timestamp'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'Page last update timestamp'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error message'
          }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token in the format: ******'
      }
    },
    responses: {
      UnauthorizedError: {
        description: 'Access token is missing or invalid',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              error: 'Unauthorized - Invalid token'
            }
          }
        }
      },
      NotFoundError: {
        description: 'The specified resource was not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              error: 'Resource not found'
            }
          }
        }
      },
      BadRequestError: {
        description: 'The request is invalid or missing required parameters',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              error: 'Invalid request parameters'
            }
          }
        }
      },
      InternalServerError: {
        description: 'An error occurred on the server',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              error: 'Internal server error'
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Auth',
      description: 'Authentication and authorization operations'
    },
    {
      name: 'Users',
      description: 'User management operations'
    },
    {
      name: 'Charts',
      description: 'Chart operations'
    },
    {
      name: 'Pages',
      description: 'Page operations'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: [
    './routes/*.js',
    './app.js'
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;