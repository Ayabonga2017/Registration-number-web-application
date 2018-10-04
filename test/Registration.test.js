
  describe("Registration numbers that are filtered from different Towns", function() {
  it("should return registration number that starts with CY only", function() {

    var RegNumber = RegistrationLogic({
      "CY 234": 0,
       "CA 245": 0,
      "CY 124": 0,
       "CAW 2324": 0
    });

        // returns every reg from Bellv...
        var  foundplates =  RegNumber.filter("CY");
        assert.deepEqual(foundplates, ["CY 234", "CY 124"]);

  })
  it("should return registration number that starts with CK only from the list", function() {

    var RegNumber = RegistrationLogic({
      "CY 234": 0,
       "CA 245": 0,
      "CK 18484": 0,
       "CAW 2324": 0,
       "CK 124": 0,
        "CAW 224": 0,
        "CK 15854" :0
    });

      // returns every reg from Malmasbery...
        var  foundplates =  RegNumber.filter("CK");
        assert.deepEqual(foundplates, ["CK 18484", "CK 124", "CK 15854"]);

  })
  it("should return registration number that starts with CA only from the list", function() {

    var RegNumber = RegistrationLogic({
      "CY 234": 0,
       "CA 245": 0,
      "CK 18484": 0,
       "CAW 2324": 0,
       "CA 124": 0,
        "CAW 224": 0,
        "CA 15854" :0
    });

        // returns every reg from CapeTown...
        var  foundplates =  RegNumber.filter("CA ");
        assert.deepEqual(foundplates, ["CA 245", "CA 124", "CA 15854"]);

  })

  it("should return registration number that starts with CAW only from the list", function() {

    var RegNumber = RegistrationLogic({
      "CY 234": 0,
       "CA 245": 0,
      "CK 18484": 0,
       "CAW 2324": 0,
       "CA 124": 0,
        "CAW 224": 0,
        "CAW 15854" :0,
        "CAW 5854" :0,
        "CAW 09854" :0
    });

        // returns every reg from George...
        var  foundplates =  RegNumber.filter("CAW");
        console.log(foundplates);
        assert.deepEqual(foundplates, ["CAW 2324", "CAW 224", "CAW 15854", "CAW 5854", "CAW 09854"]);

  })
});

describe("Checking if Registration numbers are in the map", function() {
it("should return true if the registration occur on the Map", function() {

  var RegNumber = RegistrationLogic();

      // returns true for Bellville ,because it occurs on my Map...
      var  checkplate =  RegNumber.addRegNumber("CY");
      assert.deepEqual(checkplate, true);

})
it("should return false if the registration does not occur on the Map", function() {

  var RegNumber = RegistrationLogic();

      // returns false for Stellenbosch , because it is not on my Map...
      assert.deepEqual(RegNumber.addRegNumber("CL"), false);

})
it("should return true for George", function() {

  var RegNumber = RegistrationLogic();

      // returns true for CAW ,because it occurs on my Map...
      var  checkplate =  RegNumber.addRegNumber("CAW");
      assert.deepEqual(checkplate, true);

})
it("should return false for Paarl", function() {

  var RegNumber = RegistrationLogic();

      // returns false for CL , because it is not on my Map...
      var  checkplate =  RegNumber.addRegNumber("CJ");
      assert.deepEqual(checkplate, false);

})
});
