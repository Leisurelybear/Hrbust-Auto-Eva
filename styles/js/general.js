
///*成绩管理模块中计算平时，期中，期末的总评程序*/
function chk(decimal_digits,cid,wh,wm,wf,wexp,wsp){
    var id=cid;
    var scoreh = document.getElementById("h" + id);
    var scorem = document.getElementById("m" + id);
    var scoref = document.getElementById("f" + id);
    var scoreexp = document.getElementById("exp" + id);
    var scoresp = document.getElementById("sp" + id);
    var numh=0;
    var numm=0;
    var numf=0;
    var numexp=0;
    var numsp=0;
    var weighth = wh;
    var weightm = wm;
    var weightf = wf;
    var weightexp = wexp;
    var weightsp = wsp;

    if(scoreh && scoreh.value != ""){
        var hs=scoreh.value;
        if((trim(hs).length>0) && (!(isNaN(hs) == true)) &&(hs<=100 && hs>=0)){
            numh=hs;
        }else{
            scoreh.value="0.0";
            alert("平时成绩格式不正确，请重新输入有效数字，范围在0－100之间！");
        }
    }

    if(scorem && scorem.value != ""){
        var ms=scorem.value;
        if((trim(ms).length>0) && (!(isNaN(ms) == true)) && (ms<=100 && ms>=0)){
            numm=ms;
        }else{
            scorem.value="0.0";
            alert("期中成绩格式不正确，请重新输入有效数字，范围在0－100之间！");
        }
    }

    if(scoref && scoref.value != ""){
        var fs=scoref.value;
        if ((trim(fs).length>0) && (!(isNaN(fs) == true)) && (fs<=100 && fs>=0)){
            numf=fs;
        }else{
            scoref.value = "0.0";
            alert("期末成绩格式不正确，请重新输入有效数字，范围在0－100之间！");
        }
    }

    if(scoreexp && scoreexp.value != ""){
        var exps=scoreexp.value;
        if ((trim(exps).length>0) && (!(isNaN(exps) == true)) && (exps<=100 && exps>=0)){
            numexp=exps;
        }else{
            scoreexp.value = "0.0";
            alert("实验成绩格式不正确，请重新输入有效数字，范围在0－100之间！");
        }
    }

    if(scoresp && scoresp.value != ""){
        var sps=scoresp.value;
        if ((trim(sps).length>0) && (!(isNaN(sps) == true)) && (sps<=100 && sps>=0)){
            numsp=sps;
        }else{
            scoresp.value = "0.0";
            alert("口语成绩格式不正确，请重新输入有效数字，范围在0－100之间！");
        }
    }
    sum(decimal_digits,id,numh,numm,numf,numexp,numsp,weighth,weightm,weightf,weightexp,weightsp);
}

function sum(decimal_digits,cid,numh,numm,numf,numexp,numsp,weighth,weightm,weightf,weightexp,weightsp){
    var id=cid;
    var hnum = numh;
    var mnum = numm;
    var fnum = numf;
    var expnum = numexp;
    var spnum = numsp;
    var sum=0;
    var scoren = document.getElementById("n" + id);

    hscale = weighth/100;
    mscale = weightm/100;
    fscale = weightf/100;
    expscale = weightexp/100;
    spscale = weightsp/100;

    hnum = hnum * hscale;
    mnum = mnum * mscale;
    fnum = fnum * fscale;
    expnum = expnum * expscale;
    spnum = spnum * spscale;

    sum = parseInt((hnum + mnum + fnum + expnum + spnum) * 1000);
    sum = sum / 10;
    sum = Math.round(sum);
    sum = sum / 100;

    sum = ForDight(sum,decimal_digits);
    scoren.value = sum;

}



function  ForDight(Dight,How)
{
    Dight  =  Math.round  (Dight*Math.pow(10,How))/Math.pow(10,How);
    return  Dight;
}

//等级考试通知 message_add.jsp
function allmultiple(sid){
    var col=document.getElementById(sid);
    for(i=0;i<col.options.length;i++){
        col.options[i].selected=true;
    }
}
function cancelmultiple(sid){
    var col=document.getElementById(sid);
    for(i=0;i<col.options.length;i++){
        col.options[i].selected=false;
    }
}
function chkselect(sid){
    var col=document.getElementById(sid);
    for(i=0;i<col.options.length;i++){
        if(col.options[i].selected==true){
            errorMsg("院系和专业不能同时选择!");
            cancelmultiple("departid");
            cancelmultiple("majorid");
            break;
        }
    }
}
