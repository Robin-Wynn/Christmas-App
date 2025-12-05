const router = require('express').Router()
const { streaming_platformDao: dao } = require('../../daos/dao')

// GET ALL
// http://localhost:1995/api/streaming_platform/
router.get('/', (req, res)=> {
	dao.findAll(res, dao.table)
})

// GET programs
// http://localhost:1995/api/streaming_platform/:id/programs
router.get('/:id/programs', (req, res) => {
	dao.findPrograms(res, req.params.id)
})

// COUNT all streaming_platforms
// http://localhost:1995/api/streaming_platform/count
router.get('/count', (req, res) => {
	dao.countAll(res, dao.table)
})

// SEARCH streaming_platforms
// http://localhost:1995/api/streaming_platform/search?field=streaming_platform&term=hbo
router.get('/search', (req, res) => {
	dao.search(req, res, dao.table)
})

// SORT streaming_platforms
// http://localhost:1995/api/streaming_platform/sort?sort=streaming_platform_id
router.get('/sort', (req, res) => {
	dao.sort(res, dao.table, req.query.sort)
})

// GET by ID
// http://localhost:1995/api/streaming_platform/:id
router.get('/:id', (req, res) => {
	dao.findById(res, dao.table, req.params.id)
})

// CREATE a new streaming_platform
// http://localhost:1995/api/streaming_platform/create
router.post('/create', (req, res) => {
	dao.create(req, res, dao.table, req.body)
})

// UPDATE a streaming_platform
// http://localhost:1995/api/streaming_platform/update/:id
router.patch('/update/:id', (req, res) => {
	dao.update(req, res, dao.table, req.body, 'streaming_platform_id', req.params.id)
})


module.exports = router