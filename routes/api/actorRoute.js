const router = require('express').Router()
const { actorDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/actor
router.get('/', (req, res)=> {
	dao.findAll(res, dao.table)
})

// GET by ID
// http://localhost:1995/api/actor/:id/programs
router.get('/:id/programs', (req, res) => {
	dao.findPrograms(res, req.params.id)
})

// COUNT all actors
// http://localhost:1995/api/actor/count
router.get('/count', (req, res) => {
	dao.countAll(res, dao.table)
})

// SEARCH actors
// http://localhost:1995/api/actor/search?field=first_name&term=jim
router.get('/search', (req, res) => {
	dao.search(req, res, dao.table)
})

// SORT actors
// http://localhost:1995/api/actor/sort?sort=yr_released
router.get('/sort', (req, res) => {
	dao.sort(res, dao.table, req.query.sort)
})

// GET by ID
// http://localhost:1995/api/actor/:id
router.get('/:id', (req, res) => {
	dao.findById(res, dao.table, req.params.id)
})

// CREATE a new actor
// http://localhost:1995/api/actor/create
router.post('/create', (req, res) => {
	dao.create(req, res, dao.table, req.body)
})

// UPDATE a actor
// http://localhost:1995/api/actor/update/:id
router.patch('/update/:id', (req, res) => {
	dao.update(req, res, dao.table, req.body, 'actor_id', req.params.id)
})


module.exports = router