//v6.4 jJSGenerator. Generated on 2024-05-09 15:29:04.780
var subSection="VAV Fluctuating Signals";
var pathRules=".*RhcVlvCmd";
var recommendedActions="1. Check overrides";
var publicDesc="Checks if heating/cooling signals come on too frequently within each other";
var recommendedActions="1. Wait for natural cooling/heating instead of adjusting setpoint\n2. Ensure that the sensors are reading realistic values. They may require calibration or replacement.";
var testType="VAV";
var cnt1=0, tot1=0, lim1=0.05;

var _DmpCmd=historyTitles.indexOf("DmpCmd");
var _HtgDmd=historyTitles.indexOf("HtgDmd");
hstNames.add("DmpCmd");
hstNames.add("HtgDmd");
hstNames.add("ZnTmp");
hstNames.add("ZnTmpHtgSp");
hstNames.add("ZnTmpClgSp");
hstNames.add("AirFlw");
hstNames.add("AirFlwSp");
hstNames.add("AirFlwSpMin");

if (val1.size()!=0){
    if (_DmpCmd>=0 && _HtgDmd>=0){
        if (val1.get(_DmpCmd).length>0 && val1.get(_HtgDmd).length>0){
            var tmrht=-35 * 60000;
            var tmrcl=-35 * 60000;
            for (var i=0;i<ts.size();i++){
                if (val1.get(_DmpCmd)[i]!=null && val1.get(_HtgDmd)[i]!=null){
                    var tc=false;
                    if (cb.dow(ts.get(i),"MoTuWeThFr")){
                        if ((""+ts.get(i)).substr((""+ts.get(i)).indexOf("T")+1, 5)>="04:00"&&(""+ts.get(i)).substr((""+ts.get(i)).indexOf("T")+1, 5)<"20:00"){
                            tc=true;
                            tot1++;
                            if (val1.get(_HtgDmd)[i] > 10){
                                tmrht=new Date(ts.get(i));
                                //counted[i]=1.0;
                                if (((new Date(ts.get(i)) - tmrcl) / 60000) < 20){
                                    cnt1++;
                                    counted[i]=1.0;
                                }
                            }
                            if (val1.get(_DmpCmd)[i] > 30 && val1.get(_HtgDmd)[i] < 5){ 
                                tmrcl=new Date(ts.get(i));
                                //counted[i]=2.0;
                                if (((new Date(ts.get(i)) - tmrht) / 60000) < 20){
                                    cnt1++;
                                    counted[i]=2.0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}