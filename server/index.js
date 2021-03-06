// server port
const port = 3000

// express server
const express = require('express')
const app = express()

// add body-parser to express
const bodyParser = require('body-parser')
// register as middleware
app.use( bodyParser.json() )
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
}
app.use(allowCrossDomain);
// add cookie-parser to express
const cookieParser = require('cookie-parser')
// register as middleware
app.use(cookieParser())

// add express-session to express
const session = require('express-session')
// register as middleware
app.use( session( {
  secret: 'keyboard cat boddyfollymeskaweq456',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ändra till true för secure cookie (felsöka behövs här nu)
} ) )

// mssql
const db = require('mssql');
async function connectToMsSql(){
  try {
    db.pool = await db.connect({
       user: 'steven',
        password: 'matetcho123!',
      server: 'stevenmsk.database.windows.net', // You can use 'localhost\instance' to connect to named instance
      // options: {
      //   trustedConnection: true
      // },
      database: 'Spotify',
    })
    // let result = await db.pool.request()
    //     .input('colorId', db.Int, 3)
    //     .query('SELECT * FROM example_colors WHERE id = @colorId')
    // console.log(result)
  } catch (err) {
    console.trace(err)
  }
}

// load apis / endpoints

require('./youtube-rest-endpoints.js')(app, db)

require('./data-rest-endpoints.js')(app, db)


// example client
const path = require('path')
app.use(express.static(path.join(__dirname, '../example-client')))

// start the server
app.listen(3000, async () => {
  await connectToMsSql()
  console.log('server running on port 3000')
})


