const users = require('./routes/users');
const auth = require('./routes/auth');
const cards = require('./routes/cards');
const express = require('express');
const cors = require('cors'); //never use when not on the localhost!!
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_rest_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(`Could not connect to MongoDB... ${err} `));

app.use(cors()); //never use when not on the localhost!!
app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/cards', cards); 

const port = 8181;
http.listen(port, () => console.log(`Listening on port ${port}`));