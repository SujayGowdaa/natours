import Tour from '../models/tour.js';

async function getTopFive(req, res, next) {
  req.url =
    '?limit=5&sort=-ratingsAverage,price&fields=name,price,ratingsAverage,difficulty,summary';

  next();
}

async function getAllTours(req, res) {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['limit', 'page', 'sort', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

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

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();

      if (skip > numTours) {
        throw new Error("This page doesn't exist.");
      }
    }

    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
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
      status: 'fail',
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
      status: 'fail',
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
      status: 'fail',
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
      status: 'fail',
      message: err,
    });
  }
}

async function getTourStats(req, res) {
  try {
    const stats = await Tour.aggregate([
      {
        $match: {
          ratingAverage: {
            $gte: 4.5,
          },
        },
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: {
            $sum: 1,
          },
          numRatings: {
            $sum: '$ratingQuantity',
          },
          avgRating: {
            $avg: '$ratingAverage',
          },
          avgPrice: {
            $avg: '$price',
          },
          minPrice: {
            $min: '$price',
          },
          maxPrice: {
            $max: '$price',
          },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
    ]);

    res.status(200).json({
      message: 'success',
      data: stats,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

// export all the functions
export {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTopFive,
  getTourStats,
};
