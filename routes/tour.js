import express from 'express';
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkId,
} from '../controllers/tour.js';

const toursRouter = express.Router();

toursRouter.param('id', checkId);
toursRouter.route('/').get(getAllTours).post(createTour);
toursRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default toursRouter;
