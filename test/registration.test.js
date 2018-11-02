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
    var Malmesbury = Reg_Test(pool);
    await Malmesbury.addRegNumber("CK 56545");
    assert.equal(
      await Malmesbury[{ registrations: "CK 56545" }]
    );
  });
  it(" Should return CK for Malmesbury", async function() {
    var Bellville = Reg_Test(pool);
    await Bellville.addRegNumber("CY 45872");
    assert.equal(
      await Bellville.selectedTown() [{ registrations: "CY 45872" }]
    );
  });
});
