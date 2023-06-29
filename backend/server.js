const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Handling Uncaught Error
process.on('uncaughtException', (err)=>{
    console.log("Error: ", err.message);
    console.log("Shutting down the server due to Uncaught sException");
        process.exit(1);
})

dotenv.config({path: "backend/config/.env"});

connectDatabase();

// app.get('/api', (req, res) => {
//     res.json({ "userse": "asd" });
// })

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