let express = require('express')
//let app = express()
let router = express.Router();  //Router를 사용하여 모듈화 가능
let path = require('path'); //상대모듈로 이동

// login이 될때만 (즉 세션정보가 있을때만) 접근이 가능하게 하자.
router.get('/', (req, res) => {
    console.log('main is loaded', req.user)
    let id = req.user;
    if(!id) res.render('login.ejs')
    // res.sendFile(path.join(__dirname, "../../public/main.html")) //__dirname 절대경로를 노드에서 제공
    res.render('main.ejs', {'id': id})
})

module.exports = router;