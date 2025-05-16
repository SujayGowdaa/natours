const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); // is a built-in middleware function in Express.js that tells your app to automatically parse incoming JSON data from the request body.

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

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

  if (!tour) {
    res.status(404).json({
      message: 'No data: Please use a different ID',
    });
  } else {
    res.status(200).json({
      message: 'success',
      data: {
        tour,
      },
    });
  }
}

function createTour(req, res) {
  const newTour = { id: tours[tours.length - 1].id + 1, ...req.body };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
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

  if (!tour) {
    res.status(404).json({
      message: 'No data: Please use a different ID',
    });
  } else {
    const updatedTour = { ...tour, ...req.body };
    const updatedTours = tours.map((el) =>
      el.id === Number(req.params.id) ? updatedTour : el
    );

    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
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
}

function deleteTour(req, res) {
  const tour = tours.find((tour) => tour.id === Number(req.params.id));

  if (!tour) {
    res.status(404).json({
      message: 'No data: Please use a different ID',
    });
  } else {
    const updatedTours = tours.filter((el) => el.id !== Number(req.params.id));

    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
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
}

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
