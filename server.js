require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToMongo } = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// Route imports
const petsRoutes = require('./routes/pets');
const ownersRoutes = require('./routes/owners');
const veggiesRoutes = require('./routes/veggies');
const fruitsRoutes = require('./routes/fruits');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('CrudOperations API is running');
});

// API Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/pets', petsRoutes);
app.use('/owners', ownersRoutes);
app.use('/veggies', veggiesRoutes);
app.use('/fruits', fruitsRoutes);

// Start server after DB connects
connectToMongo()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
