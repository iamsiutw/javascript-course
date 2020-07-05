/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
    var count = 0
    J.split('').map(j => {
      S.split('').forEach(s => {
        if (j === s) {
          count += 1
        }
      })
    })
  return a
};

console.log(numJewelsInStones("aA", "aAAbbbb"))
