let express = require('express')
//let app = express()
let router = express.Router();  //Router를 사용하여 모듈화 가능
let mysql = require('mysql');
const passport = require('passport');
let LocalStrategy = require('passport-local').Strategy

var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'study_db'
  });
  connection.connect();

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../../public/join.html'))
    res.render('join.ejs')
})

//미들웨어 설정 및 로컬스토리지 설정 local-join 사용 선언
passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', 
    passReqToCallback: true
}, (req, email, password, done) => {
    //done 명시적으로 사용하면 비동기동작
    console.log('local-join callback called')
}))

//라우터 처리
router.post('/', passport.authenticate('local-join', {
    sucessRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true 
}))

// router.post('/', (req, res) => {
//     let body = req.body;
//     let email = body.email;
//     let name = body.name;
//     let passwd = body.password;
//     console.log(email)
//     let query = connection.query('insert into user (email,name,pw) values ("'+email+'","'+name+'","'+passwd+'")', (err,rows) => {
//         if(err) {throw err;}
//         res.render('welcome.ejs', {'name': name, 'id':rows.insertId})
//     })
// })
 
module.exports = router;