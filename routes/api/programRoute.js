const router = require('express').Router()
const { programDao: dao } = require('../../daos/dao')

// GET ALL
// http://localhost:1995/api/program/
router.get('/', (req, res)=> {
	dao.findAll(res, dao.table)
})

// GET actors
// http://localhost:1995/api/program/:id/actors
router.get('/:id/actors', (req, res)=> {
	dao.findActors(res, req.params.id)
})

// GET directors
// http://localhost:1995/api/program/:id/directors
router.get('/:id/directors', (req, res)=> {
	dao.findDirectors(res, req.params.id)
})

// GET platforms
// http://localhost:1995/api/program/:id/platforms
router.get('/:id/platforms', (req, res)=> {
	dao.findPlatforms(res, req.params.id)
})

// GET producers
// http://localhost:1995/api/program/:id/producers
router.get('/:id/producers', (req, res)=> {
	dao.findProducer(res, req.params.id)
})

// GET FULL programs
// http://localhost:1995/api/program/:id/full
router.get('/:id/full', (req, res) => {
	dao.getFullProgramById(res, req.params.id)
})

// COUNT all programs
// http://localhost:1995/api/program/count/all
router.get('/count/all', (req, res) => {
	dao.countAll(res, dao.table)
})

// SEARCH programs
// http://localhost:1995/api/program/search?field=title&term=Gremlins
router.get('/search', (req, res) => {
	dao.search(req, res, dao.table)
})

// SORT programs
// http://localhost:1995/api/program/sort?sort=yr_released
router.get('/sort', (req, res) => {
	dao.sort(res, dao.table, req.query.sort)
})

// GET by ID
// http://localhost:1995/api/program/:id
router.get('/:id', (req, res) => {
	dao.findById(res, dao.table, req.params.id)
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