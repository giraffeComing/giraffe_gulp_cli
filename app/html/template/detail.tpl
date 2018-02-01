<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Gulp Cli</title>
    <!-- build:css -->
    <link rel="stylesheet" href="../../css/common.css">
    <link rel="stylesheet" href="../../css/index.css">
    <!-- endbuild -->
</head>
<body>
<div class="app">
    <div class="com-header">
        <!--nav-->
        @@include('module/header/header.tpl')
        <!--navend-->
    </div>
    <!--contain-->
    <div class="com-contain">
        <div style="height: 1000px;line-height:1000px;font-size: 24px; color: #aaa">撑开高度测试页脚布局</div>
    </div>
    <!--contain end-->
    <!--footer-->
    @@include('module/footer/footer.tpl')
</div>
</body>
</html>

<script src="../../dist/js/bundle.js"></script>
