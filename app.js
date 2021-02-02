let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let router = require('./router/index')
let passport = require('passport')
let LocalStorage = require('passport-local').Strategy;
let session = require('express-session')
let flash = require('connect-flash')

app.listen(3000, () => {
    console.log('start node server 3000port ')
})
//스태틱 디렉토리를 express등록하는 절차
app.use(express.static('public')) 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended:true})) //json이 아닌 형식을 인코딩해서 받음
app.set('view engine', 'ejs') 
//미들웨어 셋팅
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())    //message쉽게 전달하기위해 사용
app.use(router)





