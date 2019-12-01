/* global Module */

/* Magic Mirror
 * Module: MMM-DaysUntil
 *
 * By Kris Kovar
 * MIT Licensed.
 */

Module.register("MMM-DaysUntil", {
    // Default module config.
    defaults: {
        eventdate: "2020-01-01 24:00:00", // YYYY-MM-DD HH:MM:SS
        updateInterval: 60 * 60 * 1000,
        toWhat: "Days Until New Years Day!",
        singular: "Day Left ",
        plural: "Days Left",
        present: "Happy New Year!",
        timesUp: "Here's to another great year!"
    },

    // Define start sequence.
    start: function() {
        var self = this;

        Log.info("Starting module: " + this.name);

        if (this.config.updateInterval < 10 * 60 * 1000) {
            // 10 min minimum update interval
            this.config.updateInterval = 10 * 60 * 1000;
        }
        setInterval(function() {
            self.updateDom();
        }, this.config.updateInterval);
    },

    // Define required styles
    getStyles: function () {
        return ["MMM-DaysUntil.css"];
    },

    // Override dom generator.
    getDom: function() {
        var eventdate = new Date(this.config.DaysUntil);
        var now = new Date();
        var timeparser = Date.parse(eventdate) - Date.parse(now);
        daysLeft = Math.floor(timeparser/(1000*60*60*24));

        var wrapper = document.createElement("div");
        var headerD = document.createElement("span");
        headerD.innerHTML = this.config.toWhat + "</br>";
        headerD.className = "passed";

        if (daysLeft == 0) {
            var timeLeft = document.createElement("span")
            timeLeft.innerHTML = this.config.present;
            timeLeft.className = "timeLeft";
          }

        else if (daysLeft == 1) {
          var timeLeft = document.createElement("span");
          timeLeft.innerHTML = daysLeft + " " + this.config.singular;
          timeLeft.className = "timeLeft";
          }
        else if (daysLeft >= 2) {
            var timeLeft = document.createElement("span");
            timeLeft.innerHTML = daysLeft + " " + this.config.plural;
            timeLeft.className = "timeLeft";
          }

        else {
          var timeLeft = document.createElement("span")
          timeLeft.innerHTML = this.config.timesUp;
          timeLeft.className = "timeEnded";
          headerD.innerHTML = "</BR>";
        }

        wrapper.appendChild(headerD);
        wrapper.appendChild(timeLeft);
        return wrapper;
    }
});
