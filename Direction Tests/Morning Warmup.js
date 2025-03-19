//Manually edited on 2025-03-19T14:13:19.866077
//v6.4 jJSGenerator. Generated on 2025-03-18 19:10:51.749
var subSection="Morning Warmup";
var testType="VAV";
var pathRules=".*HtgDmd";
var cnt1=0,tot1=0,lim1=0.1;
if (val1.size()>0){
    val1.add(new Float64Array(ts.size()));historyTitles.add("slope");
    var _slope=historyTitles.indexOf("slope");hstNames.add("slope");
}
var _ZnTmp=historyTitles.indexOf("ZnTmp");hstNames.add("ZnTmp");
var _ZnTmpSp=historyTitles.indexOf("ZnTmpSp");hstNames.add("ZnTmpSp");
var _HtgDmd=historyTitles.indexOf("HtgDmd");hstNames.add("HtgDmd");
var _AirFlw=historyTitles.indexOf("AirFlw");
var _AirFlwSp=historyTitles.indexOf("AirFlwSp");

if (val1.size()==0){
}else
{
    if(_ZnTmp>=0 && _ZnTmpSp>=0){
        var ZnTmpSp = val1.get(_ZnTmpSp);
        var ZnTmp = val1.get(_ZnTmp);
        var HtgDmd = val1.get(_HtgDmd);
        
        //calculating the linear regression of the point (ZnTmp)
        function calculateSlope(arr, startIndex, windowSize) {
            if (startIndex < windowSize - 1) return 0;
        
            var sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
            for (var j = 0; j < windowSize; j++) {
                var x = j;
                var y = arr[startIndex - (windowSize - 1) + j];
        
                if (y == null || isNaN(y)) return 0;
        
                sumX += x;
                sumY += y;
                sumXY += x * y;
                sumXX += x * x;
            }
        
            var numerator = (windowSize * sumXY - sumX * sumY);
            var denominator = (windowSize * sumXX - sumX * sumX);
        
            if (denominator === 0) return 0;
        
            var slope = numerator / denominator;
            return slope;
        }
        
        var mark = null;
        var threshold = 1; // 1 degree past the mark

        if (ZnTmpSp.length > 0 && ZnTmp.length > 0) {
            var windowSize = 3;

            for (var i = windowSize - 1; i < ts.size(); i++) {
                if (ZnTmpSp[i] != null && ZnTmp[i] != null) {
                    var timestamp = "" + ts.get(i);
                    var timeStr = timestamp.substr(timestamp.indexOf("T") + 1, 5);

                    if (cb.dow(ts.get(i), "MoTuWeThFr") && timeStr >= "06:00" && timeStr < "08:00") {
                        tot1++;

                        var slope = calculateSlope(ZnTmp, i, windowSize);

                        if (slope < 0 && mark === null) {
                            //setting a mark when the downward slope starts
                            mark = ZnTmp[i];
                        }

                        if (mark !== null && (mark - ZnTmp[i]) > threshold) {
                            //trended too far down, flag
                            cnt1++;
                            counted[i] = 1.0;
                        }

                        if (slope >= 0.1) {
                            //resettig the mark if it sufficiently trends positive
                            mark = null;
                        }

                        val1.get(_slope)[i] = slope;
                    }
                }
            }
        }
    }
}