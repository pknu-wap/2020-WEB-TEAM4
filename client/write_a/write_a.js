function formCheck() {

    var length = document.forms[0].length-1;
    
    for(var i = 0; i < length; i++){ 
    
        if(document.forms[0][i].value == null || document.forms[0][i].value == ""){
    
            alert(document.forms[0][i].name + "을/를 입력하세요.");
    
            document.forms[0][i].focus();
            return false
        }//end if
    }}
    
    $(document).ready(function(){ var fileTarget = $('.filebox .upload-hidden'); fileTarget.on('change', function(){
        if(window.FileReader){
            var filename = $(this)[0].files[0].name; } 
        else { 
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.upload-name').val(filename); }); });
