/* eslint-disable no-undef */
import fs from 'fs';
import mongoose from 'mongoose';
import Tour from '../../models/tour.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error 🔥:', err.message)); // .message instead of .errorResponse.errmsg

// ✅ CORRECTED: Read JSON file synchronously (no callback)
const toursData = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);

// Import data into DB
async function importData() {
  try {
    await Tour.create(toursData);
    console.log('Data imported successfully!');
    process.exit(); // Exit after success
  } catch (err) {
    console.log(err);
  }
}

// Delete data from DB
async function deleteData() {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully!');
    process.exit(); // Exit after success
  } catch (err) {
    console.log(err);
  }
}

// Choose action based on command line args
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
