const config = require('./config');
const express = require('express');
const listSongs = require('./routes/listSongs');

const app = express();

app.get('/media-api/list-songs', function(request, result) {
  listSongs()
    .then(songList => result.send(
      JSON.stringify(songList)
    ));
});

app.listen(config.httpPort);
console.log(`Listening on ${config.httpPort}`);
