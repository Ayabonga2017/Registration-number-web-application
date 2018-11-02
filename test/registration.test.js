const assert = require('assert');
const Reg_Test = require('../logic');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/registration_tests';

const pool = new Pool({
    connectionString
});
describe('Registration database web app tests', function(){
    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query('delete from registrationNumber');
    });
it(" Should return CK for Malmesbury", async function() {
    let Malmesbury = Reg_Test(pool);
    await Malmesbury.addRegNumber("CK 565-945");
    assert.equal(
      await Malmesbury[{ registrations: "CK 565-945" }]
    );
  });
  it(" Should return CY for BELLVILE", async function() {
    let Bellville = Reg_Test(pool);
    await Bellville.addRegNumber("CY 458-722");
    assert.equal(
      await Bellville [{ registrations: "CY 458-724" }]
    );
  });
  it(" Should return CA for Cape Town", async function() {
    let Cape = Reg_Test(pool);
    await Cape.addRegNumber("CA 759-038");
    assert.equal(
      await Cape [{ registrations: "CA 759-703" }]
    );
  });
});
