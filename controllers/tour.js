import fs from 'fs';

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

function checkId(req, res, next, val) {
  const tour = tours.find((tour) => tour.id === Number(req.params.id));
  if (!tour) {
    res.status(404).json({
      message: 'No data: Please use a different ID',
    });
  }

  next();
  console.log(`Id is: ${val}`);
}

function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

function getTour(req, res) {
  const tour = tours.find((tour) => tour.id === Number(req.params.id));

  res.status(200).json({
    message: 'success',
    data: {
      tour,
    },
  });
}

function createTour(req, res) {
  const newTour = { id: tours[tours.length - 1].id + 1, ...req.body };
  tours.push(newTour);

  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(err);
    }
  );

  res.status(201).json({
    message: 'success',
    data: {
      tour: newTour,
    },
  });
}

function updateTour(req, res) {
  const tour = tours.find((tour) => tour.id === Number(req.params.id));

  const updatedTour = { ...tour, ...req.body };
  const updatedTours = tours.map((el) =>
    el.id === Number(req.params.id) ? updatedTour : el
  );

  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      console.log(err);
    }
  );

  res.status(200).json({
    message: 'success',
    data: {
      tour: updatedTour,
    },
  });
}

function deleteTour(req, res) {
  const updatedTours = tours.filter((el) => el.id !== Number(req.params.id));

  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      console.log(err);
    }
  );

  res.status(203).json({
    message: 'success',
    data: null,
  });
}

export { checkId, getAllTours, getTour, createTour, updateTour, deleteTour };
