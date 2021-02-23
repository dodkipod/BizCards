const express = require('express');
const router = express.Router();
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  router.use(express.static(path.join(__dirname, 'client/build')));

  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

module.exports = router; 