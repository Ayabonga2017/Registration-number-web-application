module.exports = function (pool) {
  // remember the initialize regNumberMap from storeRegNumbers - to support localStorage vertical
  
  async function addRegNumber(regNumber) {
  // console.log(regNumber)
  var initial = regNumber.split(" ")[0].trim();
  
   let regs = await pool.query('select id from towns where reginitial = $1',[initial])
   console.log(regs, initial, regNumber);
   
   if(regs.rowCount == 0) {
  
    // return 'PLEASE ENTER A VALID REGISTRATION IN CAPS (eg. CA .., CK .., CY .. , CAW ..)' ;
  
  } else {
  
    // let  await pool.query('select registrations from registrationNumber where registrations =$1 ',[regNumber] );
      await pool.query('insert into registrationNumber  (town_id, registrations) values($1 , $2)',[regs.rows[0].id, regNumber])
    }

    return regNumber;

  }; 

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

  async function showRegs(){

    await pool.query('select registrations from registrationNumber')
};

  async function deleteRegs(){

    await pool.query('delete from registrationNumber')
}; 

  async function  check(initial){
    duplicateCheck = await pool.query('select * from registrationNumber where registrations= $1' ,[initial])
    
      return duplicateCheck.rows;
    }

    
    return {
      addRegNumber,
      filter,
      check,
      showRegs,
      deleteRegs
    }
  }