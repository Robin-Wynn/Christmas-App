const express = require('express')
const server = express()
const router = require('./routes/router')
const PORT = process.env.PORT || 1995

// handle security
const helmet = require('helmet')
const cors = require('cors')

// configure helmet to allow bootstrap and other data
server.use(helmet.contentSecurityPolicy({
	useDefaults: true,
	crossOriginResourcePolicy: false,
	crossOriginEmbedderPolicy: false,
	directive: {
	"img-src": [" ' self ' ", "https: data"],
	"scriptSrc": [" ' self ' ", "cdn.jsdelivr.net"]
}
}))

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// connect to our router
server.use('/', router)

server.listen(PORT, ()=> console.log(`PORTY over here (～￣▽￣)～`))