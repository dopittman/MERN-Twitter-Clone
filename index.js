const express = require('express');
const mongoose = require('mongoose');
const passport  = require('passport');

const users = require('./routes/users')
const chirps = require('./routes/chirps')
const comments = require('./routes/comments')



const app = express();
const db = require('./config/keys').mongoURI;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
require('./config/passport')(passport);


app.use('/api/users', users);
app.use('/api/chirps', chirps);
app.use('/api/comments', comments);

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

app.get('/', (req, res)=>{
  res.send('It works')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is active on ${PORT}`));
