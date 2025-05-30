import express from 'express';
import morgan from 'morgan';
import toursRouter from './routes/tour.js';
import userRouter from './routes/user.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config({
  path: './config.env',
});

// 1. Common Middlewares
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); // is a built-in middleware function in Express.js that tells your app to automatically parse incoming JSON data from the request body.
app.use(express.static('./public/')); // It allows users to access public files in the browser directly by URL, without needing a route for each one.

app.use((req, res, next) => {
  console.log('Hello from middleware 👋');
  next();
});

// 2. Routes and Route Handlers
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);

export default app;
