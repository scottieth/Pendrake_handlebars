// Load the express module.
const express = require('express');
// Create an Express application to access all functionality of the module.
const app = express();
// Create a variable that stores the port number (i.e., 1337).
const port = 1337;
// Set up the Handlebars view engine.
const handlebars = require('express-handlebars').create({ defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Create a variable that stores the path to the "public" directory inside your "myExpressSite" directory.
const publicPath = __dirname + '/public';
// Specify "css" as a root directory from which to serve static files.
app.use('/css', express.static(publicPath + '/css'));
// Specify "images" as a root directory from which to serve static files.
app.use('/images', express.static(publicPath + '/images'));
// Specify "js" as a root directory from which to serve static files.
app.use('/js', express.static(publicPath + '/js'));

// Render each template and send the appropriate data from the server side based on the path that a user has navigated to.
app.get('/', function(req, res) {
  res.render('home', { pageTitle: 'Home Page' });
});

// Adds a catch-all handler that sets the status code explicitly and renders the view for a custom 404 page.
app.use(function(req, res, next) {
  res.status(404);
  res.render('404', { pageTitle: '404 Page Not Found' });
});

// Adds a 500 error handler that sets the status code explicitly and renders the view for a custom 500 page.
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500', { pageTitle: '500 Internal Server Error' });
});

// Make the app listen on the port and output the URL to access the server to the console.
app.listen(port, function() {
  console.log(`Server running at http://localhost:${port}/`);
});
