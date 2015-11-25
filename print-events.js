var fs = require('fs');

function EventPrinter() {
    var FILE_NAME = "events.json";

    // Read the contents of the event log file.
    function readEventLog() {
        try {
            return JSON.parse(fs.readFileSync(FILE_NAME));
        } catch (e) {
            return [];
        }
    }

    // Builds a report object for the whole event log.
    function buildReport() {
        var eventLog = readEventLog();

        var report = {};
        for (var eventIdx = 0; eventIdx < eventLog.length; eventIdx++) {
            var event = eventLog[eventIdx];

            if (event.name in report) {
                // Get the existing entry for this event name.
                var existingEntry = report[event.name];

                // Update the report with this event.
                report[event.name] = {
                    "count": existingEntry.count + 1,
                    "firstSeen": (event.date < existingEntry.firstSeen) ? event.date : existingEntry.firstSeen,
                    "lastSeen": (event.date > existingEntry.lastSeen) ? event.date : existingEntry.lastSeen
                }
            } else {
                report[event.name] = {
                    count: 1,
                    firstSeen: new Date(event.date),
                    lastSeen: new Date(event.date)
                }
            }
        }

        return report;
    }

    // Print either the entire event log, or just information on the given event name if it's provided.
    this.printReport = function (eventName) {
        var report = buildReport();
        if (eventName) {
            if (eventName in report) {
                console.log(JSON.stringify(report[eventName], null, "  "));
            } else {
                console.log("Event '" + eventName + "' not found in event log.");
            }
        } else {
            console.log(JSON.stringify(report, null, "  "));
        }
    }
}

var reporter = new EventPrinter();
if (process.argv.length === 2) {
    reporter.printReport(null);
} else {
    var eventName = process.argv.slice(2).join(" ");
    reporter.printReport(eventName);
}
