const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT= 3000;
const todoRoutes= require('./routes/todo-routes');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/todoDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
            console.log('Database is Connected');
    })
    .catch((err)=>{
        console.log('Error while connecting to Database',err);
    })
    app.use('/api/v1',todoRoutes)

    app.listen(PORT,()=>{
        console.log(`Server listening on ${PORT}` );
    });