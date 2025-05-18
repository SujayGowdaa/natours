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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Price is required!'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The test',
  price: 200,
});

testTour
  .save()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
