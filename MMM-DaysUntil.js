/* global Module, Log */

/* Magic Mirror
 * Module: MMM-DaysUntil
 *
 * By Kris Kovar
 * MIT Licensed.
 */

Module.register("MMM-DaysUntil", {
    // Default module config.
    defaults: {
        eventdate: "2027-01-01",       // YYYY-MM-DD (a time after the date is ignored)
        toWhat: "New Year's Day",      // Title shown above the number
        singular: "day left",          // Unit when exactly one day is left
        plural: "days left",           // Unit when two or more days are left
        present: "Today!",             // Shown on the day itself
        timesUp: "Here's to another great year!", // Shown after the date has passed
        showDate: true,                // Show the target date under the number
        numberSize: 96,                // Size of the big number in px
        accentColor: "#72b8ff",        // Unit and accent color
        textColor: "#ffffff",          // Number and title color
        mutedColor: "#9aa4b2",         // Labels and date color
        updateInterval: 60 * 60 * 1000 // ms between refreshes (minimum 10 minutes)
    },

    // Define start sequence.
    start: function () {
        Log.info("Starting module: " + this.name);

        if (this.config.updateInterval < 10 * 60 * 1000) {
            // 10 min minimum update interval
            this.config.updateInterval = 10 * 60 * 1000;
        }

        var self = this;
        setInterval(function () {
            self.updateDom();
        }, this.config.updateInterval);

        this.scheduleMidnightUpdate();
    },

    // Refresh just after local midnight so the count changes on the right day.
    scheduleMidnightUpdate: function () {
        var self = this;
        var now = new Date();
        var nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
        setTimeout(function () {
            self.updateDom();
            self.scheduleMidnightUpdate();
        }, nextMidnight - now);
    },

    // Define required styles
    getStyles: function () {
        return ["MMM-DaysUntil.css"];
    },

    // Read "YYYY-MM-DD" (optionally followed by a time) as local midnight.
    parseTarget: function (value) {
        var datePart = String(value).trim().split(/[ T]/)[0];
        var parts = datePart.split("-").map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
    },

    // Helper to create an element with a class and text.
    makeEl: function (tag, className, text) {
        var el = document.createElement(tag);
        el.className = className;
        el.textContent = text;
        return el;
    },

    // Override dom generator.
    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.className = "daysuntil";
        wrapper.style.setProperty("--dd-accent", this.config.accentColor);
        wrapper.style.setProperty("--dd-text", this.config.textColor);
        wrapper.style.setProperty("--dd-muted", this.config.mutedColor);
        wrapper.style.setProperty("--dd-number-size", this.config.numberSize + "px");

        var target = this.parseTarget(this.config.eventdate);
        if (isNaN(target.getTime())) {
            wrapper.appendChild(this.makeEl("div", "dd-error", "Check eventdate in config.js (use YYYY-MM-DD)"));
            return wrapper;
        }

        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // Count calendar days, so the result doesn't depend on the time of day or DST.
        var daysLeft = Math.round((target - today) / (1000 * 60 * 60 * 24));

        wrapper.appendChild(this.makeEl("div", "dd-label", this.config.toWhat));

        if (daysLeft > 0) {
            wrapper.appendChild(this.makeEl("div", "dd-number", String(daysLeft)));
            var unit = daysLeft === 1 ? this.config.singular : this.config.plural;
            wrapper.appendChild(this.makeEl("div", "dd-unit", unit));
        } else if (daysLeft === 0) {
            wrapper.appendChild(this.makeEl("div", "dd-today", this.config.present));
        } else {
            wrapper.appendChild(this.makeEl("div", "dd-ended", this.config.timesUp));
        }

        if (this.config.showDate) {
            var dateText = target.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            });
            wrapper.appendChild(this.makeEl("div", "dd-date", dateText));
        }

        return wrapper;
    }
});
