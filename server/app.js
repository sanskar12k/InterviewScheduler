const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const candRoute = require('./routes/cand');
const cors = require('cors');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


mongoose.connect(process.env.MONGO_D,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(()=>console.log('Connected to DB'))
  .catch((e)=> console.log(e))

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(cors({
    orign:'http://localhost:3000',
    credentials: true,
    optionSuccessStatus:200,
}))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user', userRoute);
app.use('/cand', candRoute);

app.get('/', (req, res)=>{
    res.send('Test api succesfully')
})

app.get('*', (req, res)=>{
    res.send("Nothing here");
})

app.listen(8000, ()=>{
    console.log("Connected")
})
