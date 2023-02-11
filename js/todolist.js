$(function () {
    //每次打开页面自动获取
    load();
    // 按下回车 把完整数据 存储到本地存储中
    // 存储的数据格式是 var todolist=[{title:'xxx',done:false},{title:'xxx',done:false}]
    $('#title').on('keydown', function (event) {
        // 回车键的asc码是13
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                // 先读取本地存储原来的数据
                var local = getDate();
                // console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组local 存储给本地存储
                saveDate(local);
                // 2. toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }

    })
    // 3.todolist 删除操作
    $("ol, ul").on("click", "a", function () {
        // alert(11);
        // 先获取本地存储
        var data = getDate();
        // console.log(data);
        // 修改数据
        var index = $(this).attr("id");
        console.log(index);
        // splice删除从data[index]开始删除1个
        data.splice(index, 1);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();


    });
    // 4.toDoList 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function () {
        // alert(11);
        // 先获取本地存储的数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        // data[?].done = ?
        data[index].done = $(this).prop("checked");
        console.log(data);

        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
    // 2.读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            return JSON.parse(data);
        } else {
            // 若没有，就返回空数组
            return [];
        }
    }
    // 1.存储到本地
    function saveDate(local) {
        var data = JSON.stringify(local);
        // 转成字符串对象再使用
        localStorage.setItem('todolist', data);
    }
    // 渲染到页面
    function load() {
        var data = getDate();
        // 遍历之前先清空
        $('ol,ul').empty();
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据，有几条数据，生成几个小li,i是索引号，n是里面某个对象数据

        $.each(data, function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})