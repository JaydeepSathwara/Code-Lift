const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const errorMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

// Handling Uncaught Error
process.on('uncaughtException', (err)=>{
    console.log("Error: ", err.message);
    console.log("Shutting down the server due to Uncaught sException");
        process.exit(1);
})

dotenv.config({path: "backend/config/.env"});

connectDatabase();

app.get('/api/v1/api', (req, res) => {
    res.json({ "userse": "asd" });
})


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

const userRoute = require('./routes/UsersRoute');
const articleRoute = require('./routes/ArticleRoute');
// const orderRoute = require('./routes/orderRoute');

app.use('/api/v1', userRoute);
app.use('/api/v1', articleRoute);

const server = app.listen(8000, () => {
    console.log(`Server is listing on http://localhost:8000 ${process.env.PORT}`);
})

process.on('unhandledRejection',(err) => {
    console.log("Error: ", err.message);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    })
});