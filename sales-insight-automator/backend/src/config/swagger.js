const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Sales Insight Automator API',
    version: '1.0.0',
    description: 'API documentation for the Sales Insight Automator backend.',
  },
  servers: [
    {
      url: '/api/v1',
      description: 'API v1',
    },
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        description: 'Returns the health status of the API.',
        responses: {
          '200': {
            description: 'API is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    service: { type: 'string', example: 'Sales Insight Automator API' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/summary/generate': {
      post: {
        summary: 'Generate Sales Summary',
        description: 'Uploads a CSV/XLSX file, generates an AI summary, and sends it via email.',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: {
                    type: 'string',
                    format: 'binary',
                    description: 'Sales dataset (CSV or XLSX, max 5MB)'
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'Recipient email address'
                  }
                },
                required: ['file', 'email']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Summary generated and email sent successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Executive summary is being generated and will be sent to [email].' }
                  }
                }
              }
            }
          },
          '400': { description: 'Bad Request (invalid file type or missing email)' },
          '429': { description: 'Too Many Requests (rate limit exceeded)' },
          '500': { description: 'Internal Server Error (failed to parse file or contact AI service)' }
        }
      }
    }
  }
};

module.exports = swaggerDocument;
