const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

dotenv.config({path: "backend/config/.env"});

connectDatabase();

app.get('/api', (req, res) => {
    res.json({ "userse": "asd" });
})

const server = app.listen(8000, () => {
    console.log(`Server is listing on http://localhost:${process.env.PORT}`);
})