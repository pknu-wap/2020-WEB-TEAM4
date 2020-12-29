var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: false }))

//게시판 페이징
router.get("/pasing/:cur", function (req, res) {

    //한 페이지 당 10개 게시물
    var page_size = 10;
    //limit 변수
    var no = "";
    //전체 게시물의 숫자
    var totalPageCount = 0;

    var queryString = 'select count(*) as cnt from products'
    getConnection().query(queryString, function (error2, data) {
        if (error2) {
            console.log(error2 + "메인 화면 mysql 조회 실패");
            return
        }
        //전체 게시물의 숫자
        totalPageCount = data[0].cnt

        //현; 페이지
        var curPage = req.params.cur;

        console.log("현재 페이지 : " + curPage, "전체 페이지 : " + totalPageCount);


        //전체 페이지 갯수
        if (totalPageCount < 0) {
            totalPageCount = 0
        }

        var totalPage = Math.ceil(totalPageCount / page_size);
        var totalSet = Math.ceil(totalPage / page_list_size);
        var curSet = Math.ceil(curPage / page_list_size);
        var startPage = ((curSet - 1) * 10) + 1;
        var endPage = (startPage + page_list_size) - 1;

        if (curPage < 0) {
            no = 0
        } else {
            //0보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
            no = (curPage - 1) * 10
        }

        console.log('[0] curPage : ' + curPage + ' | [1] page_list_size : ' + page_list_size + ' | [2] page_size : ' + page_size + ' | [3] totalPage : ' + totalPage + ' | [4] totalSet : ' + totalSet + ' | [5] curSet : ' + curSet + ' | [6] startPage : ' + startPage + ' | [7] endPage : ' + endPage)

        var result2 = {
            "curPage": curPage,
            "page_list_size": page_list_size,
            "page_size": page_size,
            "totalPage": totalPage,
            "totalSet": totalSet,
            "curSet": curSet,
            "startPage": startPage,
            "endPage": endPage
        };


        fs.readFile('list.html', 'utf-8', function (error, data) {

            if (error) {
                console.log("ejs오류" + error);
                return
            }

            var queryString = 'select * from products order by id desc limit ?,?';
            getConnection().query(queryString, [no, page_size], function (error, result) {
                if (error) {
                    console.log("페이징 에러" + error);
                    return
                }

                res.send(ejs.render(data, {
                    data: result,
                    pasing: result2
                }));
            });
        });



    })

})

//메인화면
router.get("/client/main", function (req, res) {
    console.log("메인화면")
    res.redirect('/pasing/' + 1)
});

router.get("/client/write", function (req, res) {
    fs.readFile('write_r.html', 'utf-8', function (error, data) {
        res.send(data)
    })
})

//삽입 포스터 데이터
router.post("/insert", function (req, res) {
    var body = req.body;
    getConnection().query('insert into products(name,modelnumber,series) values (?,?,?)', [body.name, body.num, body.section], function () {
        res.redirect('/main');
    })
})

//수정
router.get("/detail/:id", function (req, res) {
    fs.readFile('detail.html', 'utf-8', function (error, data) {
        getConnection().query('select * from products where id = ?', [req.params.id], function (error, result) {
            res.send(ejs.render(data, {
                data: result[0]
            }))
        })
    });
})

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '000818',
    database: 'test'
})

function getConnection() {
    return pool
}

module.exports = router;
