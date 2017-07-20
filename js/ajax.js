// Some useful url.
var get_my_profile_url = '//172.28.165.4:8080/get_my_profile';
var sign_up_url = '//172.28.165.4:8080/sign_up';
var sign_in_url = '//172.28.165.4:8080/sign_in';
var post_my_profile_url = '//172.28.165.4:8080/post_my_profile';

function createXHR(){
    var res;
    if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari
        res = new XMLHttpRequest();
    }
    else {  // code for IE6, IE5
        res = new ActiveXObject("Microsoft.res");
    }
    return res;
}

function get_my_profile()
{
    var res = createXHR();
    res.onreadystatechange = function(){
        if (res.readyState == 4) {
            if(res.status == 200) {
                // 录入信息
                var data = JSON.parse(res.responseText);
                document.getElementById('name_and_number').innerHTML = data.name + "<small>" + data.number + "</small>";
                document.getElementById('email-input3').value = data.email;
                document.getElementById('phone-input3').value = data.phone;
                document.getElementById('qq-input3').value = data.qq;
                document.getElementById('wechat-input3').value = data.wechat;
                var group = document.getElementById('direction-input3').value = data.direction;
                document.getElementById('description-input3').value = data.description;
                document.getElementById('web_a-'+data.web_a+'-input3').checked = true;
                document.getElementById('web_b-input3').value = data.web_b;
                document.getElementById('game_a-input3').value = data.game_a;
                document.getElementById('acm_a-input3').value = data.acm_a;

                // 布置选题
                document.getElementById('web-option').classList.add('hidden');
                document.getElementById('game-option').classList.add('hidden');
                document.getElementById('acm-option').classList.add('hidden');
                document.getElementById(group+'-option').classList.remove('hidden');

                // 启用并跳转到个人信息页
                document.getElementById('profile-li').classList.remove('disabled');
                document.getElementById('profile-a').setAttribute('onclick', "turn_to('profile')");
                turn_to('profile');
            }
            else{
                // 禁用个人信息页并进入登录页
                document.getElementById('profile-li').classList.add('disabled');
                document.getElementById('profile-a').removeAttribute('onclick');
                turn_to('sign_in');
            }
        }
    };
    res.open("GET", get_my_profile_url, true);
    res.send();
}

function post_my_profile()
{
    var res = createXHR();
    res.onreadystatechange = function(){
        if (res.readyState == 4) {
            if(res.status == 200) {
                alert('Good Boy!');
                get_my_profile();
            }
        }
    };
    var email = document.getElementById('email-input3').value;
    var phone = document.getElementById('phone-input3').value;
    var qq = document.getElementById('qq-input3').value;
    var wechat = document.getElementById('wechat-input3').value;
    var direction = document.getElementById('direction-input3').value;
    var description = document.getElementById('description-input3').value;
    var game_a = document.getElementById('game_a-input3').value;
    var acm_a = document.getElementById('acm_a-input3').value;
    for(i = 0;i < 3;i++){
        if(document.getElementsByName('web_a')[i].checked)
            var web_a = document.getElementsByName('web_a')[i].value;
    }
    var web_b = document.getElementById('web_b-input3').value;
    res.open('POST', post_my_profile_url, true);
    res.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    res.send(
        "email="+email+
        "&phone="+phone+
        "&qq="+qq+
        "&wechat="+wechat+
        "&direction="+direction+
        "&description="+description+
        "&game_a="+game_a+
        "&acm_a="+acm_a+
        "&web_a="+web_a+
        "&web_b="+web_b
    );
}

function sign_up()
{
    var res = createXHR();
    res.onreadystatechange = function(){
        if (res.readyState == 4) {
            if(res.status == 200) {
                window.location.href="./sign_up_success.html?name="+name;
            }
            else if(res.status == 402){  // 账号已注册

            }
        }
    };
    var name = document.getElementById('name-input1').value;
    var email = document.getElementById('email-input1').value;
    var account = document.getElementById('account-input1').value;
    var password = md5(document.getElementById('pass-input1').value);

    res.open('POST', sign_up_url, true);
    res.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    res.send(
        "name="+name+
        "&email="+email+
        "&account="+account+
        "&password="+password
    );
}

function sign_in()
{
    var res = createXHR();
    res.onreadystatechange = function(){
        if (res.readyState == 4) {
            if(res.status == 200) {
                get_my_profile();
                document.getElementById('pass_wrong').classList.add('hidden');
                document.getElementById('num_unsigned').classList.add('hidden');
            }
            else if(res.status == 401){  // 密码错误
                document.getElementById('pass_wrong').classList.remove('hidden');
                document.getElementById('num_unsigned').classList.add('hidden');
                document.getElementById('profile-li').classList.add('disabled');
                document.getElementById('profile-a').removeAttribute('onclick');
                turn_to('sign_in');
            }
            else if(res.status == 402){  // 账号不存在
                document.getElementById('pass_wrong').classList.add('hidden');
                document.getElementById('num_unsigned').classList.remove('hidden');
                document.getElementById('profile-li').classList.add('disabled');
                document.getElementById('profile-a').removeAttribute('onclick');
                turn_to('sign_in');
            }
        }
    };
    var account = document.getElementById('account-input2').value;
    var password = md5(document.getElementById('pass-input2').value);

    res.open('POST', sign_in_url, true);
    res.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    res.send("account="+account+"&password="+password);
}
