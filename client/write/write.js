const toggleBtn = document.querySelector('.mainbar_toggleBtn');
const menu = document.querySelector('.main_menu');
const login = document.querySelector('.main_login');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    login.classList.toggle('active');
});
form.filepath.value
var form = document.w_form;
var oEditors = [];
nhn.husky.EZCreator.createInIFrame(oEditors, "ir1", "SEditorSkin.html", "createSEditorInIFrame", null, true);
  
function insertIMG(fname){
  var filepath = form.filepath.value;
  var sHTML = "<img src='" + filepath + "/" + fname + "' style='cursor:hand;' border='0'>"; 
    
  oEditors.getById["ir1"].exec("PASTE_HTML", [sHTML]);
}
  
function pasteHTMLDemo(){
  sHTML = "<span style='color:#FF0000'>이미지 등도 이렇게 삽입하면 됩니다.</span>";
  oEditors.getById["ir1"].exec("PASTE_HTML", [sHTML]);
}
  
function showHTML(){
  alert(oEditors.getById["ir1"].getIR());
}
  
function onSubmit(){
  oEditors.getById["ir1"].exec("UPDATE_IR_FIELD", []);
  
  form.content.value = document.getElementById("ir1").value;
  
  if(form.content.value == ""){
    alert("\'내용\'을 입력해 주세요");
    return;
  }
  
  var msg = "글을 등록하시겠습니까?"
  if(confirm(msg)){
    form.submit();
  }
  return;
}