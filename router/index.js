let express = require('express')
let app = express()
let router = express.Router();  //Router를 사용하여 모듈화 가능
let path = require('path');
let main = require('./main/main')
let email = require('./email/email');
let join = require('./join/index')
let login = require('./login/index')
let logout = require('./logout/index')
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/main.html")) //__dirname 절대경로를 노드에서 제공
})

router.use('/main', main)
router.use('/email', email);
router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)
module.exports = router;