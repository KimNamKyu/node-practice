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
    let msg;
    let errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
    res.render('login.ejs', {'messages': msg})
})

//session 저장 처리
passport.serializeUser((user, done) => {
    console.log('passport session save : ', user.id)
    done(null, user.id)
})

//session에 아이디를 뽑아서 페이지에 전달
passport.deserializeUser((id, done) => {
    console.log('passport session get id : ', id)
    done(null, id)
})

//미들웨어 설정 및 로컬스토리지 설정 local-join 사용 선언
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', 
    passReqToCallback: true
}, (req, email, password, done) => {
    let query = connection.query('select * from user where email=?', [email], (err, rows) => {
        if(err) return done(err)

        //같은 이메일 여부 체크
        if(rows.length) {
            console.log('existed user')
            console.log(rows)
            return done(null, {'email' : email, 'id' : rows[0].uid})
        }else{
            return done(null, false, {'message': 'your login info not found!!'})
        }
    })
}))

//라우터 처리 ajax => json 응답처리
router.post('/', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if(err) res.status(500).json(err);
        if(!user) {return res.status(401).json(info.message)}

        req.logIn(user, (err) => {
            if(err) {return next(err)}
            return res.json(user)
        })
    })(req, res, next);
})
 
module.exports = router;