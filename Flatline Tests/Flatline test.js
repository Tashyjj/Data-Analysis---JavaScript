//Manually edited on 2024-06-24T11:39:17.129
//v6.4 jJSGenerator. Generated on 2024-06-24 11:12:49.838
var subSection="Flatlined Speed V2";
var publicDesc="This test checks to see if a datapoint no longer modulating. This test fails if the datapoint is found to not modulate for longer than 4 hours.";
var testType="CU,SF,%,VAV";
var pathRules=".*(CU|SF).*SfSpdFbk";
var cnt1=0,tot1=0,lim1=0.1;
if (val1.size()>0){
}
var _SfSpdCmd=historyTitles.indexOf("SfSpdCmd");hstNames.add("SfSpdCmd");
if (val1.size()==0){
}else
{
  if(_SfSpdCmd >= 0){
    if(val1.get(_SfSpdCmd).length > 0){
      for (var i = 0; i < ts.size(); i++) {
        if(val1.get(_SfSpdCmd)[i] != null){
          var tc = false;
          var wrange = true;
          if (cb.dow(ts.get(i), "MoTuWeThFr")){
            if((""+ts.get(i)).substr((""+ts.get(i)).indexOf("T")+1,5)>="04:00"&&(""+ts.get(i)).substr((""+ts.get(i)).indexOf("T")+1,5)<"20:00"){
              tc=true;
              tot1++
              if (i >= 48) {
                //48 represents the number of 5 min intervals in a 4h period. Change accordingly
                for (var j = i - 48; j < i; j++) {
                  if (Math.abs(val1.get(_SfSpdCmd)[i] - val1.get(_SfSpdCmd)[j]) > 2) {
                    wrange = false;
                  }
                }
              }
              if(wrange && val1.get(_SfSpdCmd)[i] > 2){
                cnt1++;
                counted[i] = 1.0;
              }
            }
          }
        }
      }
    }
  }
}