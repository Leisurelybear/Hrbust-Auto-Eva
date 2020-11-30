// ==UserScript==
/* globals jQuery, $, waitForKeyElements */
// @require      https://cdn.staticfile.org/jquery/3.3.1/jquery.min.js
// @name         哈尔滨理工大学 教务在线 教学评价、评估课程自动完成脚本 Hrbust Auto-Eva
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  哈尔滨理工大学（hrbust） 教学评估自动完成脚本。在http://jwzx.hrbust.edu.cn/内，评估课程，教学评价自动完成脚本。使用方法：打开教务在线-点击"评估课程"/"教学评价"，稍等片刻，自动完成全部课程评价。
// @author       Jason Zhang
// @match        http://jwzx.hrbust.edu.cn/academic/eva/index/evaindexinfo.jsdo*
// @match        http://jwzx.hrbust.edu.cn/academic/eva/index/resultlist.jsdo*
// @run-at       document-end
// @icon         https://s3.ax1x.com/2020/11/22/DG9DVe.png
// @icon64       https://s3.ax1x.com/2020/11/22/DG9DVe.png

// ==/UserScript==
(function () {
    'use strict';
    // 设置 setting
    var interval_time = 100; //设置模拟刷新时间，单位毫秒
    var auto_commit = 1;//设置自动提交
    //代码中randomApprove(), randomAdvice(), randomOther()方法可自定义评价内容


    let interval = window.setInterval(listen, interval_time);

    let count = 0;

    function listen() {
        console.log("Auto-Eva Listening...");

        if (window.location.href.indexOf("evaindexinfo") !== -1) {
            eva_core();
        }
        if (window.location.href.indexOf("resultlist") !== -1) {
            let eva_tag = $("#li14 > a");

            //let innerTabRow = $("body > center > table.infolist_tab > tbody > tr");
            //console.log(innerTabRow)

            //如果评估课程选中
            //if (eva_tag.length !== 0 && eva_tag[0].className === "cur") {
            console.log("--------")
            // body > center > table.infolist_tab > tbody > tr:nth-child(8) > td:nth-child(4) > a
            //body > table > tbody > tr:nth-child(2)
            // let innerTabRow = $("body > center > table.infolist_tab > tbody > tr");

            //body > center > table.infolist_tab > tbody > tr:nth-child(1)
            let innerTabRow = $("body > center > table.infolist_tab > tbody > tr");

            for (let i = 1; i <= innerTabRow.length; i++) {
                //评估 a href标签  nth-child 选择第n个子节点，从1开始
                let rowLink = $("body > center > table.infolist_tab > tbody > tr:nth-child(" + i + ") > td:nth-child(4) > a");
                let evaStatus = $("body > center > table.infolist_tab > tbody > tr:nth-child(" + i + ") > td:nth-child(3)");
                // body > center > table.infolist_tab > tbody > tr:nth-child(8) > td:nth-child(4) > a
                if (typeof(evaStatus.html())!="undefined" && evaStatus.html().indexOf("未评估") !== -1 && rowLink.length !== 0) {
                    //未评估 可以点：评估
                    //console.log(rowLink[0].href)

                    window.parent.frames['mainFrame'].location.href = rowLink[0].href;
                    count++;

                }
                //body > table > tbody > tr:nth-child(8) > td:nth-child(4) > a
                //body > table > tbody > tr:nth-child(8) > td:nth-child(4) > a
                if (count >= innerTabRow.length) {//如果完成了，则取消这个监听器
                    console.log("完成！！！")
                    clearInterval(interval)
                }
            }

        }

    }


    function eva_core() {
        //取出所有radios组件
        var radios = $("input:radio");
        console.log(radios)
        //有radios的行数
        let rowNums = radios.length % 4 === 0 ? radios.length / 4 : -1;
        console.log("radios评估共：" + rowNums + "行");

        if (rowNums !== -1) {
            //除了最后一行总评，随机取出一个，评价为良好，其他全部优秀
            let level2 = Math.ceil(Math.random() * (rowNums - 1));

            // console.log(rowNums)
            for (let i = 0; i < rowNums; i++) {
                if (i !== level2) {
                    checkRadioIndexOf(radios, i, 0);
                } else {
                    checkRadioIndexOf(radios, i, 1);
                }
            }

        }


        //填充文字评价
        let textareas = $("textarea");

        textareas[0].innerText = randomApprove();
        textareas[1].innerText = randomImprove();
        textareas[2].innerText = randomAdvice();
        textareas[3].innerText = randomOther();


        //提交
        if (auto_commit == 1) {
            document.form1.submit();
        }

    }


    //选择第row行的第index个radio，其中row从0开始，index从0开始
    function checkRadioIndexOf(radios, row, index) {
        radios[row * 4 + index].setAttribute("checked", true)
    }

    //你认为教师在教学上最值得肯定之处？ 随机一个 老师值得肯定的地方
    function randomApprove() {
        //str中可以自定义随机评价老师的内容
        let str = [
            "活跃同学气氛 让同学们都能积极参于课堂问答",
            "善待学生，师生融恰，学生成绩能稳定提高，学校、家长双满意即是值得肯定的优秀教师。",
            "我觉得我们学校的老师教学水平是非常值得肯定的，学校里有很多年龄比较大的老师，他们都有特别丰富的人生阅历和渊博的知识，这些完美的履历是可以让我们敬畏他们的。",
            "老师对学生的关心与帮助是无微不至的",
        ]


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
        let str = [
            "转变教育观念：传统教师与现代教师的区别应当有现代教育观，吸引新思想，树立新的教育观念。",
            "拓展教学艺术，教学课堂要有创新，教师首先要努力实现教学观念的更新，以前的教学注重以教材为中心，以教测为目标。",
            "很好",
            "很不错",
            "很完美",
        ];


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
        let str = [
            "很好",
            "教材应该具有实践性",
            "教材应该具有人文性",
            "教材应该具有综合性",
            "教材应该具有思想性",
        ];


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
        let str = [
            "很好",
            "无",
        ];


        let rand = Math.ceil(Math.random() * str.length) - 1;
        if (rand < 0) {
            rand = 0;
        }
        let good = str[rand];
        return good;

    }


})();