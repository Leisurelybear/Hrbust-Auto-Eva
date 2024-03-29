# Hrbust-Auto-Eva

[![Github](https://img.shields.io/badge/Hrbust--Auto--Eva-v1.8-green?logo=github&style=flat)](https://github.com/Leisurelybear/Hrbust-Auto-Eva)
![view](https://palerock.cn/node-service/images/greasyfork/views-info/416572)
![install](https://palerock.cn/node-service/images/greasyfork/stats/daily-installs/416572)
![check_daily](https://palerock.cn/node-service/images/greasyfork/stats/daily-updates/416572)
![mit](https://img.shields.io/github/license/Leisurelybear/Hrbust-Auto-Eva)
![pfm](https://img.shields.io/badge/platform-Chrome%20v87%20%7C%20Firefox%20%7C%20Edge%20%7C%20etc.-lightgrey)
![Tampermonkey](https://img.shields.io/badge/Tampermonkey-v4.16.1-blue)

哈尔滨理工大学（hrbust） 评估课程&教学评价自动完成、个人 GPA 计算**油猴脚本**。

![logo](https://s3.ax1x.com/2020/11/22/DG9DVe.png)

# 背景

> 背景：每次我们考完试后，在迫不及待查成绩的时候，点击个人成绩查询，却弹出“请完成教学评价”，然而发现，本学期为什么这么多课？这么多老师需要评价？由此，脚本出现了！它可以帮助您完成自动评价课程的所有操作，解放您的双手！

# 功能

-   自动完成学期末的**教学评估**。
-   个人成绩 GPA 计算： 可以计算个人的**全部 GPA、必修 GPA**等

# 使用方法：

-   使用方法图解（点击可进入查看大图）：
    -   [![使用方法](https://s3.ax1x.com/2020/12/07/Dv2DfK.png)](https://imgchr.com/i/Dv2DfK)

0. 进入 Greasy Fork，下载油猴脚本，[脚本链接](https://greasyfork.org/zh-CN/scripts/416572-%E5%93%88%E5%B0%94%E6%BB%A8%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6-%E6%95%99%E5%8A%A1%E5%9C%A8%E7%BA%BF-%E6%95%99%E5%AD%A6%E8%AF%84%E4%BB%B7-%E8%AF%84%E4%BC%B0%E8%AF%BE%E7%A8%8B%E8%87%AA%E5%8A%A8%E5%AE%8C%E6%88%90%E8%84%9A%E6%9C%AC-hrbust-auto-eva)
1. 进入教务在线管理系统：[哈理工教务在线课程评估](http://jwzx.hrbust.edu.cn/academic/index_new.jsp)，登陆账号。
2. 点击“评估课程/教学评价”,或者点击菜单中**点击进入自动评估课程**。
3. 可以去喝杯咖啡了，稍等片刻，评估自动完成。
4. 评估完毕后，您可以手动关闭，并删除脚本，等待下一次评估再下回来 233。
5. 至此，您可以操心一下您是否挂科，顺便说一下，即使不评价，您也可以在“教学计划管理”中查看某一科目是否挂科。

-   应用截图：
    -   ![应用场景截图1](https://s3.ax1x.com/2020/12/07/DvRg3T.png)
    -   ![应用场景截图2](https://s3.ax1x.com/2020/11/25/DdhB0s.png)
    -   ![GPA计算](https://s3.ax1x.com/2020/12/10/rifrHP.png)

# 更新日志 | [查看完整日志](https://cdn.jsdelivr.net/gh/Leisurelybear/Hrbust-Auto-Eva@master/Update-log.md)

## v1.8

-   修复课程评分为良好时显示 NaN 的 Bug
-   增加百分制
-   增加当前页面仅必修课程 GPA

## v1.7

-   为更明确使用方法，在【教务管理系统】的左侧菜单中加入红色字体的自动评教入口 【点击进入自动评估课程】。
-   优化网站匹配，在教务在线中可直接开启或关闭脚本。

## v1.6:

-   优化：个人成绩查询 - GPA 计算：提升第二次条件查询后 GPA 计算的速度。
-   注：每次重新登录教务在线，首次查询 GPA 会比较慢，因为需要拉取全部数据，属于正常现象。

## v1.5:

-   在【个人成绩查询】中增加 GPA 计算，包括所有课程 GPA、仅必修 GPA。

# 关于

-   如果大家有问题 BUG 反馈、或者有其他希望添加的功能，欢迎大家点击上方图片链接到 issue 内反馈。
-   如果觉得还不错，也可以点个 Star [![Github](https://img.shields.io/github/stars/Leisurelybear/Hrbust-Auto-Eva)](https://github.com/Leisurelybear/Hrbust-Auto-Eva) 支持一下(●ˇ∀ˇ●)。
