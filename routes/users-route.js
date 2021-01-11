const express = require('express')
const router = express.Router()
const {check} = require('express-validator')

const usersControllers = require('../controllers/users-controllers')

router.get('/', usersControllers.getUsers)
router.get('/:uid', usersControllers.getUserById)
router.post('/signup', 
    [
        check('name').not().isEmpty(),
        check('mail').normalizeEmail().isEmail(),
        check('password').isLength({min: 6})
    ], usersControllers.createUser)
router.post('/login', usersControllers.logIn)
router.patch('/:uid', usersControllers.updateUser)
router.delete('/:uid', usersControllers.deleteUser)

module.exports = router;