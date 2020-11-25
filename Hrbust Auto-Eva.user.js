// ==UserScript==
/* globals jQuery, $, waitForKeyElements */
// @require      https://cdn.staticfile.org/jquery/3.3.1/jquery.min.js
// @name         Hrbust Auto-Eva
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jason
// @match        http://jwzx.hrbust.edu.cn/academic/eva/index/evaindexinfo.jsdo?*
// @run-at       document-end


// ==/UserScript==
(function () {
    'use strict';

    // Your code here...

    console.log("Auto-Eva start...");

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
    //document.form1.submit();


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