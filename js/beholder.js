var beholder_url = '//172.28.165.4:8080/beholder';


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

function get_something()
{
    var res = createXHR();
    res.onreadystatechange = function(){
        if (res.readyState == 4) {
            if(res.status == 200) {
                // 录入信息
                var data = JSON.parse(res.responseText);
                var table = document.getElementById('table');
                for(var i = 0;i < data.length;i++){
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.innerHTML(document.createTextNode(data[i].name));
                    tr.appendChild(td);
                    td.innerHTML = data[i].sex;
                    tr.appendChild(td);
                    td.innerHTML = data[i].email;
                    tr.appendChild(td);
                    td.innerHTML = data[i].phone;
                    tr.appendChild(td);
                    td.innerHTML = data[i].wechat;
                    tr.appendChild(td);
                    td.innerHTML = data[i].qq;
                    tr.appendChild(td);
                    td.innerHTML = data[i].direction;
                    tr.appendChild(td);
                    td.innerHTML = data[i].description;
                    tr.appendChild(td);
                    td.innerHTML = data[i].web_a;
                    tr.appendChild(td);
                    td.innerHTML = data[i].web_b;
                    tr.appendChild(td);
                    td.innerHTML = data[i].acm_a;
                    tr.appendChild(td);
                    td.innerHTML = data[i].game_a;
                    tr.appendChild(td);
                    table.appendChild(tr);
                }
                document.getElementById('nothing').classList.add('hidden');
                document.getElementById('everything').classList.remove('hidden');
            }
            else{
                document.getElementById('nothing').classList.remove('hidden');
                document.getElementById('everything').classList.add('hidden');
            }
        }
    };
    res.open("GET", beholder_url, true);
    res.send();
}

function sign_in()
{
    var res = createXHR();
    res.onreadystatechange = function(){
        if (res.readyState == 4) {
            if(res.status == 200) {
                get_something();
                document.getElementById('pass_wrong').classList.add('hidden');
                document.getElementById('num_unsigned').classList.add('hidden');
            }
            else if(res.status == 401){  // 密码错误
                document.getElementById('pass_wrong').classList.remove('hidden');
                document.getElementById('num_unsigned').classList.add('hidden');
                turn_to('sign_in');
            }
            else if(res.status == 402){  // 账号不存在
                document.getElementById('pass_wrong').classList.add('hidden');
                document.getElementById('num_unsigned').classList.remove('hidden');
                turn_to('sign_in');
            }
        }
    };
    var account = document.getElementById('account').value;
    var password = md5(document.getElementById('pass').value);

    res.open('POST', beholder_url, true);
    res.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    res.send("account="+account+"&password="+password);
}

function search()
{
    alert('敬请期待！');
}