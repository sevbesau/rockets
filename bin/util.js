/**
 * helper funtion that generates a random integer between 0 and the given maximum 
 * @param {int} max the maximum value for the generated int
 */
module.exports.randomInt = function(max) {
  return Math.floor(Math.random()*max);
}