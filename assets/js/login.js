$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui 中获取 form 对象
    var form = layui.form
    // 从layui 获取 layer 对象
    var layer = layui.layer
    // 通过form.verify()函数自定义验证表单
    
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd: function (value) {
            // 通过形参拿到确认密码中的内容
            // 拿到密码中的内容
            // 进行一次等于的判断
            // 如果判断失败，则return一个提示消息
            var pwd = $('.reg-box [name=passsword]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        // 1.阻止表单默认提交行为
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        // 2.发起Ajax 请求
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功！');
            // 模拟人的点击事件
            $('#link_login').click()
        
        })
    })

    监听登录表单提交事件
    $('#form_login').submit(function (e) {
        // 1.阻止表单默认提交行为
        e.preventDefault()
        // 2.手动发起Ajax 请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功')
                // console.log(res.token);
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台首页
                location.href = './index.html'
            }

        })
    })

    

})