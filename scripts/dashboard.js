window.addEventListener('load', function(){
    var access_token = localStorage.getItem('access_token');
    
    axios.get('https://freddy.codesubmit.io/dashboard',{
        headers: {
            Authorization: 'Bearer '+access_token,
        }
    }).then((res) => {
        console.log(res);
        if(res.status == 200){
            // best sellers
            var tb_row = [];
            res.data.dashboard.bestsellers.forEach( item => {
                var html = `
                <tr>
                    <td>${item.product.name}</td>
                    <td>${item.revenue / item.units}</td>
                    <td>${item.units}</td>
                    <td>${item.revenue}</td>
                </tr>
                `;
                tb_row.push(html);
               
            });
            var t_body = this.document.getElementById('b_sellers');
            t_body.innerHTML = tb_row;
            
            //sale over last week
            var orders = 0;
            var total = 0;
            var week_sales = res.data.dashboard.sales_over_time_week ; 
            for (const key in week_sales) {
                orders += week_sales[key].orders ;
                total += week_sales[key].total;
            }

            // lastweek
            var last_week_cal = `${total} / ${orders} Orders`;
            var last_week = this.document.getElementById('last_week_stats');
            last_week.innerText = last_week_cal;

            //Today
            var today_cal = `${total / 7} / ${orders / 7} Orders`;
            var today = this.document.getElementById('today_stats');
            today.innerText = today_cal;

            // Sales over last Year
            var year_orders = 0;
            var year_total = 0;
            var year_sales = res.data.dashboard.sales_over_time_year; 
            for (const key in year_sales) {
                year_orders += year_sales[key].orders ;
                year_total += year_sales[key].total;
            }

            //months
            var month_cal = `${year_total / 12} / ${year_orders / 12} Orders`;
            var month = this.document.getElementById('month_stats');
            month.innerText = month_cal;
        }
        else{

        }
    })
})
