// src/services/billboardService.js

const billboard = require('billboard-top-100');

const getTopArtists = () => {
  return new Promise((resolve, reject) => {
    billboard.getChart('hot-100', (err, chart) => {
      if (err) reject(err);
      else {
        const artists = chart.songs.map((song) => song.artist);
        resolve([...new Set(artists)]); // Get unique artists
      }
    });
  });
};

module.exports = {
  getTopArtists,
};
