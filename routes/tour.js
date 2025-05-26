import express from 'express';
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTopFive,
  getTourStats,
} from '../controllers/tour.js';

const toursRouter = express.Router();

toursRouter.route('/top-5-tours').get(getTopFive, getAllTours);
toursRouter.route('/tour-stats').get(getTourStats);
toursRouter.route('/').get(getAllTours).post(createTour);
toursRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default toursRouter;
