/*
 * Write your Express server in this file as described in README.md.
 */
 var path = require('path');
 var fs = require('fs');
 var express = require('express');
 var exphbs = require('express-handlebars');
 var projectData = require('./projectData');

 var app = express();
 var port = process.env.PORT || 3000;

 app.engine('handlebars', exphbs({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');

 app.get('/', function (req, res, next) {

   var templateArgs = {
     active_home: "active"
   }

   res.render('homePage',templateArgs);
 });

 app.get('/nav/:page', function (req, res, next) {
  console.log("== url params for request:", req.params);
  var thePage = req.params.page;

  if(thePage === "home"){
    var templateArgs = {
      active_home: "active"
    }
  }
  else if(thePage === "projects"){
    var templateArgs = {
      active_projects: "active",
      theProjects: projectData["projects"].boxes
    }
  }
  else if(thePage === "resume"){
    var templateArgs = {
      active_resume: "active"
    }
  }

  if(thePage === "home" || thePage === "projects" || thePage === "resume"){
    res.render(thePage+'Page', templateArgs);
  }

  else{
    next();
  }

});


 app.use(express.static(path.join(__dirname, 'public')));

 app.get('*', function (req, res) {
   res.render('404Page');
 });

 // Start the server listening on the specified port.
 app.listen(port, function () {
   console.log("== Server listening on port", port);
 });
