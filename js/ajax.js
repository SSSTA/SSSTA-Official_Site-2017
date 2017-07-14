// Some useful url.
var get_my_profile_url = '//localhost/my_profile';
var sign_up_url = '//localhost/sign_up';
var sign_in_url = '//localhost/sign_in';
var post_my_profile_url = '//localhost/post_my_profile';

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
                document.getElementById('direction-input3').value = data.direction;
                document.getElementById('description-input3').value = data.description;

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

}

function sign_up()
{

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
    var number = document.getElementById('number-input2').value;
    var password = md5(document.getElementById('pass-input2').value);
    res.open("post", sign_in_url, true);
    res.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    res.send("number="+number+"&password="+password);
}
