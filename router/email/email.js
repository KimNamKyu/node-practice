let express = require('express')
//let app = express()
let router = express.Router();  //Router를 사용하여 모듈화 가능
let mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'study_db'
  });
  connection.connect();

router.post('/form', (req, res) => {
    //post는 별도로 받을 수 없어 body-parser 필요
    // res.send(`<h1> welcome  ${req.body.email} </h1>`)
    res.render('email.ejs', {'email': req.body.email})
})

//json Data ajax 
router.post('/ajax', (req, res) => {
    let email = req.body.email;
    let responseData = {};

    //query
    let query = connection.query('select name from user where email="'+ email + '"', (err, rows) => {
        if(err) throw err;
        if(rows[0]){
            console.log(rows[0])
            responseData.result = 'ok'
            responseData.name = rows[0].name
        }else{
            responseData.result = 'none';
            responseData.name = "";
        }
        res.json(responseData)
    })
    
})

module.exports = router;