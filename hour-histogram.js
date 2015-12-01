var fs = require('fs');

function HourHistogrammer() {
    var FILE_NAME = "events.json";

    // Read the contents of the event log file.
    function readEventLog() {
        try {
            return JSON.parse(fs.readFileSync(FILE_NAME));
        } catch (e) {
            return [];
        }
    }

    function getCountsByWeekday() {
        var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        var eventLog = readEventLog();
        for (var eventIdx = 0; eventIdx < eventLog.length; eventIdx++) {
            var event = eventLog[eventIdx];
            var eventDate = new Date(event.date);
            counts[eventDate.getHours()]++;
        }

        return counts;
    }

    this.printHistogram = function () {
        var counts = getCountsByWeekday();
        
        var countsReport = {};
        for (var hour = 0; hour <= 23; hour++) {
            countsReport[hour + ":00"] = counts[hour];
        }

        console.log(JSON.stringify(countsReport, null, "  "));
    }
}

new HourHistogrammer().printHistogram();