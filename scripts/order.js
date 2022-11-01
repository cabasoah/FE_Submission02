window.addEventListener('load', function(){
    var access_token = localStorage.getItem('access_token');
    axios.get('https://freddy.codesubmit.io/orders?page=1&q=search_term',{
        headers: {
            Authorization: 'Bearer '+access_token,
        }
    }).then(res => {
        console.log(res);
        if(res.status == 200){
            res.data.orders.forEach( item => {
                
            })
        }
    })
})