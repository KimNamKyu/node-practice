let express = require('express')
//let app = express()
let router = express.Router();  //Router를 사용하여 모듈화 가능
let path = require('path'); //상대모듈로 이동

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/main.html")) //__dirname 절대경로를 노드에서 제공
})

module.exports = router;