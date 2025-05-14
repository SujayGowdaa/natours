const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); // is a built-in middleware function in Express.js that tells your app to automatically parse incoming JSON data from the request body.

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id === Number(req.params.id));

  if (!tour) {
    res.status(404).json({
      message: 'No data: Please use a different ID',
    });
  } else {
    res.status(200).json({
      message: 'Success',
      data: {
        tour,
      },
    });
  }
});

app.post('/api/v1/tours', (req, res) => {
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
    message: 'Success',
    data: {
      tour: newTour,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
