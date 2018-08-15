const NodeHelper = require("node_helper");
const request = require("request");

module.exports = NodeHelper.create({
  start: function () {
    console.log("mmm-json-feed helper started...");
  },

  getStats: function (url, urls) {
    var self = this;

    // This promise shit doesn't work. fuck that all and keep it simple.

//      request('http://127.0.0.1:6502', function (err, res, body) {
      request(url, function (err, res, body) {
          if (err) { console.log('err'); return reject(err); }
	  finalData = JSON.parse(body);
          self.sendSocketNotification("STATS_RESULT", finalData);
      });

  },

  // Nice little request wrapper from: https://stackoverflow.com/questions/32828415/how-to-run-multiple-async-functions-then-execute-callback
  requestAsync: function(url) {
      return new Promise(function (resolve, reject) {
	  request(url, function (err, res, body) {
              if (err) { console.log('err'); return reject(err); }
              return resolve(JSON.parse(body));
	  });
      });
  },

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === "GET_STATS") {
      this.getStats(payload);
    }
  }

});
