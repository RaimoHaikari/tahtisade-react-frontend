
//https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
function getIndicesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
      return [];
  }
  var startIndex = 0, index, indices = [];
  if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
  }
  return indices;
}



/*
https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index




String.prototype.insertTextAtIndices = function(text) {
    return this.replace(/./g, function(character, index) {
        return text[index] ? text[index] + character : character;
    });
};

var text = {
    6: "<span>",
    11: "</span>"
};

*/

var text = {}


var haystack = "VisitOF Microsof";
var needle = "V"

var haystackLength = haystack.length;
var lastIndex;

var indices = getIndicesOf(needle, haystack);

indices.forEach(i => {
    text[i] = "<span>"
    text[i + (needle.length)]  = "</span>"
    lastIndex = i + (needle.length);
})

var res = haystack.replace(/./g, function(character, index){
    return text[index] ? text[index] + character : character;
});

if(lastIndex >= haystackLength)
    res = res.concat(text[lastIndex])




console.log(res)
