var fs = require('fs');

function EventLogger() {
    var FILE_NAME = "events.json";

    // Read the existing contents of the event log file.
    function readEventLog() {
        try {
            return JSON.parse(fs.readFileSync(FILE_NAME));
        } catch (e) {
            return [];
        }
    }

    // Overwrite the event log file with the given event log.
    function writeEventLog(log) {
        fs.writeFileSync(FILE_NAME, JSON.stringify(log, null, "  "));
    }

    // Log the given event to disk, appending it to the end of the event log.
    this.logEvent = function (eventName) {
        var existingLog = readEventLog();
        existingLog.push({
            date: new Date().toISOString(),
            name: eventName
        });
        writeEventLog(existingLog);
    }
}

if (process.argv.length === 2) {
    console.log("Usage: node log-event.js <event name>");
} else {
    var eventName = process.argv.slice(2).join(" ");

    var logger = new EventLogger();
    logger.logEvent(eventName)
}

