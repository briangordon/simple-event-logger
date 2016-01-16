# simple-event-logger

This is a simple set of scripts that can help with keeping track of events in real life. You record events by invoking the log-event script from the command line and they're written to the `events.json` file in the current working directory. Then you can use the other scripts to display the event log.

Here's an example of usage:

```
~/simple-event-logger $ node log-event Event A
~/simple-event-logger $ node log-event Event B
~/simple-event-logger $ node log-event Event A
~/simple-event-logger $ node log-event Event C
~/simple-event-logger $ node print-events
{
  "Event A": {
    "count": 2,
    "firstSeen": "2015-11-25T02:30:01.996Z",
    "lastSeen": "2015-11-25T02:30:10.080Z"
  },
  "Event B": {
    "count": 1,
    "firstSeen": "2015-11-25T02:30:08.816Z",
    "lastSeen": "2015-11-25T02:30:08.816Z"
  },
  "Event C": {
    "count": 1,
    "firstSeen": "2015-11-25T02:30:11.640Z",
    "lastSeen": "2015-11-25T02:30:11.640Z"
  }
}
~/simple-event-logger $ node weekday-histogram
{
  "Sunday": 0,
  "Monday": 0,
  "Tuesday": 4,
  "Wednesday": 0,
  "Thursday": 0,
  "Friday": 0,
  "Saturday": 0
}
```

This is a super simple implementation with not very clean code. I just wrote it over about an hour and a half to solve a real problem that I had.
