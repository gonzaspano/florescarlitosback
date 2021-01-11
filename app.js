const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const productsRoutes = require('./routes/products-route')
const usersRoutes = require('./routes/users-route')
const HttpError = require('./models/http-error')

const app = express()
const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "localhost:3000",
                    credentials: true
                }
            ]
        }
    }
}
app.use(cors(
    config.application.cors.server
))

app.use(bodyParser.json())

app.use('/api/products', productsRoutes)
app.use('/api/users', usersRoutes)

app.use((req,res,next) =>{
    const error = new HttpError('Esta routa es cualquiera rey', 404)
    throw error
})
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || "an unknown error occurred"})    
})

app.listen(5000)