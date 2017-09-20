/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

const fs = require('fs');
const Promise = require('bluebird');
const getProfile = require('./promisification.js').getGitHubProfileAsync;
const pluck = require('./promiseConstructor.js').pluckFirstLineFromFileAsync;
const write = Promise.promisify(fs.writeFile);

const fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluck(readFilePath)
    .then(handle => getProfile(handle))
    .then(profile => JSON.stringify(profile, null, 2))
    .then(stringifiedProfile => write(writeFilePath, stringifiedProfile));
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
