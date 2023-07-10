const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

dotenv.config({ path: 'backend/config/.env' });

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Handling Uncaught Error
process.on('uncaughtException', (err) => {
  console.log('Error: ', err.message);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});

connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const userRoute = require('./routes/UsersRoute');
const articleRoute = require('./routes/ArticleRoute');

app.use('/api/v1', userRoute);
app.use('/api/v1', articleRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ errorMessage: 'Internal Server Error' });
});

const server = app.listen(8000, () => {
  console.log('Server is listening on http://localhost:8000');
});

process.on('unhandledRejection', (err) => {
  console.log('Error: ', err.message);
  console.log('Shutting down the server due to Unhandled Promise Rejection');
  server.close(() => {
    process.exit(1);
  });
});