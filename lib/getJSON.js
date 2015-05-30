var request = require("request");

module.exports = {
  initialize: function (callback) {
    request({
      url: 'http://opendata.ugr.es/api/3/action/group_list',
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        callback(error, body);
      }
      else {
        console.log("Error: no se pudo recuperar el archivo JSON.")
      }
    });
  }
};
