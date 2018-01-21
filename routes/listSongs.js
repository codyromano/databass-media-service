const config = require('../config');
const Storage = require('@google-cloud/storage');

// Create a Google Cloud Storage client
const storage = new Storage();

const getReadableFileName = (fileName) => {
  // Replace underscores with spaces, remove the extension
  // and uppercase all words
  return fileName
    .replace(/_/gi, ' ')
    .replace(/\.[^/.]+$/, '')
    .replace(/\b\w/g, l => l.toUpperCase());
};

const getRelevantMetadata = (fileObj) => ({
  // Remove non-alphnumeric characters
  id: fileObj.id.replace(/[^0-9a-z]/gi, ''),
  name: getReadableFileName(fileObj.name),
  mediaLink: fileObj.metadata.mediaLink
});

const sortByName = (fileObjA, fileObjB) => fileObjA.name > fileObjB.name;

const isAudioFile = (fileObj) => 
  fileObj.metadata.contentType.toLowerCase().includes('audio');

module.exports = function listSongs() {
  const files = storage
    .bucket(config.googleCloudBucketName)
    .getFiles();

  return files.then(results => {
    const files = results[0];

    const songs = files
      .filter(isAudioFile)
      .map(getRelevantMetadata)
      .sort(sortByName);

    return Promise.resolve(songs);
  })
  .catch(err => {
    return Promise.reject(err);
  });
};
