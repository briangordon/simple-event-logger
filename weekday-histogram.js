var fs = require('fs');

function EventHistogrammer() {
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
        var counts = [0, 0, 0, 0, 0, 0, 0];

        var eventLog = readEventLog();
        for (var eventIdx = 0; eventIdx < eventLog.length; eventIdx++) {
            var event = eventLog[eventIdx];
            var eventDate = new Date(event.date);
            counts[eventDate.getDay()]++;
        }

        return counts;
    }

    this.printHistogram = function () {
        var counts = getCountsByWeekday();

        console.log(JSON.stringify({
            "Sunday": counts[0],
            "Monday": counts[1],
            "Tuesday": counts[2],
            "Wednesday": counts[3],
            "Thursday": counts[4],
            "Friday": counts[5],
            "Saturday": counts[6]
        }, null, "  "));
    }
}

new EventHistogrammer().printHistogram();