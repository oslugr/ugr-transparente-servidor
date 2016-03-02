var webdriver = require("selenium-webdriver");
var assert = require("chai").assert;
var driver;

before(function() {
  this.timeout(30000);
  driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();
  return driver.getWindowHandle();
});

after(function() {
  return driver.quit();
});

describe("Prueba de test integración", function() {
  beforeEach(function() {
    return driver.get("http://transparente.ugr.es/");
  });

  it("Comprueba título", function() {
    return driver.getTitle().then(function(title) {
      assert.equal(title, "UGR Transparente | Universidad de Granada");
    });
  });
});
