//Manually edited on 2024-06-26T13:01:00.429
//v6.4 jJSGenerator. Generated on 2024-06-24 11:12:49.838
var subSection="Flatlined ZnTmp";
var publicDesc="This test checks to see if the ZnTmp is no longer modulating. This test fails if the ZnTmp is found to not modulate for longer than 4 hours.";
var recommendedActions="1. Check overrides\n2. Check that equipment is not broken \n3. Check histories, may be storing wrong";
var testType="IAQ";
var pathRules=".*ZnTmp";
var cnt1=0,tot1=0,lim1=0.1;
if (val1.size()>0){
}
var _ZnTmp=historyTitles.indexOf("ZnTmp");hstNames.add("ZnTmp");
if (val1.size()==0){
}else
{
  if(_ZnTmp >= 0){
    if(val1.get(_ZnTmp).length > 0){
      for (var i = 0; i < ts.size(); i++) {
        var outOfRange = false;
        if(val1.get(_ZnTmp)[i] != null){
          var tc = false;
          if (cb.dow(ts.get(i), "MoTuWeThFr")){
            if((""+ts.get(i)).substr((""+ts.get(i)).indexOf("T")+1,5)>="09:00"&&(""+ts.get(i)).substr((""+ts.get(i)).indexOf("T")+1,5)<"20:00"){
              tc=true;
              tot1++
              if (i >= 8) {
              //8 represents the number of 15 min intervals in a 2h period. Change accordingly
                for (var j = i - 8; j < i; j++) {
                  var zntmpmoved = Math.abs(val1.get(_ZnTmp)[i] - val1.get(_ZnTmp)[j]) > 0.1;
                  if (zntmpmoved) {
                    outOfRange = true;
                  }
                }
                if(!outOfRange){
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
}