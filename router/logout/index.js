let express = require('express')
let app = express()
let router = express.Router();

router.get('/', (req, res) => {
    req.logout()
    res.redirect('/login')
})

module.exports = router