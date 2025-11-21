// This file exports an array of video URLs available under `static/videos/`.
// It is safe to use encodeURI to handle special characters in filenames.

const videos = [
  encodeURI('/videos/624×624-animal.mp4'),
  encodeURI('/videos/624×624-food.mp4'),
];

module.exports = videos;
