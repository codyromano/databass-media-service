const config = require('./config');
const express = require('express');
const listSongs = require('./routes/listSongs');

const app = express();

// Enable CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  next();
});

app.get('/media-api/list-songs', function(request, result) {
  listSongs()
    .then(songList => result.send(
      JSON.stringify(songList)
    ))
    .catch(err => {
      console.log('Error fetching songs: ', err);
      const errorResponse = JSON.stringify({
        error: 'Issue fetching songs'
      });

      result.send(errorResponse);
    });
});

app.listen(config.httpPort);
console.log(`Listening on ${config.httpPort}`);
