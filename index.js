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
// which db connection to usecoder123
const connectionString = process.env.DATABASE_URL || 'postgresql://coderreg:coder123@localhost:5432/my_regs';
const pool = new Pool({connectionString,ssl: useSSL});

const RegdBase = Registration(pool);
app.get('/',  async function (req , res){ res.render('home')});

app.post("/registration", async function (req , res , next){
 try {
     // get the values from the form (req.body)
    //  var TownType = req.body.TownType;
   let regText = req.body.regText;
   let display = await RegdBase.addRegNumber(regText);

   res.render('home', {display})
   } catch (error) {
    next(error) }
})

let PORT = process.env.PORT || 20201;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});