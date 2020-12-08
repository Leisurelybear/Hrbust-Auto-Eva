// ==UserScript==
/* globals jQuery, $, waitForKeyElements */
// @require      https://cdn.staticfile.org/jquery/3.3.1/jquery.min.js
// @name         哈尔滨理工大学 教务在线 教学评价、评估课程自动完成脚本 Hrbust Auto-Eva
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  哈尔滨理工大学（hrbust） 教学评估自动完成脚本。在http://jwzx.hrbust.edu.cn/内，评估课程，教学评价自动完成脚本。使用方法：打开教务在线-点击"评估课程"/"教学评价"，稍等片刻，自动完成全部课程评价。
// @author       Jason Zhang
// @homepageURL  https://github.com/zhangxujie2018/Hrbust-Auto-Eva
// @supportURL   https://github.com/zhangxujie2018/Hrbust-Auto-Eva/issues
// @match        http://jwzx.hrbust.edu.cn/academic/eva/index/evaindexinfo.jsdo*
// @match        http://jwzx.hrbust.edu.cn/academic/eva/index/resultlist.jsdo*
// @match        http://jwzx.hrbust.edu.cn/academic/manager/score/studentOwnScore.do*
// @run-at       document-end
// @license      MIT
// @icon         https://s3.ax1x.com/2020/11/22/DG9DVe.png
// @icon64       https://s3.ax1x.com/2020/11/22/DG9DVe.png

// ==/UserScript==
(function () {
    'use strict';
/////////////////////////---- Settings -----///////////////////////////
    var sleep_time = 1000; //设置模拟提交刷新时间，单位毫秒，不建议更改

    var auto_commit = 1;//设置自动提交  【1：自动提交， 0：手动提交】

    var evaluation_level = 0;//设置评价等级，默认为0：关闭。其他参数：【1：完全好评，2：中等评价，3：较差评价，4：完全随机。】 * 注意：开启此选项，则需要手动提交每一次评价

    //你认为教师在教学上最值得肯定之处？ 可按照格式拼接或删除建议
    var text_approve = [
        "活跃同学气氛 让同学们都能积极参于课堂问答",
        "善待学生，师生融恰，学生成绩能稳定提高，学校、家长双满意即是值得肯定的优秀教师。",
        "我觉得我们学校的老师教学水平是非常值得肯定的，学校里有很多年龄比较大的老师，他们都有特别丰富的人生阅历和渊博的知识，这些完美的履历是可以让我们敬畏他们的。",
        "老师对学生的关心与帮助是无微不至的",
    ];

    //你认为教师在教学上最应该改进之处？可按照格式拼接或删除建议
    var text_improve = [
        "转变教育观念：传统教师与现代教师的区别应当有现代教育观，吸引新思想，树立新的教育观念。",
        "拓展教学艺术，教学课堂要有创新，教师首先要努力实现教学观念的更新，以前的教学注重以教材为中心，以教测为目标。",
        "很好",
        "很不错",
        "很完美",
    ];

    //你对本门课程选用教材及参考书有何意见和建议？ 可按照格式拼接或删除建议
    var text_advice = [
        "很好",
        "教材应该具有实践性",
        "教材应该具有人文性",
        "教材应该具有综合性",
        "教材应该具有思想性",
    ];

    //其他建议？可按照格式拼接或删除建议
    var text_other = [
        "很好",
        "无",
    ];


/////////////////////////---- start -----///////////////////////////
    var URL_keyword_score = "studentOwnScore"; //学生个人成绩URL关键词
    var URL_keyword_evaindexinfo = "evaindexinfo"; //评价详细信息URL关键词
    var URL_keyword_resultlist = "resultlist"; //待评价列表URL关键词

    listen(); //程序开始

    function listen() {
        console.log("Auto-Eva started...");

        var dataMap = new Map();//数据map

        if (window.location.href.indexOf(URL_keyword_score) !== -1) {

            let query_table = $("body > center > form > table > tbody > tr");
            let cal_td = "<td><input name='hae_cal_score' type='button' id='hae_cal_score' class='button' value='计算全部GPA'></td>";
            query_table.append(cal_td); //添加按钮

            appendGPA();


            $("#hae_cal_score").click(function () {
                if (dataMap.has(URL_keyword_score)) {
                    console.log(dataMap.get(URL_keyword_score));
                    return;
                }
                $.ajax({
                    type: "POST",
                    url: "http://jwzx.hrbust.edu.cn/academic/manager/score/studentOwnScore.do",
                    data: {
                        'year': '',
                        'term': '2',
                        'prop': '',
                        'groupName': '',
                        'para': '0',
                        'sortColumn': '',
                        'Submit': '查询',
                    },
                    success: function (result) {
                        var base = document.createElement('div');//创建dom节点
                        base.innerHTML = result;//把请求的网页放到div中
                        //div > center > table > tbody > tr:nth-child(2)

                        let tbody = base.querySelector("div > center > table > tbody");//选择器选择出tr
                        tbody.removeChild(tbody.firstChild);//移除表头
                        let rows = tbody.children;//rows为许多行成绩

                        dataMap.set(URL_keyword_score, rows);
                        for (let i = 0; i < rows.length; i++) {

                        }
                        //console.log(rows);

                    }

                });
            })

        }

        if (window.location.href.indexOf(URL_keyword_evaindexinfo) !== -1) {
            eva_core();
        }
        if (window.location.href.indexOf(URL_keyword_resultlist) !== -1) {
            let eva_tag = $("#li14 > a");
            let count = 0;
            //let innerTabRow = $("body > center > table.infolist_tab > tbody > tr");

            //body > center > table.infolist_tab > tbody > tr:nth-child(1)
            let innerTabRow = $("body > center > table.infolist_tab > tbody > tr");
            console.log(innerTabRow)
            for (let i = 1; i <= innerTabRow.length; i++) {
                //console.log(innerTabRow[i])
                //评估 a href标签  nth-child 选择第n个子节点，从1开始
                let rowLink = $("body > center > table.infolist_tab > tbody > tr:nth-child(" + i + ") > td:nth-child(4) > a");
                let evaStatus = $("body > center > table.infolist_tab > tbody > tr:nth-child(" + i + ") > td:nth-child(3)");
                // body > center > table.infolist_tab > tbody > tr:nth-child(8) > td:nth-child(4) > a
                if (typeof (evaStatus.html()) != "undefined" && evaStatus.html().indexOf("未评估") !== -1 && rowLink.length !== 0) {
                    //未评估 可以点：评估
                    //console.log(rowLink[0].href)
                    window.parent.frames['mainFrame'].location.href = rowLink[0].href;
                }
                if (typeof (evaStatus.html()) != "undefined" && evaStatus.html().indexOf("已评估") !== -1) {
                    count++;
                }

                //body > table > tbody > tr:nth-child(8) > td:nth-child(4) > a
            }
            if (count >= innerTabRow.length - 1) {//如果完成了，则取消这个监听器
                console.log("Finish all " + count + " item(s).")
            } else {
                console.log("Already finish " + count + " item(s), remain " + (innerTabRow.length - 1) + ". ")
            }

        }

    }


    function eva_core() {
        //取出所有radios组件
        var radios = $("input:radio");
        //console.log(radios)
        //有radios的行数
        let rowNums = radios.length % 4 === 0 ? radios.length / 4 : -1;
        console.log("radios评估共：" + rowNums + "行");

        if (rowNums !== -1) {
            let level2 = Math.ceil(Math.random() * (rowNums - 1));

            //console.log("rowNums:" + rowNums)
            switch (evaluation_level) {
                case 0:
                case 1: //优秀评价
                    //除了最后一行总评，随机取出一个，评价为良好，其他全部优秀
                    for (let i = 0; i < rowNums; i++) {
                        if (i !== level2) {
                            checkRadioIndexOf(radios, i, 0);
                        } else {
                            checkRadioIndexOf(radios, i, 1);
                        }
                    }
                    break;
                case 2: //中等评价
                    for (let i = 0; i < rowNums; i++) {
                        let rand0 = Math.ceil(Math.random() * (rowNums - 1));
                        if (i !== level2) {
                            checkRadioIndexOf(radios, i, ((rand0 & 1) + 1));
                        } else {
                            checkRadioIndexOf(radios, i, 0);
                        }
                    }
                    break;
                case 3: //较差评价
                    for (let i = 0; i < rowNums; i++) {
                        let rand0 = Math.ceil(Math.random() * (rowNums - 1));
                        if (i !== level2) {
                            checkRadioIndexOf(radios, i, ((rand0 & 1) + 2));
                        } else {
                            checkRadioIndexOf(radios, i, 0);
                        }
                    }
                    break

                case 4: //全随机评价
                    //防止随机全重复，无法提交
                    checkRadioIndexOf(radios, 0, 0);
                    checkRadioIndexOf(radios, 1, 1);
                    for (let i = 2; i < rowNums; i++) {
                        let rand0 = Math.ceil(Math.random() * (rowNums - 1));
                        checkRadioIndexOf(radios, i, (rand0 & 0b11));

                    }
                    break;
                default: //默认优秀评价
                    for (let i = 0; i < rowNums; i++) {
                        if (i !== level2) {
                            checkRadioIndexOf(radios, i, 0);
                        } else {
                            checkRadioIndexOf(radios, i, 1);
                        }
                    }
                    break;

            }


        }


        //填充文字评价
        let textareas = $("textarea");

        textareas[0].innerText = randomApprove();
        textareas[1].innerText = randomImprove();
        textareas[2].innerText = randomAdvice();
        textareas[3].innerText = randomOther();


        //提交
        if (auto_commit === 1 && evaluation_level === 0) {
            //document.form1.sub_b.disabled=true;
            var cn = 0;

            for (let i = 0; i < document.form1.elements.length; i++) {
                if (document.form1.elements[i].type === "radio") {
                    if (document.form1.elements[i].checked) {
                        cn++;
                    }
                }

            }
            //alert(cn)
            setTimeout(function () {
                document.form1.submit();
            }, sleep_time);
            //document.form1.submit();
        }

    }


    //选择第row行的第index个radio，其中row从0开始，index从0开始
    function checkRadioIndexOf(radios, row, index) {
        radios[row * 4 + index].setAttribute("checked", true)
    }

    //你认为教师在教学上最值得肯定之处？ 随机一个 老师值得肯定的地方
    function randomApprove() {
        //str中可以自定义随机评价老师的内容
        let str = text_approve;


        let rand = Math.ceil(Math.random() * str.length) - 1;
        if (rand < 0) {
            rand = 0;
        }
        let good = str[rand];
        return good;
    }

    //你认为教师在教学上最应该改进之处？ 随机一个 应该改进的地方
    function randomImprove() {
        //str中可以自定义随机还需提升的部分
        let str = text_improve;

        let rand = Math.ceil(Math.random() * str.length) - 1;
        if (rand < 0) {
            rand = 0;
        }
        let good = str[rand];
        return good;

    }

    //你对本门课程选用教材及参考书有何意见和建议？ 随机教材建议
    function randomAdvice() {
        //str中可以自定义随机还需提升的部分
        let str = text_advice

        let rand = Math.ceil(Math.random() * str.length) - 1;
        if (rand < 0) {
            rand = 0;
        }
        let good = str[rand];
        return good;

    }

    //其他建议
    function randomOther() {
        //str中可以自定义随机还需提升的部分
        let str = text_other;

        let rand = Math.ceil(Math.random() * str.length) - 1;
        if (rand < 0) {
            rand = 0;
        }
        let good = str[rand];
        return good;

    }


    function appendGPA() {
        let rowlength = $("body > center > table > tbody > tr").length - 1;
        let headRow = $("body > center > table > tbody > tr:nth-child(1)");
        console.log(headRow)
        headRow.append("<th>单科GPA</th>");
        for (let i = 2; i <= 1 + rowlength; i++) {
            let currentRow = $("body > center > table > tbody > tr:nth-child(" + i + ")");

            //当前行的所有td
            let currentRowTds = $("body > center > table > tbody > tr:nth-child(" + i + ") > td");

            // console.log(tdInfos)
            let score = currentRowTds[6].innerHTML;
            let credit = currentRowTds[7].innerHTML;

            let GPA = score < 60 ? 0 : ((score - 50.0) / 10.0);

            let td_GPA = "<td>" + GPA + "</td>";

            currentRow.append(td_GPA);

        }

    }

    /**
     * 某一门学科的GPA：(期末总评-50.0)/10.0（不及格科目GPA为0）
     备注：五级分制期末总评：优秀95，良好85，中75，及格65，不及格50。
     所有学科的GPA：（学科1GPA×学科1学分数+学科2GPA×学科2学分数+......）］/(所有学科学分之和)
     */
    function calGPA() {

    }


})();