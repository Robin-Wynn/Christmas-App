const router = require('express').Router()
const { producerDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/producer
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

// COUNT all producers
// http://localhost:1995/api/producer/count
router.get('/count', (req, res) => {
    dao.countAll(res, dao.table)
})

// SEARCH producers
// http://localhost:1995/api/producer/search?field=first_name&term=jim
router.get('/search', (req, res) => {
    dao.search(req, res, dao.table)
})

// SORT producers
// http://localhost:1995/api/producer/sort?sort=yr_released
router.get('/sort', (req, res) => {
    dao.sort(res, dao.table, req.query.sort)
})

// GET by ID
// http://localhost:1995/api/producer/:id
router.get('/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id)
})

// CREATE a new producer
// http://localhost:1995/api/producer/create
router.post('/create', (req, res) => {
    dao.create(req, res, dao.table, req.body)
})

// UPDATE a producer
// http://localhost:1995/api/producer/update/:id
router.patch('/update/:id', (req, res) => {
    dao.update(req, res, dao.table, req.body, 'producer_id', req.params.id)
})


module.exports = router