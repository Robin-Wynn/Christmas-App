const router = require('express').Router()
const { directorDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/director
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})
// GET programs 
// http://localhost:1995/api/director/:id/program
router.get('/:id/program', (req, res) => {
    dao.findPrograms(res, req.params.id)
})

// GET by ID
// http://localhost:1995/api/director/:id
router.get('/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id)
})

// UTILITIES --> SEARCH, SORT, COUNT
// COUNT all directors
// http://localhost:1995/api/director/utils/count/all
router.get('/utils/count/all', (req, res) => {
    dao.countAll(res, dao.table)
})

// SEARCH directors
// http://localhost:1995/api/director/utils/search?field=first_name&term=john
router.get('/utils/search', (req, res) => {
    dao.search(req, res, dao.table)
})

// SORT directors
// http://localhost:1995/api/director/utils/sort?sort=yr_released
router.get('/utils/sort', (req, res) => {
    dao.sort(res, dao.table, req.query.sort)
})

// CREATE a new director
// http://localhost:1995/api/director/
router.post('/', (req, res) => {
    dao.create(req, res, dao.table, req.body)
})

// UPDATE a director
// http://localhost:1995/api/director/:id
router.put('/:id', (req, res) => {
    dao.update(req, res, dao.table, req.body, 'director_id', req.params.id)
})


module.exports = router