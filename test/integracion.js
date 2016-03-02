var webdriver = require("selenium-webdriver");
var assert = require("chai").assert;

describe("Prueba de test integración", function() {
	this.timeout(30000);
	var driver;

	before(function() {
		driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();
	});

	after(function() {
		return driver.quit();
	});

	it("Abre página principal", function() {
		return driver.get("http://transparente.ugr.es/");
	});

	it("Comprueba título", function() {
		return driver.getTitle().then(function(title) {
			assert.equal(title, "UGR Transparente | Universidad de Granada");
		});
	});
});