module.exports = function (pool) {
// remember the initialize regNumberMap from storeRegNumbers - to support localStorage vertical

async function addRegNumber(regNumber) {
// console.log(regNumber)
regNumber = await pool.query('SELECT SUBSTR(R.registration, 2) FROM towns AS R')

 let regs = await pool.query('select id from towns where reginitial = $1',[regNumber])
 if(regs.rows.length == 0) {
  if (regs !== '') {await pool.query('insert into registrationNumber where (town_id, registration) values($1 , $2)',[regs.rows[0].id, regNumber])}
} else {
  return 'please enter a valid registration'
}
    return regNumber;
  }

  //Filter : filters out unwanted elements
  async function filter(values) { var searchdata = [];
    var numberPlates = Object.keys(regNumberMap);
    if (values != '') { for (var i = 0; i < numberPlates.length; i++) {
        if (numberPlates[i].startsWith(values)) { searchdata.push(numberPlates[i]);
        }
      }
    }
    return searchdata;
  }

  //filter function for towns that startsWith('').....
  async function townFilter(town){ var cpt = []; var malmas = [];
    var bellv =[]; var George= []; var All= [];

  if (town === "CA ") {
    for( var key in regNumberMap){ if (key.startsWith("CA ")) {cpt.push(key);}}
    return cpt;
  }

  if (town === "CK") {
    for( var key in regNumberMap) { if (key.startsWith("CK")) { malmas.push(key); }}
    return malmas;
  }

  if (town === "CY") { for( var key in regNumberMap) {
      if (key.startsWith("CY")) {bellv.push(key); }}
    return bellv; }

  if (town === "CAW") { for( var key in regNumberMap) { if (key.startsWith("CAW")) {George.push(key); }}
    return George;
  }
    if (town === "") { for( var key in regNumberMap) { if (key.startsWith("")) { All.push(key); }}
      return All;
    }
  }

  return {
    addRegNumber,
    filter,
    townFilter
  }
}
