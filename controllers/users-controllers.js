const uuid = require('uuid')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')

let DUMMY_USERS = [
    {
        id: "u1",
        name: "Gonzalo Spano",
        mail: "gona@gmail.com",
        password: "xxx",
        born: "25/12/1996",
        city: "Buenos Aires"
    }
]

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS})
}

const getUserById = (req, res, next) => {
    const userId = req.params.uid
    const user = DUMMY_USERS.find(u => u.id === userId)

    if(!user) {
        throw new HttpError("No se encontró usuarios", 404)
    }

    res.json({user: user})
}

const createUser = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpError('Inputs invalidos manda algo de info bien', 422)
    }

    const { name, mail, password, born, city } = req.body

    const hasUser = DUMMY_USERS.find(u => u.mail === mail)
    if (hasUser){
        throw new HttpError('Ya existe un usuario con ese mail', 422)
    }

    const createdUser = {
        id: uuid.v4(),
        name,
        mail,
        password,
        born,
        city
    }
    DUMMY_USERS.push(createdUser)

    res.status(201).json({user: createdUser})
}

const logIn = (req, res, next) => {
    const { mail, password } = req.body

    const identifiedUser = DUMMY_USERS.find(u => u.mail === mail)
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('No se pudo identificar, las credenciales son erroneas') 
    }
    res.json({message: 'logged in'})
}

const updateUser = (req, res, next) => {
    const { name, mail, password } = req.body
    const userId = req.params.uid

    const updatedUser = { ...DUMMY_USERS.find(u => u.id === userId)}
    const userIndex = DUMMY_USERS.findIndex(u => u.id === userId)
    updatedUser.name = name
    updatedUser.mail = mail
    updatedUser.password = password

    DUMMY_USERS[userIndex] = updatedUser

    res.status(200).json({message: 'user actualizado'})
}

const deleteUser = (req, res, next) => {
    const userId = req.params.uid
    DUMMY_USERS = DUMMY_USERS.filter(u => u.id !== userId)

    res.status(200).json({message: 'usuario deleted'})
}

exports.getUsers = getUsers
exports.getUserById = getUserById
exports.createUser = createUser
exports.deleteUser = deleteUser
exports.updateUser = updateUser
exports.logIn = logIn