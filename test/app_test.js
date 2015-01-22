// var should = require('should');

var request = require('supertest');
// hay que arrancar el servidor antes. Más adelante probaremos esto http://51elliot.blogspot.com.es/2013/08/testing-expressjs-rest-api-with-mocha.html

var server=require(__dirname + '/../app.js');
var port = Number(process.env.PORT || 3000);
request=request("http://localhost:"+port);

describe('Web', function(){

	     it('Debería devolver la raíz', function(){
		    request.get("/")
			.expect(200)
			.end(function(err,res) {
				 if (err) {
				     throw err ;
				 }
			     });
		});

	     it('Debería devolver página personal', function(){
		    request.get("/personal.html")
			.expect(200)
			.end(function(err,res) {
				 if (err) {
				     throw err ;
				 }
			     });
		});

});
