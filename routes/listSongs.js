const config = require('../config');
const Storage = require('@google-cloud/storage');

// Create a Google Cloud Storage client
const storage = new Storage();

function getReadableFileName(fileName) {
  // Replace underscores with spaces, remove the extension
  // and uppercase all words
  return fileName
    .replace(/_/gi, ' ')
    .replace(/\.[^/.]+$/, '')
    .replace(/\b\w/g, l => l.toUpperCase());
}

module.exports = function listSongs() {
  const files = storage
    .bucket(config.googleCloudBucketName)
    .getFiles();

  return files.then(results => {
    const files = results[0];
    const songs = [];

    files.forEach(file => {
      songs.push({
        // Remove non-alphnumeric characters
        id: file.id.replace(/[^0-9a-z]/gi, ''),
        name: getReadableFileName(file.name),
        mediaLink: file.metadata.mediaLink
      });
    });

    return Promise.resolve(songs);
  })
  .catch(err => {
    return Promise.reject('Issue fetching songs');
  });
};
