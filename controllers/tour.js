import Tour from '../models/tour.js';

async function getAllTours(req, res) {
  try {
    const queryObj = { ...req.query };
    const excudedFields = ['limit', 'page', 'sort', 'fields'];
    excudedFields.forEach((el) => delete queryObj[el]);

    let query = Tour.find(queryObj);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    const tours = await query;

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
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // add the 3rd parameter to return the newly added document
      runValidators: true,
    });

    res.status(200).json({
      message: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
}

async function deleteTour(req, res) {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      message: 'success',
      data: deletedTour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
}
// export all the functions
export { getAllTours, getTour, createTour, updateTour, deleteTour };
