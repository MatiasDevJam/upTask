const {check, body} = require('express-validator');

module.exports = [
    
    check('nombre')
    .notEmpty().trim().escape()

]