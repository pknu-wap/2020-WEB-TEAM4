<!DOCTYPE html>
<html lang="ko">  // 언어 한국어
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
<title>글쓰기</title>

<!-- Bootstrap -->
<link href="css/bootstrap.min.css" rel="stylesheet">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<body>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>


<div class="panel panel-default">
<!-- Default panel contents -->
<div class="panel-heading"><h2>Write</h2></div>

<div class="panel-body"> // 패널 사용

<div class="container">
<form action="insert.php" method="post">  
// board테이블에 저장하기 위한 form. 저장한 내용을 insert.php를 통해서 넣을 것이다. 
<form role="form">
//이름 입력 폼
<div class="row">
<div class="col-md-6"> // container 안에서 grid system 사용
<div class="form-group">
<label for="name">NAME</label>
<input type="text" class="form-control" name="name" id="name" placeholder="Enter name">
</div>
</div>


//비밀번호 입력 폼 
<div class="col-md-6">
<div class="form-group">
<label for="pass">Password</label>
<input type="password" class="form-control" name="pass" id="pass" placeholder="Enter password">
</div>
</div>

</div>  //container end

//이메일 입력 폼
<div class="form-group">
<label for="email">Email address</label>
<input type="email" class="form-control" name ="email" id="email" placeholder="Enter email">
</div>

//글제목 입력 폼
<div class="form-group">
<label for="subject">Title</label>
<input type="text" class="form-control" name ="subject" id="subject" placeholder="Enter title">
</div>

//글내용 입력 폼 
<div class="form-group">
<label for="content">Comment:</label>
<textarea class="form-control" rows="10" name="content" id="content"></textarea>
//글 내용이 많으므로 <textarea>태그를 쓴다 rows는 textarea의 높이 조절 
</div>
//파일 첨부 폼 (나중에 쓸거 생각해서 만들어 봄 ) 
<div class="form-group">
<label for="File">File input</label>
<input type="file" id="File">
</div>

//버튼 저장하기, 다시쓰기, 되돌아가기
<div class="center-block" style='width:200px'>
<input type="submit" value="저장하기"> <input type="reset" value="다시쓰기"> <input type="button" value="Back" onclick="history.back(1)"></div>
//되돌아가기에서 onclick이벤트로 history.back(1) 왔던곳에서 1만큼 back (-1을 써도 된다) 
</form> //내용폼 end
</form> //전달 폼 end 
//값 전달 폼의 위치에 따라서 작동여부에 영향이 가니까 주의

</div>
</div> <!--panel end-->
</div>

</div>
</body>
</html>