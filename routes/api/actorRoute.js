const router = require('express').Router()
const { actorDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/actor
router.get('/', (req, res)=> {
	dao.findAll(res, dao.table)
})

// GET by ID
// http://localhost:1995/api/actor/:id
router.get('/:id', (req, res) => {
	dao.findById(res, dao.table, req.params.id)
})

// UTILITIES --> SEARCH, SORT, COUNT
// COUNT all actors
// http://localhost:1995/api/actor/utils/count/all
router.get('/utils/count/all', (req, res) => {
	dao.countAll(res, dao.table)
})

// SEARCH actors
// http://localhost:1995/api/actor/utils/search?field=first_name&term=jim
router.get('/utils/search', (req, res) => {
	dao.search(req, res, dao.table)
})

// SORT actors
// http://localhost:1995/api/actor/utils/sort?sort=yr_released
router.get('/utils/sort', (req, res) => {
	dao.sort(res, dao.table, req.query.sort)
})

// CREATE a new actor
// http://localhost:1995/api/actor/
router.post('/', (req, res) => {
	dao.create(req, res, dao.table, req.body)
})

// UPDATE a actor
// http://localhost:1995/api/actor/:id
router.put('/:id', (req, res) => {
	dao.update(req, res, dao.table, req.body, 'actor_id', req.params.id)
})


module.exports = router