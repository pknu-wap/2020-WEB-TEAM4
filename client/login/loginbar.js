const toggleBtn = document.querySelector('.mainbar_toggleBtn');
const menu = document.querySelector('.main_menu');
const login = document.querySelector('.main_login');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    login.classList.toggle('active');
});

function getInfo()
{
    var id=document.getElementById("id").Value;
    var pw=document.getElementById("pw").Value;

    if(id=="admin" && pw=="user"){
        alert("로그인에 성공하였습니다");
        return false;
    }
    else{
        alert("로그인에 실패하였습니다");
    }

}