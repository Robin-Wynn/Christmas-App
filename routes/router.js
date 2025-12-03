const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 1995
const axios = require('axios')
router.use(express.static('public'))

// Home Route 🏡 => http://localhost:1995
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Christmas Programs Home',
        name: "Robin's Christmas Program App 🎅🏼"
    })
})

// Single Program 🎥=> http://localhost:1995/program/:id
router.get('/program/:id', (req, res) => {

    const { id } = req.params
    const url = `http://localhost:1995/api/program/${id}/full`

    axios.get(url)
        .then(response => {
            console.log("SINGLE PROGRAM DATA:", response.data)
            res.render('pages/singleProgram', {
                title: "Robin's full program details",
                name: "Robin's Full Program Details!",
                data: {
                    program: response.data.program,
                    actors: response.data.actors || [],
                    directors: response.data.directors || [],
                    platforms: response.data.platforms || [],
                    producer: response.data.producer || null 
                }
            })
        })
}) 

// All Programs 🍿=> http://localhost:1995/programs
router.get('/programs', (req, res) => {

    const url = `http://localhost:1995/api/program/`

    axios.get(url)
        .then(response => {
            res.render('pages/programs', {
                title: 'All Christmas Programs',
                name: "All Programs",
                data: {
                    program: response.data.program
                }
            })

        })
})

// CREATE ROUTES
// root route => http://localhost:1995/api
router.get('/api', (req, res)=> {
    res.json({
        'All Programs': `http://localhost:${PORT}/api/program`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Directors': `http://localhost:${PORT}/api/director`,
        'All Producers': `http://localhost:${PORT}/api/producer`,
        'All Streaming Platforms': `http://localhost:${PORT}/api/streaming_platform`
    })
})

// program endpoint
router.use('/api/program', require('./api/programRoute'))

// ALL ENDPOINTS
const endpoints = [
    'program',
    'actor',
    'director',
    'producer',
    'streaming_platform'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Route`))
})

// router.use('/program', require('./api/programRoute'))

// ERROR HANDLING
router.use((req, res, next)=> {
	res.status(404)
	.render('pages/error', {
        title: 'Error Page',
        name: 'Error',
        message: `Oops! The page "${req.originalUrl}" doesn't exist.`
    })
})

module.exports = router