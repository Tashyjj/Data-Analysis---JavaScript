//v6.4 jJSGenerator. Generated on 2025-02-18 15:43:30.473
var subSection="PID Loop Error Detection NO SETPOINT";
var pathRules=".*AirFlw";
var recommendedActions="1. Investigate operation of PID Loop due to excessive oscillations";
var publicDesc="Checks if the temperature or airflow is oscillating excessively (scrubbing).";
var testType="CU";
var cnt1=0, tot1=0, lim1=1;

var _AirFlw=historyTitles.indexOf("AirFlw"); hstNames.add("AirFlw");

// Variables for scrubbing detection
var timeWindow = 14400000; // 4h in milliseconds
var threshold = 6; // Number of oscillations allowed within the time window
var dataPoints = [];

if (val1.size() != 0) {
    if (_AirFlw >= 0) {
        if (val1.get(_AirFlw).length > 0) {
            for (var i = 0; i < ts.size(); i++) {
                if (val1.get(_AirFlw)[i] != null) {
                    var airFlow = val1.get(_AirFlw)[i];
                    var timestamp = new Date(ts.get(i)).getTime();

                    // Store data point
                    dataPoints.push({ timestamp: timestamp, value: airFlow });

                    // Remove old data points beyond the time window (Fixed Syntax)
                    dataPoints = dataPoints.filter(function(point) {
                        return timestamp - point.timestamp <= timeWindow;
                    });

                    // Detect rapid oscillations
                    var crossings = 0;
                    for (var j = 1; j < dataPoints.length; j++) {
                        var diff = dataPoints[j].value - dataPoints[j - 1].value;

                        // Ensure safe indexing for previous value
                        var prevValue = (j >= 2) ? dataPoints[j - 2].value : dataPoints[j - 1].value;

                        // Check if the sign of the difference has changed (i.e., oscillation)
                        if (Math.sign(diff) !== Math.sign(dataPoints[j - 1].value - prevValue)) {
                            crossings++;
                        }
                    }

                    // Detect scrubbing if crossings exceed threshold
                    if (crossings >= threshold) {
                        cnt1++; // Increment scrubbing detection count
                    }
                }
            }

            var rslt = cnt1;
        }
    }
}
