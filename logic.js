module.exports = function (pool) {

  var regNumberMap = storeRegNumbers || {};

  // remember the initialize regNumberMap from storeRegNumbers - to support localStorage vertical
  async function addRegNumber(regNumber) {

      if (regNumberMap[regNumber]=== undefined &&regNumber.startsWith("CA ") || regNumber.startsWith("CK") ||
      regNumber.startsWith("CY") || regNumber.startsWith("CAW") ){
        regNumberMap[regNumber] = 0;
        return true;
      }
      return false;
}

  // return all reg numbers already added
  async function myMap() {

    return regNumberMap;
  }

  //Filter : filters out unwanted elements
  async function filter(values) {
    var searchdata = [];
    var numberPlates = Object.keys(regNumberMap);
    if (values != '') {
      for (var i = 0; i < numberPlates.length; i++) {
        if (numberPlates[i].startsWith(values)) {

          searchdata.push(numberPlates[i]);
        }
      }
    }
    console.log(values);
    return searchdata;
  }

  //filter function for towns that startsWith('').....

  async function townFilter(town){
    var cpt = [];
    var malmas = [];
    var bellv =[];
    var George= [];
    var All= [];

  if (town === "CA ") {

    for( var key in regNumberMap)
    {
      if (key.startsWith("CA ")) {
        cpt.push(key);
      }
    }
    return cpt;
    console.log(cpt);
  }

  if (town === "CK") {

    for( var key in regNumberMap)
    {
      if (key.startsWith("CK")) {
        malmas.push(key);
      }
    }
    return malmas;
  }

  if (town === "CY") {

    for( var key in regNumberMap)
    {
      if (key.startsWith("CY")) {
        bellv.push(key);
      }
    }
    return bellv;
  }

  if (town === "CAW") {

    for( var key in regNumberMap)
    {
      if (key.startsWith("CAW")) {
        George.push(key);
      }
    }
    return George;
  }
    if (town === "") {

      for( var key in regNumberMap)
      {
        if (key.startsWith("")) {
          All.push(key);
        }
      }
      return All;
    }
  }


  return {
    addRegNumber,
    myMap,
    filter,
    townFilter,
    Errors
  }
}
