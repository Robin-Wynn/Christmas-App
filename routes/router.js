const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 1995

// CREATE ROUTES
// root route => http://localhost:1995/api
router.get('/api', (req, res)=> {
    res.json({
        'All Programs': `http://localhost:${PORT}/api/program`,
        'All Actors': `http://localhost:${PORT}/api/actor`
    })
})

// // program endpoint
// router.use('/api/program', require('./api/programRoute'))

// ALL ENDPOINTS
const endpoints = [
    'program',
    'actor'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Route`))
})

// ERROR HANDLING
router.use((req, res, next)=> {
	res.status(404)
	.send('<h1>404 Error this page does not exit</h1>')
})

module.exports = router