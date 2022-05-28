
Array.prototype.unique = function(){
    return [...new Set(this)]
}

Array.prototype.removeEmptyString = function() {
    const indexOfEmptyString = this.indexOf('')
    if (indexOfEmptyString > -1) {
        this.splice(indexOfEmptyString, 1)
    }
}

Array.prototype.removeElem = function(elem) {
    const indexOfElem = this.indexOf(elem)
    if (indexOfElem > -1) {
        this.splice(indexOfElem, 1)
    }
}

Array.prototype.formatAsTableFilter = function(arr) {
    for(let index = 0; index < arr.length; index++) {
        this[index] = {
          text: arr[index],
          value: arr[index]
        }
      }
}

export {}