const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const productsControllers = require('../controllers/products-controllers')

router.get('/all', productsControllers.getAll)
router.get('/:pid', productsControllers.getProductById)
router.get('/user/:uid', productsControllers.getProductsByUserId)
router.post('/',
    [
        check('title').not().isEmpty(), 
        check('description').isLength({min: 5}),
        check('address').not().isEmpty()
], productsControllers.createProduct)
router.patch('/:pid', 
    [
        check('title').not().isEmpty(), 
        check('description').isLength({min: 5}),
    ], productsControllers.updateProduct)
router.delete('/:pid', productsControllers.deleteProduct)

module.exports = router;