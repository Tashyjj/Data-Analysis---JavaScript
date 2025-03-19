//v6.4 jJSGenerator. Generated on 2025-02-18 15:43:30.473
var subSection="PID Loop Error Detection 70 University - AirFlw";
var pathRules=".*AirFlw";
var recommendedActions="1. Investigate operation of PID Loop in programming";
var publicDesc="Checks that the PID loop is operating efficiently and not causing values to swing back and forth";
var testType="CU";
var cnt1=0, tot1=0, lim1=1;

var _AirFlw=historyTitles.indexOf("AirFlw");
var _AirFlwSp=historyTitles.indexOf("AirFlwSp");
hstNames.add("AirFlw");
hstNames.add("AirFlwSp");

// Variables for PID scrubbing detection
var timeWindow = 14400000; // 4h in milliseconds
var threshold = 6; // Number of sign changes (oscillations) allowed within the time window
var dataPoints = [];

if (val1.size() != 0) {
    if (_AirFlw >= 0 && _AirFlwSp >= 0) {
        if (val1.get(_AirFlw).length > 0 && val1.get(_AirFlwSp).length > 0) {
            for (var i = 0; i < ts.size(); i++) {
                if (val1.get(_AirFlw)[i] != null && val1.get(_AirFlwSp)[i] != null) {
                    var tc = false;
                    if (cb.dow(ts.get(i), "MoTuWeThFr")) {
                        if (val1.get(_AirFlwSp)[i] == 1 && sodtmr && ((new Date(ts.get(i)) - sodtmr) / 60000) > delayStart) {
                            if ((""+ts.get(i)).substr((""+ts.get(i)).indexOf("T") + 1, 5) >= "05:00" && (""+ts.get(i)).substr((""+ts.get(i)).indexOf("T") + 1, 5) < "19:00") { 
                                tc = true;
                                tot1++;
                            }
                        }
                    }

                    var airFlow = val1.get(_AirFlw)[i];
                    var airFlowSp = val1.get(_AirFlwSp)[i];
                    var error = airFlow - airFlowSp;
                    var timestamp = new Date(ts.get(i)).getTime();

                    // storing data point
                    dataPoints.push({ timestamp: timestamp, error: error });

                    // removing old data points past the time window
                    dataPoints = dataPoints.filter(point => timestamp - point.timestamp <= timeWindow);

                    // counting oscillations
                    var crossings = 0;
                    for (var j = 1; j < dataPoints.length; j++) {
                        if (Math.sign(dataPoints[j].error) !== Math.sign(dataPoints[j - 1].error)) {
                            crossings++;
                        }
                    }

                    // Detect scrubbing if crossings exceed threshold
                    if (crossings >= threshold) {
                        cnt1++; // Increment error count if PID scrubbing is detected
                    }
                }
            }
            var rslt = cnt1; // Final count of detected scrubbing instances
        }
    }
}
