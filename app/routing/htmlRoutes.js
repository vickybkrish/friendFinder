//Dependencies

var path = require("path");

module.exports = function(app) {
	//send user to the survey page
	app.get("/survey", function(req, res) {
	  res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});

	app.get("/assets/javascript/app.js", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/assets/javascript/app.js"))
	});

	app.get("/assets/css/style.css", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/assets/css/style.css"))
	});

	//if no existing matching route is found then direct user to homepage
	app.use(function(req, res){
		res.sendFile(path.join(__dirname + "/../public/home.html"));
	});
}