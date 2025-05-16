import express from 'express';
import morgan from 'morgan';
import toursRouter from './routes/tour.js';
import userRouter from './routes/user.js';

const app = express();

// 1. Common Middlewares
app.use(morgan('dev'));

app.use(express.json()); // is a built-in middleware function in Express.js that tells your app to automatically parse incoming JSON data from the request body.

app.use((req, res, next) => {
  console.log('Hello from middleware 👋');
  next();
});

// 2. Routes and Route Handlers
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);

export default app;
