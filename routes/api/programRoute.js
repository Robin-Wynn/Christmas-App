const router = require('express').Router()
const { programDao: dao } = require('../../daos/dao')

// GET ALL
// http://localhost:1995/api/program/
router.get('/', (req, res)=> {
	dao.findAll(res, dao.table)
})

// GET by ID
// http://localhost:1995/api/program/:id
router.get('/:id', (req, res) => {
	dao.findById(res, dao.table, req.params.id)
})

// UTILITIES --> SEARCH, SORT, COUNT
// COUNT all programs
// http://localhost:1995/api/program/utils/count/all
router.get('/utils/count/all', (req, res) => {
	dao.countAll(res, dao.table)
})

// SEARCH programs
// http://localhost:1995/api/program/utils/search?field=title&term=Gremlins
router.get('/utils/search', (req, res) => {
	dao.search(req, res, dao.table)
})

// SORT programs
// http://localhost:1995/api/program/utils/sort?sort=yr_released
router.get('/utils/sort', (req, res) => {
	dao.sort(res, dao.table, req.query.sort)
})

// CREATE a new program
// http://localhost:1995/api/program/
router.post('/', (req, res) => {
	dao.create(req, res, dao.table, req.body)
})

// UPDATE a program
// http://localhost:1995/api/program/:id
router.put('/:id', (req, res) => {
	dao.update(req, res, dao.table, req.body, 'program_id', req.params.id)
})


module.exports = router