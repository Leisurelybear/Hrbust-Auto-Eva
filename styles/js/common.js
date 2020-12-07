String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function() {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function() {
    return this.replace(/(\s*$)/g, "");
}


function MM_goToURL() { //v3.0
    var i, args = MM_goToURL.arguments;
    document.MM_returnValue = false;
    for (i = 0; i < (args.length - 1); i += 2) eval(args[i] + ".location='" + args[i + 1] + "'");
}

function openwindow(url, winName)
{
    width = 1024;
    height = 768;
    xposition = 0;
    yposition = 0;
    if ((parseInt(navigator.appVersion) >= 4 ))
    {
        xposition = (screen.width - width) / 2;
        yposition = (screen.height - height) / 2;
    }
    theproperty = "width=" + width + ","
        + "height=" + height + ","
        + "location=0,"
        + "menubar=0,"
        + "resizable=1,"
        + "scrollbars=1,"
        + "status=0,"
        + "titlebar=0,"
        + "toolbar=0,"
        + "hotkeys=0,"
        + "screenx=" + xposition + ","
        + "screeny=" + yposition + "," /
        + "left=" + xposition + ","
    try {
        window.open(url, winName, theproperty);
    } catch(e) {
        alert("�򿪴���ʧ�ܣ�");
    }
}


function FixSize(width, height)
{
    try {
        self.resizeTo(width, height);

    } catch(e) {
        alert("�̶����ڴ�Сʧ�ܣ�");
    }
}

function onlyFloat() {
    var iCode = event.keyCode;
    if (iCode == 190) {
        event.returnValue = true;
        return;
    }
    onlydigital();
}

function historyBack()
{
    window.history.go(-1);
    return;
}

function errorMsg(strMsg)
{
    alert("ϵͳ��ʾ:\n\n" + strMsg);
    return;
}

function obtainFocus(formUnit)
{
    formUnit.focus();
    return;
}

function trim(Str)
{
    var theStr = Str;
    var space = new RegExp(" ", "g");
    var newStr = theStr.replace(space, "");
    return newStr;
}

function isSelect(obj)
{
    return (!obj.options[0].selected);
}


function isSelectCheckboxs(obj)
{
    for(var i=0;i<obj.length;i++)
        if (obj[i].checked)
            return true;
    return false;
}



function isNullInput(obj)
{
    if (obj == null || obj.value == "" || (trim(obj.value).length < 1))
        return false;
    return true;
}

function isSelectRadio(obj)
{
    if (obj + "" == "undefined" || obj == null)
        return false;
    if (obj.length == undefined)
        return obj.checked;
    for (var i = 0; i < obj.length; i++)
    {
        if (obj[i].checked)
        {
            return true;
            break;
        }
    }
    return false;
}

function isNotaNumber(inputString)
{
    return (!isNaN(inputString));
}

function isNumberFloatRange(inputString, min, max) {
    if (isNumberFloat(inputString)) {
        if (inputString >= min && inputString <= max) {
            return true;
        } else {
            alert("�������ֵ����" + min + "~" + max + "��Χ�ڣ�");
            return false;
        }
    }
    else
    {
        alert("The String you entering is not a number��");
        return false;
    }
}


function isNumberIntegerRange(inputString, min, max) {
    if (isNumberInteger(inputString)) {
        if (inputString >= min && inputString <= max) {
            return true;
        } else {
            alert("�������ֵ����" + min + "~" + max + "��Χ�ڣ�");
            return false;
        }
    } else {
        return false;
    }

}


function isNumberInteger(inputString) {
    var pattern = /^(0|[1-9][0-9]*)$/;
    if (!pattern.exec(inputString)) {
        alert("������Ĳ��ǺϷ���������");
        return false;
    } else {
        return true;
    }

}


function isNum(str) {
    return   (str.search(/^\d+(\.\d{1,2})?$/) != -1);
}


function isNumberFloat(inputString)
{
    if (!(isNotaNumber(inputString))) return false;
    return (!isNaN(parseFloat(inputString))) ? true : false;
}
/*whether checked the checkbox*/
function isChecked(SEL)
{
    var col = document.getElementsByName(SEL);
    for (var i = 0; i < col.length; i++) {
        if (col[i].checked)
            return true;
    }
    return false;
}

function allSelect(SEL)
{

    try {
        var col = document.getElementsByName(SEL);
        for (var i = 0; i < col.length; i++) {
            if (!col[i].disabled)
                col[i].checked = true;
        }
    } catch(e) {
        alert("ȫѡʧ�ܣ�");
    }
}

function cancelAllSelect(SEL)
{

    try {
        var col = document.getElementsByName(SEL);
        for (var i = 0; i < col.length; i++) {
            col[i].checked = false;
        }
    } catch(e) {
        alert("ȡ��ȫѡʧ�ܣ�");
    }
}


function reverselAllSelect(SEL)
{

    try {
        var col = document.getElementsByName(SEL);
        for (var i = 0; i < col.length; i++) {
            if (col[i].checked)
                col[i].checked = false;
            else
                col[i].checked = true;
        }
    } catch(e) {
        alert("ȡ��ȫѡʧ�ܣ�");
    }
}


function checkBox(name, id)
{

    var boxArray = document.getElementsByName(name);
    var checkObj = document.getElementById(id);
    var statu = new status();

    checkObj.onclick = function () {
        for (var i = 0; i < boxArray.length; i++)
            boxArray[i].checked = this.checked;
    }

    for (var i = 0; i < boxArray.length; i++) {
        boxArray[i].onclick = function () {
            if (this.checked) {
                if (statu.state()) checkObj.checked = true;
            } else {
                checkObj.checked = false;
            }
        }
    }

    function status() {
        this.state = function () {
            for (var i = 0; i < boxArray.length; i++) {
                if (!(boxArray[i].checked)) {
                    return false;
                }
            }
            return true;
        }
    }
}


function greaterdate(strDateStart, strDateEnd)
{
    var strSeparator = "-";
    var strDateArrayStart;
    var strDateArrayEnd;
    var intDay;
    strDateArrayStart = strDateStart.split(strSeparator);
    strDateArrayEnd = strDateEnd.split(strSeparator);
    var strDateS = new Date(strDateArrayStart[0] + "/" + strDateArrayStart[1] + "/" + strDateArrayStart[2]);
    var strDateE = new Date(strDateArrayEnd[0] + "/" + strDateArrayEnd[1] + "/" + strDateArrayEnd[2]);
    intDay = (strDateS - strDateE) / (1000 * 3600 * 24);
    if (intDay < 0) {
        return true;
        //StartDay < EndDay
    } else {
        return false;
        //StartDay > EndDay
    }
}


function nextday() {
    changeDay(86400000);
}

function backday() {
    changeDay(-86400000);
}

function changeDay(num)
{
    c_year = form1.newdate.value.split("-")[0];
    c_month = form1.newdate.value.split("-")[1] - 1;
    c_day = form1.newdate.value.split("-")[2];
    //alert(c_year+c_month+c_day);
    var now = new Date(c_year, c_month, c_day);
    var mydate = new Date(now.getTime() + (num * 1));

    mydate_year = mydate.getFullYear();
    mydate_month = mydate.getMonth();
    mydate_day = mydate.getDate();

    form1.daytime.value = mydate_year + "-" + (mydate_month * 1 + 1) + "-" + mydate_day;

    //alert(mydate);

    form1.submit();
}


function singleCheckedCheckbox(cur, containerId) {
    var container = document.getElementById(containerId);
    var checkboxs = container.getElementsByTagName("input");
    var i = 0;
    for (i; i < checkboxs.length; i++) {
        if (checkboxs[i] != cur) {
            checkboxs[i].checked = false;
        }
    }
}

function maxLength(parentContainer, maxLen) {
    var container = document.getElementById(parentContainer);
    //find the container
    var txt = container.getElementsByTagName('input');
    var i = 0;
    for (i; i < txt.length; i++) {
        //alert(txt[i].type);
        if (txt[i].type == "text") {//----------------if input is text
            txt[i].onblur = function() {//---------bind the onblur event

                //-----------------if text not have maxlength attribute(IE7 default:2147483647)
                //alert(this.getAttribute("maxlength"));
                if (this.getAttribute("maxlength") == null || this.getAttribute("maxlength") == "2147483647") {

                    if (this.value.length > parseInt(maxLen)) {
                        alert("���ı������������������󳤶�Ϊ��" + maxLen);
                        this.value = this.value.substr(0, parseInt(maxLen));
                        this.focus();
                        this.select();
                    }

                }

            }
        }
    }
}


function deleteConfirmation(SEL) {
    if (isChecked(SEL)) {
        confirm("��ȷ��Ҫɾ����ǰѡ�������");
    } else {
        alert("������ѡ��һ��Ҫɾ�����");
    }
}


function SelectedAll_checkbox(thisCheckbox, checkboxGroup) {
    var thischk = document.getElementById(thisCheckbox);

    var chkGroup = document.getElementById(checkboxGroup);

    var inputGroup = chkGroup.getElementsByTagName("input");


    if (thischk.checked) {
        for (var i = 0; i < inputGroup.length; i++) {
            if (inputGroup[i].type = "checkbox") {
                inputGroup[i].checked = true;
            }
        }
    } else {
        for (var i = 0; i < inputGroup.length; i++) {
            if (inputGroup[i].type = "checkbox") {
                inputGroup[i].checked = false;
            }
        }
    }


}


///*compare startDate with endDate*/
///*
//parameter:startDate(start date's string),endDate(end date's string)
//date format:yyyy-mm-dd
// */
function compareDate(startDate, endDate) {
    startDate = startDate.replace(/-/g, '/');
    endDate = endDate.replace(/-/g, '/');
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    if (startDate > endDate) {
        return false;
    } else {
        return true;
    }
}

///*compare startTime with endTime*/
///*
//parameter:startTime(start time's string),endTime(end time's string)
//time format:hh:mm
// */
function compareTime(startTime, endTime) {
    var sTime = [];
    var eTime = [];
    sTime = startTime.split(':');
    eTime = endTime.split(':');

    if (parseInt(sTime[0], 10) > parseInt(eTime[0], 10)) {
        return false;
    } else if (parseInt(sTime[0], 10) == parseInt(eTime[0], 10)) {
        if (parseInt(sTime[1], 10) >= parseInt(eTime[1], 10)) {
            return false;
        }
    } else {
        return true;
    }
}

///*---------string to date---------*/
///*string:2010-03-01*/
function strToDate(str) {
    var newStr = str.replace(/-/g, '/');
    return new Date(newStr);
}