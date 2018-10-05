var InpuRegElement = document.querySelector(".InputReg");
var AddbtnElement = document.querySelector(".Addbtn");
var showbtnElem = document.querySelector(".showbtn");
var RegNameDisplayElement = document.querySelector(".RegNameDisplay");
var errorDisplayElemt =document.querySelector(".errorDisplay");
var Type_of_TownElem = document.querySelector(".Type_of_Town");
var resetElembtn = document.querySelector(".resetbtn");

var storeRegNumbers = localStorage.getItem('RegsEnterd') ? JSON.parse(localStorage.getItem('RegsEnterd')) : {};
var storage = storeRegNumbers;

var logic = RegistrationLogic(storeRegNumbers);


window.addEventListener('load', function() {
  var storeKeys = Object.keys(storage);
  for (var i = 0; i < storeKeys.length; i++) {
    CreateElem(storeKeys[i]);
  }
});

function CreateElem(regNumbers) {
  // create a new div element
  var newDiv = document.createElement("div");
  newDiv.classList.add("styleDisplay");
  // and give it some content
  newDiv.innerHTML = regNumbers;
  //add the newly created element and its content into the DOM
  RegNameDisplayElement.appendChild(newDiv);
}

function addingRegs() {

  var regEntered = InpuRegElement.value.toUpperCase();
  errorDisplayElemt.innerHTML = ''
  console.log(regEntered)

  if (logic.addRegNumber(regEntered)) {

    CreateElem(regEntered);
    localStorage.setItem("RegsEnterd", JSON.stringify(logic.myMap()));
    //RegNameDisplayElement.innerHTML = regEntered;

  } else {
    let map = Object.keys(logic.myMap());
    console.log(map.indexOf(regEntered));

    map.indexOf(regEntered) != -1 ? errorDisplayElemt.innerHTML = 'already exist' : errorDisplayElemt.innerHTML = 'incorrect data';
  }
}

//Filter function for which town does the reg number is from...........

function FilterBtn() {

  var checkedTownbtn = document.querySelector("input[name='TownType']:checked");
  if (checkedTownbtn) {
    RegNameDisplayElement.innerHTML = '';
    // logic.addRegNumber()
    var town = checkedTownbtn.value;
    // create a new div element
    var listRegs = document.createElement("span");
    var filteredRegs = logic.townFilter(town);
    for (var i = 0; i < filteredRegs.length; i++) {
      CreateElem(filteredRegs[i])
      // listRegs.innerHTML = filteredRegs[i];
      console.log(filteredRegs[i]);
      //add the newly created element and its content into the DOM
      RegNameDisplayElement.appendChild(listRegs);
    }
  }
};

  AddbtnElement.addEventListener('click', function() {
    addingRegs();
  });

  showbtnElem.addEventListener('click', function() {
    FilterBtn()
  });

  resetElembtn.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
  });
