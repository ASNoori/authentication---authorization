const express = require('express');
const app = express();

// const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

//add cors
const cors = require('cors');

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const joivalidationRoute = require('./routes/joivalidationauth')
//connect DB
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/User');//last step.& Student is db name
const userModel = require('./models/auth.model');

//middlewares
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/uploads',express.static('uploads'));
//add cors
app.use(cors({
    origin: 'http://localhost:4200'
}));

//Route middlewares
app.use('/api/user',authRoute);
app.use('/api/post',postRoute);
app.use('/checkvalidation',joivalidationRoute)



app.listen(process.env.PORT || 3000,()=>{
    console.log("Server up and running");
})
