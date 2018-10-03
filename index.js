let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const Registration = require('./logic');
const flash = require('express-flash');
const session = require('express-session');

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "this line for an error message",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
const pg = require("pg");
const Pool = pg.Pool;
// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
// which db connection to usecoder123

// const connectionString = process.env.DATABASE_URL || 'postgresql://codex:coder123@localhost:5432/greets';
// const pool = new Pool({
//   connectionString,
//   ssl: useSSL
// });

app.get('/',  function (req , res){
    res.render('home')
});

let PORT = process.env.PORT || 20201;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});