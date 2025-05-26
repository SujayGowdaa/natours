import express from 'express';
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTopFive,
} from '../controllers/tour.js';

const toursRouter = express.Router();

toursRouter.route('/top-5-tours').get(getTopFive, getAllTours);
toursRouter.route('/').get(getAllTours).post(createTour);
toursRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default toursRouter;
