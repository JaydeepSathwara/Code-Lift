const express = require("express");
const cors = require("cors");
require('dotenv').config();
require('./config.js');
const UserRoute = require('./routes/UserRoute.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser());

app.use('/', UserRoute);

// app.post("/signup", async (req, res) => {
//     const { name, email, password } = req.body;
//     const userCheck = await User.findOne({ email });
//     if (userCheck) {
//         return res.status(400).json({ 'errorMessage': "Email Is Already In Use" });
//     }
//     try {
//         const UserData = await User.create({
//             name, email, password: bcrypt.hashSync(password, bcrypt_secret)
//         })
//         return res.json(UserData);
//     } catch (e) {
//         console.log(e);
//         return res.status(422).json(e);
//     }
// })

app.listen(8000);