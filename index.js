let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const Registration = require('./logic');
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;


// initialise the flash middleware
app.use(flash());
app.use(express.static('public'));

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// initialise session middleware - flash-express depends on it
app.use(session({ secret: "this line for an error message",
  resave: false,
  saveUninitialized: true
}));
// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) { useSSL = true;}
// which db connection to coderreg
const connectionString = process.env.DATABASE_URL || "postgres://coderreg:coder123@localhost:5432/my_regs";
// var conString = 

const pool = new Pool({connectionString,ssl: useSSL});

const RegdBase = Registration(pool);
app.get('/',  async function (req , res){ res.render('home')});

app.post("/reg_numbers", async function (req , res , next){
 try {
  
   let regText = req.body.regText;
   let display = await RegdBase.addRegNumber(regText);
   console.log(display)
   let regcheck = await RegdBase.check(regText)
  //  duplicate = duplicate.length;

if (regText  === "" || regText === undefined){

  req.flash("info", ' PLEASE ENTER A VALID REGISTRATION IN CAPS (eg. CA .., CK .., CY .. , CAW ..)')
}else if (regcheck === 0) {
  
  req.flash("info", 'reg exists , please enter a new reg ')
}else if (regcheck === 1) {
  
  req.flash("info", 'reg is aduplicate ,  enter a new one ')
}
   res.render('home', {display , regText})
   } catch (error) {
    next(error) }
})

app.post('/reset', async function (req, res, next) {

  try {
    let reset = await RegdBase.deleteRegs();
    
  res.render("home", { reset })
  } catch (error) {
    next(error)
  }
})

// app.get('/reg_numbers', function (req, res) {
//   req.flash('info', 'Flash Message Added');
//   res.redirect('/');
// });

// app.get('/filter:regText', async function (req, res, next) {
//   try {
//     let registrations = req.body.regText;
//     let registration_list = await RegdBase.check(registrations);
  
    
//   res.render("home", {registration_list , registrations })
//   } catch (error) {
//     next(error)
//   }
// })

let PORT = process.env.PORT || 1321;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});