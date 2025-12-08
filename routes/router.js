const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 1995
const axios = require('axios')
const paginate = require('../helpers/pagination')
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
            // console.log("SINGLE PROGRAM DATA:", response.data)
            res.render('pages/single-program', {
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

// Forms 📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜
// actor form => http://localhost:1995/actor-form
router.get('/actor-form', (req, res)=> {
    res.render('pages/actor-form', {
        title: 'Actor Form',
        name: 'actor-form'
    })
})

// streaming-plaform-form => http://localhost:1995/api/streaming_platform/create
router.get('/streaming-platform-form', (req, res)=> {
    res.render('pages/streaming-platform-form', {
        title: "Streaming Platform Form",
        name: "streaming-platform form"
    })
})

// Full page datas 🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁
// All Programs 🍿 => http://localhost:1995/programs
router.get('/programs', (req, res) => {

    const url = `http://localhost:1995/api/program/`
    
    axios.get(url)
        .then(response => {

            const page = parseInt(req.query.page) || 1
            const data = response.data
            const paginated = paginate(data, page, 5)

            res.render('pages/programs', {
                title: 'All Christmas Programs',
                name: "All Programs",
                programs: paginated.data,
                pagination: paginated 
            })
        })
})

// All Actors 🎭 => http://localhost:1995/actors
router.get('/actors', (req, res)=> {

    const url = `http://localhost:1995/api/actor/`

    axios.get(url)
    .then(response => {

        const page = parseInt(req.query.page) || 1
        const data = response.data
        const paginated = paginate(data, page, 20)
    
        res.render('pages/actors', {
            title: 'All Actors',
            name: 'Actors Page',
            actors: paginated.data,
            pagination: paginated
        })
    })
})

// All Streaming-platforms 📺 => http://localhost:1995/api/streaming_platform
router.get('/streaming-platforms', (req, res)=> {

    const url = `http://localhost:1995/api/streaming_platform/`

    axios.get(url)
    .then(response => {
        res.render('pages/streaming-platforms', {
            title: "All Streaming Platforms",
            platforms: response.data
        })
    })
})

// Pages to programs 🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️
// actor - programs route => http://localhost:1995/api/actor/:id/programs
router.get('/actor/:id/programs', (req, res)=> {

    const { id } = req.params
    const url = `http://localhost:1995/api/actor/${id}/programs`

    axios.get(url)
    .then(response => {
        res.render('pages/actor-programs', {
            title: "Programs Featuring This Actor",
            data: response.data.programs
        })
    })
})

// streaming-platforms - programs => http://localhost:1995/api/streaming_platform/:id/programs
router.get('/streaming_platform/:id/programs', (req, res)=> {

    const { id } = req.params
    const url = `http://localhost:1995/api/streaming_platform/${id}/programs`

    axios.get(url)
    .then(response => {
        // console.log(response.data)
        const page = parseInt(req.query.page) || 1
        const allPrograms = response.data.programs
        const paginated = paginate(allPrograms, page, 10)
        res.render('pages/streaming-platform-programs', {
            title: "Programs Currently Streaming",
            streaming_platform: response.data.streaming_platform,
            data: paginated.data,
            explanation: response.data.explanation,
            pagination: paginated 
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

// ERROR HANDLING
router.use((req, res)=> {
	res.status(404)
	.render('pages/error', {
        title: '404 Not Found',       
        message: `Oops! The page "${req.originalUrl}" doesn't exist.` //req.originalUrl is an express request property, it gives the full URL path exactly as the client requested it
    })
})

module.exports = router