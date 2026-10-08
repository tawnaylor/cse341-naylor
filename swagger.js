const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts'
  },
  host: 'cse341-naylor.onrender.com',
  schemes: ['https'],
  definitions: {
    Contact: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      favoriteColor: 'blue',
      birthday: '1990-01-01'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);