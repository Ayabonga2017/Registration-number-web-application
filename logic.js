module.exports = function (pool) {
  // remember the initialize regNumberMap from storeRegNumbers - to support localStorage vertical

  async function addRegNumber(regNumber) {

    let reginitial = regNumber.split(" ")[0].trim();
    //check if town is valid
    let towntags = await pool.query('select id from towns where reginitial = $1', [reginitial])

    // //check if registration exists on my table
    if (towntags.rowCount == 1) {
      let regs = await pool.query('select * from registrationNumber where registrations= $1', [regNumber])

      //if not it should insert
      if (regs.rowCount == 0) {
        await pool.query('insert into registrationNumber (town_id, registrations) values($1 , $2)', [towntags.rows[0].id, regNumber])
      }
    }
  }

  async function showRegs() {

    let regs = await pool.query('select * from registrationNumber')

    return regs.rows;
  };
  async function showRegistrations() {

    let regs = await pool.query('select registrations from registrationNumber')
    return regs.rows;
  };

  async function selectedTown() {
    let results = await pool.query('select * from towns');
    return results.rows;
  };

  async function deleteRegs() {
    await pool.query('delete from registrationNumber')
  };

  async function check(regNumber) {
    let regs = await pool.query('select * from registrationNumber where registrations= $1', [regNumber])
    return regs.rows;
  }
  async function filter(townId) {
    const filterSQL = `SELECT 
      registrations 
    FROM 
      registrationNumber 
    WHERE 
      town_id = $1`;

    let regs = await pool.query(filterSQL, [townId])
    return regs.rows;
  }

  return {
    addRegNumber,
    check,
    showRegs,
    deleteRegs,
    filter,
    selectedTown,
    showRegistrations
  }
}
