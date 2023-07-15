const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB).then((data) => {
    console.log(`MongoDB connected: ${data.connection.host}`);
});