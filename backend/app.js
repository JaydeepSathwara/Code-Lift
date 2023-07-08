// const express = require('express');
// const app = express();
// const errorMiddleware = require("./middleware/error");
// const cookieParser = require('cookie-parser');
// const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");

// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(fileUpload());

// // Importing Routes
// const userRoute = require('./routes/UsersRoute');
// const articleRoute = require('./routes/ArticleRoute');
// // const orderRoute = require('./routes/orderRoute');

// app.use('/api/v1', userRoute);
// app.use('/api/v1', articleRoute);
// // app.use('/api/v1', orderRoute);

// // Middleware for Error Handling
// app.use(errorMiddleware)
// module.exports = app;