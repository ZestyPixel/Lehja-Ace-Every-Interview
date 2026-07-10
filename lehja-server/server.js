const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routes/routes');
const cookieParser = require('cookie-parser');

dotenv.config(); //This loads environment variables from a .env file into process.env
connectDB();

app.use(express.json()); //This middleware is used to parse incoming requests with JSON.
app.use(cors({
    origin: ['http://localhost:5173',],
    credentials: true, //Without this option, the browser will not send cookies with requests to the server.
}));
app.use(cookieParser());

app.use('/lehja', userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});