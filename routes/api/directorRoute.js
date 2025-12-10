const router = require('express').Router()
const { directorDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/director
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})
// GET programs 
// http://localhost:1995/api/director/:id/programs
router.get('/:id/programs', (req, res) => {
    dao.findPrograms(res, req.params.id)
})

// COUNT all directors
// http://localhost:1995/api/director/count
router.get('/count', (req, res) => {
    dao.countAll(res, dao.table)
})

// SEARCH directors
// http://localhost:1995/api/director/search?field=first_name&term=john
router.get('/search', (req, res) => {
    dao.search(req, res, dao.table)
})

// SORT directors
// http://localhost:1995/api/director/sort?sort=yr_released
router.get('/sort', (req, res) => {
    dao.sort(res, dao.table, req.query.sort)
})

// GET by ID
// http://localhost:1995/api/director/:id
router.get('/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id)
})

// CREATE a new director
// http://localhost:1995/api/director/create
router.post('/create', (req, res) => {
    dao.create(req, res, dao.table, req.body)
})

// UPDATE a director
// http://localhost:1995/api/director/update/:id
router.patch('/update/:id', (req, res) => {
    dao.update(req, res, dao.table, req.body, 'director_id', req.params.id)
})


module.exports = router