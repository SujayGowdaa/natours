import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({
  path: './config.env',
});
import app from './app.js';

mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.DATABASE)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error 🔥:', err.errorResponse.errmsg));

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
