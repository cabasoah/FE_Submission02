var submit_btn = document.getElementById('submit-btn');
submit_btn.addEventListener('click', (e) => {
    e.preventDefault();
    var username = document.getElementById('user-name').value;
    var password = document.getElementById('user-password').value;

    //simple validation
    if(username != '' && password != ''){
        axios.post('https://freddy.codesubmit.io/login', {
            username:username,
            password:password,
        }).then((res)=> {
            if(res.status == 200){
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.fresh_token);

                var url = './dashboard/dashbord.html';
                window.location = url;

            }else{
                var error = document.getElementById('err');
                error.innerText = 'Ooops! Incorrect Username or Password';
                error.style.display = "block";
            }
         
        }).catch((err) => {
            var error = document.getElementById('err');
            error.innerText = 'Ooops! User does not exist';
            error.style.display = "block";
        })
    }
    else{
        var error = document.getElementById('err');
        error.innerText = 'Ooops! input fields cannot be empty';
        error.style.display = "block";
    }



})