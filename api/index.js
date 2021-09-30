const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/authRoute');
const postsRouter = require('./routes/postsRoute');
const usersRouter = require('./routes/usersRoute');
const categoriesRouter = require('./routes/categoriesRoute');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

dotenv.config();
// CORS
app.use(cors());
app.options('*', cors());
// MIDDLEWARE
app.use(express.json());
app.use(
  '/public/uploads',
  express.static(path.join(__dirname + '/public/uploads'))
);

// ROUTES
app.use(`/api/posts`, postsRouter);
app.use(`/api/users`, usersRouter);
app.use(`/api/categories`, categoriesRouter);
app.use(`/api/auth`, authRouter);
app.use('*', (req, res, next) => {
  next(
    new AppError(`Can't find this url ${req.originalUrl} on the server`, 404)
  );
});

app.use(globalErrorHandler);
// DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE)
  .then((con) => console.log('Connected with the database...'))
  .catch((error) => console.error(error));

// SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
