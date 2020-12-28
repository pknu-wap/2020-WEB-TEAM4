function formCheck() {

    var length = document.forms[0].length-1;
    
    for(var i = 0; i < length; i++){ 
    
        if(document.forms[0][i].value == null || document.forms[0][i].value == ""){
    
            alert(document.forms[0][i].name + "을/를 입력하세요.");
    
            document.forms[0][i].focus();
            return false
        }//end if
    }}