module.exports = function (pool) {
  // remember the initialize regNumberMap from storeRegNumbers - to support localStorage vertical
  
  async function addRegNumber(regNumber) {
  // console.log(regNumber)
  var initial = regNumber.split(" ")[0].trim();
  
  
  
   let regs = await pool.query('select id from towns where reginitial = $1',[initial])
   console.log(regs, initial, regNumber);
   
   if(regs.rowCount == 0) {
  
    return 'PLEASE ENTER A VALID REGISTRATION IN CAPS (eg. CA .., CK .., CY .. , CAW ..)' ;
  
  } else {
  
    // let  await pool.query('select registrations from registrationNumber where registrations =$1 ',[regNumber] );
      await pool.query('insert into registrationNumber  (town_id, registrations) values($1 , $2)',[regs.rows[0].id, regNumber])
    }
  
    return regNumber;
  } 
  async function showRegs(){

    await pool.query('select * from registrationNumber')
} 

  async function deleteRegs(){

    await pool.query('delete from registrationNumber')
} 

  async function  check(initial){
    duplicateCheck = await pool.query('select registrations from registrationNumber where registrations= $1' ,[initial])
    
      return duplicateCheck.rowCount === 1;
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
      townFilter,
      check,
      showRegs,
      deleteRegs
    }
  }