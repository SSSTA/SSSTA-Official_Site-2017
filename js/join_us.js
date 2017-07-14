function turn_to(command)
{
    if(command=='sign_up'){
        document.getElementById('sign_up-li').classList.add('active');
        document.getElementById('sign_in-li').classList.remove('active');
        document.getElementById('profile-li').classList.remove('active');
        document.getElementById('sign_up-div').classList.remove('hidden');
        document.getElementById('sign_in-div').classList.add('hidden');
        document.getElementById('profile-div').classList.add('hidden');
    }
    else if(command=='sign_in'){
        document.getElementById('sign_up-li').classList.remove('active');
        document.getElementById('sign_in-li').classList.add('active');
        document.getElementById('profile-li').classList.remove('active');
        document.getElementById('sign_up-div').classList.add('hidden');
        document.getElementById('sign_in-div').classList.remove('hidden');
        document.getElementById('profile-div').classList.add('hidden');

    }
    else if(command=='profile'){
        document.getElementById('sign_up-li').classList.remove('active');
        document.getElementById('sign_in-li').classList.remove('active');
        document.getElementById('profile-li').classList.add('active');
        document.getElementById('sign_up-div').classList.add('hidden');
        document.getElementById('sign_in-div').classList.add('hidden');
        document.getElementById('profile-div').classList.remove('hidden');
    }
}

function pass_again(command)
{
    var pass = document.getElementById('pass-input1').value;
    var pass_again = document.getElementById('pass_again-input1').value;
    if(pass==''){
        document.getElementById('pass_again-div1').className = 'form-group has-error has-feedback';
        document.getElementById('pass_again-span1').className = 'glyphicon glyphicon-remove form-control-feedback';
    }
    else if(command=='onfocus'){
        if(pass!=pass_again){  // 默认的
            document.getElementById('pass_again-div1').className = 'form-group';
            document.getElementById('pass_again-span1').className = 'glyphicon glyphicon-ok form-control-feedback';
        }
        else{  // 对的
            document.getElementById('pass_again-div1').className = 'form-group has-success has-feedback';
            document.getElementById('pass_again-span1').className = 'glyphicon glyphicon-ok form-control-feedback';
        }
    }
    else if(command=='onchange'){
        if(pass!=pass_again){  // 默认的
            document.getElementById('pass_again-div1').className = 'form-group';
            document.getElementById('pass_again-span1').className = 'glyphicon glyphicon-ok form-control-feedback';
        }
        else{  // 对的
            document.getElementById('pass_again-div1').className = 'form-group has-success has-feedback';
            document.getElementById('pass_again-span1').className = 'glyphicon glyphicon-ok form-control-feedback';
        }
    }
    else if(command=='onblur'){
        if(pass_again==''){  // 默认的
            document.getElementById('pass_again-div1').className = 'form-group';
            document.getElementById('pass_again-span1').className = 'glyphicon glyphicon-ok form-control-feedback';
        }
        else if(pass!=pass_again){  // 错的
            document.getElementById('pass_again-div1').className = 'form-group has-error has-feedback';
            document.getElementById('pass_again-span1').className = 'glyphicon glyphicon-remove form-control-feedback';
        }
        else{  // 对的
            document.getElementById('pass_again-div1').className = 'form-group has-success has-feedback';
            document.getElementById('pass_again-span1').className = 'glyphicon glyphicon-ok form-control-feedback';
        }
    }
}

function submit_check(formID)
{
    if(formID=='form1'){
        var name1 = document.getElementById('name-input1').value;
        var number1 = document.getElementById('number-input1').value;
        var pass1 = document.getElementById('pass-input1').value;
        var pass_again1 = document.getElementById('pass_again-input1').value;
        if(name1 != '' && number1 != '' && pass1 != '' && pass1 == pass_again1){  // 启用提交按钮
            document.getElementById('submit1').classList.remove('disabled');
        }
        else{  // 禁用提交按钮
            document.getElementById('submit1').classList.add('disabled');
        }
    }
    else if(formID=='form2'){
        var number2 = document.getElementById('number-input2').value;
        var pass2 = document.getElementById('pass-input2').value;
        if(number2 != '' && pass2 != ''){  // 启用提交按钮
            document.getElementById('submit2').classList.remove('disabled');
        }
        else{  // 禁用提交按钮
            document.getElementById('submit2').classList.add('disabled');
        }
    }
    else if(formID=='form3'){

    }
}
