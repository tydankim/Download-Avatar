'use strict';

// import modules
const request = require('request');
const fs = require('fs');
require('dotenv').config();

// directory name
const dir = './avatars/';
const root = 'https://api.github.com/repos/';

// downloadImageByURL
function downloadImageByURL(url, filePath) {
  // create folder
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } request(url).pipe(fs.createWriteStream(filePath)); // download avatar to specified folder
}

// callback
function callback(err, response, body) {
  // error handling
  if (err) {
    throw err;
  } const data = JSON.parse(body); // conver string to object

  // iterate through object
  for (let person in data) {
    downloadImageByURL(data[person].avatar_url, 'avatars/' + data[person].login + '.png');
  }
}

// getRepoContributors
function getRepoContributors(repoOwner, repoName, cb) {
  // https://api.github.com/repos/lighthouse-labs/laser_shark/contributors
  const options = {
    url: `${root}${repoOwner}/${repoName}/contributors`,
    auth: {
      bearer: process.env.DB_TOKEN,
    },
    headers: {
      'User-Agent': 'ty2kim',
    },
  };
  request.get(options, cb); // request call
}

getRepoContributors(process.argv[2], process.argv[3], callback);
