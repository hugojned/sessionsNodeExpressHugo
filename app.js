//#region Ejemplo2
// const express = require('express'),
//     app = express(),
//     session = require('express-session'); //Middleware de sesión
// app.use(session({
//     secret: 'Botan Watame Pekora Marine Towa Ayame Aloe Coco Choco Kaga Akagi Mau Nyaa Noel Flare Konata Mio Fubuki', //2C44-4D44-WppQ38S //Usado para iniciar la sesion del ID cookie
//     resave: true,
//     saveUninitialized: true //Guarda la sesión en el almacenamiento incluso si no es utilizada
// }));

// // Middleware de Autenticación and Autorización 
// var auth = function (req, res, next) {
//     if (req.session && req.session.user === "amy" && req.session.admin)
//         return next();
//     else
//         return res.sendStatus(401);
// };

// // Login endpoint
// app.get('/login', function (req, res) {
//     if (!req.query.username || !req.query.password) {
//         res.send('login failed');
//     } else if (req.query.username === "mau" || req.query.password === "corem67") {
//         req.session.user = "amy";
//         req.session.admin = true;
//         res.send("login success!");
//     }
// });

// // Logout endpoint
// app.get('/logout', function (req, res) {
//     req.session.destroy();
//     res.send("logout success!");
// });

// // Get content endpoint
// app.get('/content', auth, function (req, res) {
//     res.send("You can only see this after you've logged in.");
// });

// app.listen(3000);
// console.log("app running at http://localhost:3000");
//#endregion

//#region Ejemplo1
var escapeHtml = require('escape-html')
var express = require('express')
var session = require('express-session')

var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// middleware to test if authenticated
function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else next('route')
}

app.get('/', isAuthenticated, function (req, res) {
  // this is only called when there is an authentication user due to isAuthenticated
  res.send('hello, ' + escapeHtml(req.session.user) + '!' +
    ' <a href="/logout">Logout</a>')
})

app.get('/', function (req, res) {
  res.send('<form action="/login" method="post">' +
    'Username: <input name="user"><br>' +
    'Password: <input name="pass" type="password"><br>' +
    '<input type="submit" text="Login"></form>')
})

app.post('/login', express.urlencoded({ extended: false }), function (req, res) {
  // login logic to validate req.body.user and req.body.pass
  // would be implemented here. for this example any combo works

  // regenerate the session, which is good practice to help
  // guard against forms of session fixation
  req.session.regenerate(function (err) {
    if (err) next(err)

    // store user information in session, typically a user id
    req.session.user = req.body.user

    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save(function (err) {
      if (err) return next(err)
      res.redirect('/')
    })
  })
})

app.get('/logout', function (req, res, next) {
  // logout logic
  // clear the user from the session object and save.

  // this will ensure that re-using the old session id
  // does not have a logged in user

  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation

    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })
})

app.listen(3000, () => {
  console.log('Puerto', 3000)
})
//#endregion
