fetch("file:///C:/Users/%EC%A0%95%ED%98%84%EC%A0%95/2020-WEB-TEAM4/client/register/register.html",{
	method : "POST",
   	body : JSON.stringify({
           user_account : this.state.id,
      	   password : this.state.pswd1
        })
})
.then(res => res.json())
.then(res => console.log(res))