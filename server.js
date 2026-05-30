require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');          
const passport = require('passport');                
require('./auth/passport');                          

const { connectToMongo } = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// Route imports
const petsRoutes = require('./routes/pets');
const ownersRoutes = require('./routes/owners');
const veggiesRoutes = require('./routes/veggies');
const fruitsRoutes = require('./routes/fruits');
const authRoutes = require('./routes/auth');         

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// 🔐 SESSION + PASSPORT MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,              
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());                      
app.use(passport.session());                         

// Root route
app.get('/', (req, res) => {
  res.send('CrudOperations API is running');
});

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use('/auth', authRoutes);                        
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
