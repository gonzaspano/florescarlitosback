const uuid = require('uuid')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')

let DUMMY_PRODUCTS = [
    {
        id: "1",
        name: "Centro de mesa",
        description: "Centro de mesa con distintos tipos de flores a elección",
        imageUrl: 'http://florescarlitos.com.ar/assets/centrodemesa.jpeg',
        stock: 10,
        price: 700,
        category: "eventos"
    },
    {
        id: "2",
        name: "Florero",
        description: "Florero con 6 flores a elegir",
        imageUrl: 'http://florescarlitos.com.ar/assets/florero2.jpg',
        stock: 5,
        price: 1000,
        category: "regalos"
    },
    {
        id: "3",
        name: "Ramo de flores",
        description: "Ramo multicolor con yerberas, rosas y follaje",
        imageUrl: 'http://florescarlitos.com.ar/assets/ramo1.jpg',
        stock: 10,
        price: 1500,
        category: "regalos"
    },
    {
        id: "4",
        name: "Bouquet",
        description: "Bouquet de rosas",
        imageUrl: 'http://florescarlitos.com.ar/assets/bouquet.JPG',
        stock: 6,
        price: 2000,
        category: "condolencias"
    },
    {
        id: "5",
        name: "Cruz",
        description: "Cruz de rosas blancas",
        imageUrl: 'http://florescarlitos.com.ar/assets/cruz.JPG',
        stock: 6,
        price: 2000,
        category: "condolencias"
    },
    {
        id: "6",
        name: "Corazón",
        description: "Corazón de claveles",
        imageUrl: 'http://florescarlitos.com.ar/assets/corazon.JPG',
        stock: 6,
        price: 2000,
        category: "condolencias"
    }
]

const getAll = (req,res,next) => {
    res.json({DUMMY_PRODUCTS})
}

const getProductById = (req, res, next)=>{
    const productId = req.params.pid
    
    const product = DUMMY_PRODUCTS.find(p => {
        return p.id === productId
    })

    if (!product) {
        throw new HttpError("No hay lugares", 404)
    }

    res.json({product})
}

const getProductsByUserId = (req, res, next) => {
    const userId = req.params.uid

    const products = DUMMY_PRODUCTS.filter(p => {
        return p.creator === userId
    })

    if(!products || products.length === 0) {
        return next(new HttpError("No hay lugares", 404))  
    }

    res.json({products})
}

const createProduct = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpError('Inputs invalidos manda algo de info bien', 422)
    }

    const { title, description, address, location, creator} = req.body
    const createdProduct = {
        id: uuid.v4(),
        title,
        description,
        address,
        location,
        creator
    }
    DUMMY_PRODUCTS.push(createdProduct)
    res.status(201).json({product: createdProduct})
}

const updateProduct = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpError('Inputs invalidos manda algo de info bien', 422)
    }

    const { title, description } = req.body
    const productId = req.params.pid

    const updatedProduct = { ...DUMMY_PRODUCTS.find(p => p.id === productId)}
    const productIndex = DUMMY_PRODUCTS.findIndex(p => p.id === productId) 
    updatedProduct.title = title
    updatedProduct.description = description

    DUMMY_PRODUCTS[productIndex] = updatedProduct

    res.status(200).json({product: updatedProduct})
}

const deleteProduct = (req, res, next) => {
    const productId = req.params.pid

    if (!DUMMY_PRODUCTS.find(p => p.id === productId)) {
        throw new HttpError('No hay un lugar con ese id', 404)
    }

    DUMMY_PRODUCTS = DUMMY_PRODUCTS.filter(p => p.id !== productId)

    res.status(200).json({message: 'deleted' })
}

exports.getAll = getAll
exports.getProductById = getProductById
exports.getProductsByUserId = getProductsByUserId
exports.createProduct = createProduct
exports.updateProduct = updateProduct
exports.deleteProduct = deleteProduct