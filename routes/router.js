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

// Search on Homepage
router.get('/search', (req, res) => {
    const { table, field, term } = req.query
    
    if (!table || !field || !term) {
        return res.render('pages/search-results', {
            title: "Search Results",
            results: [],
            term,
            table,
            error: "Missing table, field, or search term."
        })
    }

    const url = `http://localhost:1995/api/${table}/search?field=${field}&term=${term}`

    axios.get(url)
    .then(response => {
        let results = response.data
        const normalized = Array.isArray(results) ? results : [results]
        // console.log(response.data)
        res.render('pages/search-results', {
            title: "Search Results",
            results: normalized,
            term,
            table,
            error: null
        })
    })
})

// Singles 👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼👧🏼
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

// Single streaming-platform => http://localhost:1995/streaming_platform/:id
// router.get('/streaming-platform/:id', (req, res) => {
    
//     const { id } = req.params 
//     const url = `http://localhost:1995/streaming_platform/${id}`

//     axios.get(url)
//     .then(response => {
//         res.render('pages/streaming-platform-update', {
//             title: "Update Streaming Platform",
//             name: "update streaming platform",
//             streaming_platform: response.data
//         })
//     })
//     res.render('pages/streaming-platform-update', {
//         title: "Update Streaming platform",
//         name: "update streaming platform",
//         id:id
//     })
// })

// Forms 📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜
// CREATE
// actor form => http://localhost:1995/actor-form
router.get('/actor-create', (req, res)=> {
    res.render('pages/actor-create', {
        title: 'Actor Create Form',
        name: 'actor create form'
    })
})

// streaming-plaform-create => http://localhost:1995/api/streaming_platform/create
router.get('/streaming-platform-create', (req, res)=> {
    res.render('pages/streaming-platform-create', {
        title: "Streaming Platform Create Form",
        name: "streaming-platform create form"
    })
})

// producer-create => http://localhost:1995/api/producer/create
router.get('/producer-create', (req, res)=> {
    res.render('pages/producer-create', {
        title: "Producer Create Form",
        name: "producer create form"
    })
})

// director-create => http://localhost:1995/api/director/create
router.get('/director-create', (req, res)=> {
    res.render('pages/director-create', {
        title: "Director Create Form",
        name: "director create form"
    })
})
// program-create => http://localhost:1995/api/program/create
router.get('/program-create', async (req, res)=> {

    const url = `http://localhost:1995/api/producer`

    axios.get(url)
    .then(response => {
        res.render('pages/program-create', {
            title: "Program Create Form",
            name: "program create form",
            allProducers: response.data
        })
    })
})

// UPDATE
// streaming-platform-update => http://localhost:1995/api/streaming_platform/:id/update
router.get('/streaming-platform/:id/update', (req, res)=> {

    const { id } = req.params
    const url = `http://localhost:1995/api/streaming_platform/${id}`

    axios.get(url)
    .then(response => {
        res.render('pages/streaming-platform-update', {
            title: 'Streaming Platform Update',
            name: `Update ${response.data.streaming_platform}`,
            id: id,
            streaming_platform: response.data.streaming_platform
        })
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

// All Directors 🎬 => http://localhost:1995/api/director
router.get('/directors', (req, res)=> {

    const url = `http://localhost:1995/api/director/`

    axios.get(url)
    .then(response => {

        const page = parseInt(req.query.page) || 1
        const data = response.data
        const paginated = paginate(data, page, 10)

        res.render('pages/directors', {
            title: "All Directors",
            directors: paginated.data,
            pagination: paginated
        })
    })
})

// All Producers 👩🏼‍🍳 => http://localhost:1995/api/producer
router.get('/producers', (req, res)=> {

    const url = `http://localhost:1995/api/producer`

    axios.get(url)
    .then(response => {

        const page = parseInt(req.query.page) || 1
        const data = response.data
        const paginated = paginate(data, page, 10)

        res.render('pages/producers', {
            title: "All Producers",
            producers: paginated.data,
            pagination: paginated
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
            actor: response.data.actor,
            data: response.data.programs,
            explanation: response.data.explanation
        })
    })
})

// streaming-platforms - programs => http://localhost:1995/api/streaming_platform/:id/programs
router.get('/streaming-platform/:id/programs', (req, res)=> {

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

// directors - programs => http://localhost:1995/api/director/:id/programs
router.get('/director/:id/programs', (req, res)=> {

    const { id } = req.params
    const url = `http://localhost:1995/api/director/${id}/programs`

    axios.get(url)
    .then(response => {
        res.render('pages/director-programs', {
            title: "Programs by This Director",
            director: response.data.director,
            data: response.data.programs,
            explanation: response.data.explanation
        })
    })
})

// producers - programs => http://localhost:1995/api/producer/:id/programs
router.get('/producer/:id/programs', (req, res)=> {

    const { id } = req.params
    const url = `http://localhost:1995/api/producer/${id}/programs`

    axios.get(url)
    .then(response => {
        res.render('pages/producer-programs', {
            title: "Programs by This Producer",
            producer: response.data.producer,
            data: response.data.programs,
            explanation: response.data.explanation
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