import Tour from '../models/tour.js';

async function getAllTours(req, res) {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
}

async function getTour(req, res) {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      message: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
}

async function createTour(req, res) {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      message: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
}

async function updateTour(req, res) {
  res.status(200).json({
    message: 'success',
  });
}

async function deleteTour(req, res) {
  res.status(203).json({
    message: 'success',
    data: null,
  });
}

export { getAllTours, getTour, createTour, updateTour, deleteTour };
