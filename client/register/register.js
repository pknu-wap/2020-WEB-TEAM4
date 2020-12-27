fetch("router.route('/client/register')",{
    method : "POST",
    headers:{
        'Content-Type': 'application/json'
      },
   	body : JSON.stringify({
           


        })
})
.then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));