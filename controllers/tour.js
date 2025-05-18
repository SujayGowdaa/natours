import Tour from '../models/tour.js';

function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
  });
}

function getTour(req, res) {
  res.status(200).json({
    message: 'success',
  });
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
    console.log(err);
    res.status(400).json({
      status: 'failed',
      message: 'failed to create a tour.',
    });
  }
}

function updateTour(req, res) {
  res.status(200).json({
    message: 'success',
  });
}

function deleteTour(req, res) {
  res.status(203).json({
    message: 'success',
    data: null,
  });
}

export { getAllTours, getTour, createTour, updateTour, deleteTour };
