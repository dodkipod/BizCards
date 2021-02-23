const users = require('./routes/users');
const auth = require('./routes/auth');
const cards = require('./routes/cards');
const express = require('express');
const cors = require('cors'); //never use when not on the localhost!!
const app = express();
const path = require('path');
const http = require('http').Server(app);
const mongoose = require('mongoose');

// ** MIDDLEWARE ** //
const whitelist = ['https://localhost:3000','https://localhost:5000','https://localhost:8080','https://localhost:8181','https://adamsbizcards.herokuapp.com'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

mongoose.connect('mongodb+srv://adam:bFa2SGm6hEub4J4rQPdG@cluster0.gda8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(`Could not connect to MongoDB... ${err} `));
 
// app.use(cors()); //never use when not on the localhost!!
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/cards', cards); 

// if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
// }

const port = process.env.PORT || 8181;
http.listen(port, () => console.log(`Listening on port ${port}`));